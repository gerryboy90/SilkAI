import pytest
from services.anonymization import _pattern_pass


def test_pattern_pass_removes_money():
    text = "The claim is for $1,500,000 in damages."
    result = _pattern_pass(text)
    assert "$1,500,000" not in result
    assert "[AMOUNT]" in result


def test_pattern_pass_removes_case_number():
    text = "See case no. AB2024/0042 for reference."
    result = _pattern_pass(text)
    assert "AB2024/0042" not in result


def test_pattern_pass_preserves_non_pii():
    text = "The defendant breached the contractual obligation to deliver goods."
    result = _pattern_pass(text)
    assert result == text
