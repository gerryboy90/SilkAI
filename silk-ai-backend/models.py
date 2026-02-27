import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Float, JSON, Boolean
from sqlalchemy.orm import relationship

from database import Base


def gen_uuid():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=gen_uuid)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    firm = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    cases = relationship("Case", back_populates="owner")


class Case(Base):
    __tablename__ = "cases"

    id = Column(String, primary_key=True, default=gen_uuid)
    owner_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    brief_raw = Column(Text, nullable=False)
    brief_anonymized = Column(Text, nullable=True)
    case_type = Column(String, nullable=True)
    jurisdiction = Column(String, nullable=True)
    status = Column(String, default="pending")  # pending, processing, complete, failed
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = relationship("User", back_populates="cases")
    report = relationship("AnalysisReport", back_populates="case", uselist=False)


class AnalysisReport(Base):
    __tablename__ = "analysis_reports"

    id = Column(String, primary_key=True, default=gen_uuid)
    case_id = Column(String, ForeignKey("cases.id"), nullable=False, unique=True)

    # Argument Style Advisor
    recommended_argument_style = Column(Text, nullable=True)
    argument_style_rationale = Column(Text, nullable=True)

    # Barrister Profiles
    barrister_profiles = Column(JSON, nullable=True)  # list of {name, style, lessons}

    # Judge Ruling Prediction
    ruling_prediction = Column(Text, nullable=True)
    ruling_confidence = Column(Float, nullable=True)
    precedent_cases = Column(JSON, nullable=True)

    # Argument Strength Scoring
    argument_scores = Column(JSON, nullable=True)  # list of {argument, score, weakness, pivot}
    overall_strength = Column(Float, nullable=True)

    # Case Strategy Report
    recommended_approach = Column(Text, nullable=True)
    opposition_arguments = Column(JSON, nullable=True)
    risk_areas = Column(JSON, nullable=True)
    preparation_steps = Column(JSON, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    case = relationship("Case", back_populates="report")
