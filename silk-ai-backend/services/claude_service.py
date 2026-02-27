"""
Claude Opus intelligence service.
All intelligence endpoints use claude-opus-4-5 — non-negotiable premium tier.
All text passed here must already be anonymized.
"""
import json
import logging
from typing import Optional

import anthropic

from config import settings

logger = logging.getLogger(__name__)

CLAUDE_MODEL = "claude-opus-4-5"


def get_client() -> anthropic.AsyncAnthropic:
    return anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)


SYSTEM_PROMPT = """You are Silk AI — an elite case strategy advisor for senior barristers, QCs, and law firm partners. 
You provide authoritative, sophisticated legal intelligence. Your analysis is:
- Rigorous and evidence-based
- Aligned with common law principles and precedent
- Direct and actionable — no hedging, no filler
- Written for senior legal professionals who require depth, not simplification

All case briefs you receive have been anonymized. Treat [PERSON], [ORGANISATION], [JURISDICTION] etc. as anonymized placeholders."""


async def analyse_case(anonymized_brief: str, case_type: Optional[str], jurisdiction: Optional[str]) -> dict:
    """
    Full case analysis: argument style, barrister profiles, judge prediction,
    argument scoring, and strategy report.
    Returns structured JSON.
    """
    client = get_client()

    prompt = f"""Analyse the following anonymized case brief and produce a complete strategic intelligence report.

CASE TYPE: {case_type or "Not specified"}
JURISDICTION: {jurisdiction or "Not specified"}

ANONYMIZED BRIEF:
{anonymized_brief}

Return a JSON object with EXACTLY this structure:
{{
  "argument_style": {{
    "recommended_style": "string — name of the recommended argument style (e.g. 'Socratic Deconstruction', 'Narrative Framing', 'Precedent Cascade', 'Technical Precision', 'Moral Authority')",
    "rationale": "string — 2-3 sentences explaining why this style fits this case"
  }},
  "barrister_profiles": [
    {{
      "name": "string — full name of a real historical or contemporary barrister/QC known for this case type",
      "era": "string — e.g. '1970s–1990s' or 'Contemporary'",
      "known_for": "string — the type of cases or legal areas they are known for",
      "argument_style": "string — their characteristic approach to argument",
      "key_lessons": "string — what can be learned and applied from their style in this case"
    }}
  ],
  "judge_prediction": {{
    "prediction": "string — how a judge is likely to rule and their probable reasoning",
    "confidence": number between 0.0 and 1.0,
    "precedent_cases": ["string — relevant case name/citation", "..."]
  }},
  "argument_scores": [
    {{
      "argument": "string — a key argument identified in the brief",
      "score": number between 0.0 and 10.0,
      "weakness": "string — the primary vulnerability of this argument",
      "recommended_pivot": "string — how to strengthen or reframe this argument"
    }}
  ],
  "strategy_report": {{
    "recommended_approach": "string — the overall strategic approach in 3-5 sentences",
    "opposition_arguments": ["string — likely argument from opposing counsel", "..."],
    "risk_areas": ["string — a key risk area", "..."],
    "preparation_steps": ["string — an actionable preparation step", "..."]
  }}
}}

Provide 2-3 barrister profiles, 3-5 argument scores, 3-4 opposition arguments, 3-5 risk areas, and 4-6 preparation steps.
Return ONLY valid JSON. No markdown, no commentary."""

    message = await client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=8192,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = message.content[0].text.strip()

    # Strip markdown code fences if present
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    if raw.endswith("```"):
        raw = raw[: raw.rfind("```")]

    return json.loads(raw.strip())
