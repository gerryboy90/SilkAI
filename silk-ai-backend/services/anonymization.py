"""
Two-pass anonymization: spaCy NER → Claude verification.
All case data must pass through this before any AI intelligence call.
"""
import re
import logging
from typing import Tuple

logger = logging.getLogger(__name__)

# Entity replacement map
ENTITY_REPLACEMENTS = {
    "PERSON": "[PERSON]",
    "ORG": "[ORGANISATION]",
    "GPE": "[JURISDICTION]",
    "LOC": "[LOCATION]",
    "DATE": "[DATE]",
    "MONEY": "[AMOUNT]",
    "LAW": "[STATUTE]",
    "NORP": "[GROUP]",
}

# Patterns for common legal identifiers
LEGAL_PATTERNS = [
    (r"\b[A-Z][a-z]+ v\.? [A-Z][a-z]+\b", "[CASE_NAME]"),
    # Currency symbol prefix (e.g. $1,500,000 or £2,000)
    (r"(?:£|\$|€|USD|GBP|AUD|NGN)\s*\d[\d,\.]+", "[AMOUNT]"),
    # Amount with currency suffix (e.g. 1,500,000 USD)
    (r"\b\d[\d,\.]+\s*(?:USD|GBP|AUD|NGN)\b", "[AMOUNT]"),
    (r"\bcase\s+no\.?\s*[A-Z0-9/\-]+\b", "[CASE_NUMBER]", re.IGNORECASE),
    (r"\b[A-Z]{2,}\d{4,}\b", "[REFERENCE_NUMBER]"),
]


def _spacy_pass(text: str) -> Tuple[str, dict]:
    """First pass: spaCy NER anonymization."""
    try:
        import spacy
        try:
            nlp = spacy.load("en_core_web_sm")
        except OSError:
            logger.warning("spaCy model not found — skipping NER pass")
            return text, {}

        doc = nlp(text)
        redacted = text
        entities_found = {}

        # Process entities in reverse order to preserve offsets
        for ent in sorted(doc.ents, key=lambda e: e.start_char, reverse=True):
            replacement = ENTITY_REPLACEMENTS.get(ent.label_, None)
            if replacement:
                entities_found[ent.text] = replacement
                redacted = redacted[: ent.start_char] + replacement + redacted[ent.end_char :]

        return redacted, entities_found

    except ImportError:
        logger.warning("spaCy not installed — skipping NER pass")
        return text, {}


def _pattern_pass(text: str) -> str:
    """Apply regex patterns for legal-specific identifiers."""
    for pattern_args in LEGAL_PATTERNS:
        if len(pattern_args) == 3:
            pattern, replacement, flags = pattern_args
            text = re.sub(pattern, replacement, text, flags=flags)
        else:
            pattern, replacement = pattern_args
            text = re.sub(pattern, replacement, text)
    return text


async def _claude_verification_pass(text: str, anthropic_client) -> str:
    """Second pass: Claude verifies and catches any remaining PII."""
    prompt = f"""You are a legal document anonymization assistant. Review the following text that has already been partially anonymized. 
Your task is to identify and replace ANY remaining personally identifiable information (PII) that was missed:
- Real names of individuals (replace with [PERSON])
- Company or organisation names (replace with [ORGANISATION])  
- Specific addresses or locations (replace with [LOCATION])
- Phone numbers, email addresses (replace with [CONTACT])
- Account numbers, case file numbers (replace with [REFERENCE])
- Any other information that could identify a specific real person or entity

Return ONLY the anonymized text. Do not add any commentary or explanation.

TEXT TO ANONYMIZE:
{text}"""

    message = await anthropic_client.messages.create(
        model="claude-opus-4-5",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


async def anonymize(text: str, anthropic_client=None) -> str:
    """
    Full two-pass anonymization pipeline.
    Pass 1: spaCy NER + regex patterns
    Pass 2: Claude Opus verification (if client provided)
    """
    # Pass 1: spaCy NER
    text, _ = _spacy_pass(text)

    # Pass 1b: regex patterns
    text = _pattern_pass(text)

    # Pass 2: Claude verification
    if anthropic_client:
        try:
            text = await _claude_verification_pass(text, anthropic_client)
        except Exception as e:
            logger.error(f"Claude anonymization pass failed: {e}")
            # Continue with spaCy result — do not block the pipeline

    return text
