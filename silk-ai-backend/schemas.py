from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr


# --- Auth ---
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    firm: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    email: str
    full_name: str
    firm: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# --- Cases ---
class CaseCreate(BaseModel):
    title: str
    brief_raw: str
    case_type: Optional[str] = None
    jurisdiction: Optional[str] = None


class CaseOut(BaseModel):
    id: str
    title: str
    case_type: Optional[str]
    jurisdiction: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CaseDetail(CaseOut):
    brief_anonymized: Optional[str]
    report: Optional["AnalysisReportOut"]


# --- Analysis ---
class BarristerProfile(BaseModel):
    name: str
    era: Optional[str]
    known_for: str
    argument_style: str
    key_lessons: str


class ArgumentScore(BaseModel):
    argument: str
    score: float
    weakness: Optional[str]
    recommended_pivot: Optional[str]


class AnalysisReportOut(BaseModel):
    id: str
    case_id: str
    recommended_argument_style: Optional[str]
    argument_style_rationale: Optional[str]
    barrister_profiles: Optional[List[BarristerProfile]]
    ruling_prediction: Optional[str]
    ruling_confidence: Optional[float]
    precedent_cases: Optional[List[str]]
    argument_scores: Optional[List[ArgumentScore]]
    overall_strength: Optional[float]
    recommended_approach: Optional[str]
    opposition_arguments: Optional[List[str]]
    risk_areas: Optional[List[str]]
    preparation_steps: Optional[List[str]]
    created_at: datetime

    class Config:
        from_attributes = True


CaseDetail.model_rebuild()
