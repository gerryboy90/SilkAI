from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

from auth import get_current_user
from database import get_db
from models import User, Case, AnalysisReport
from schemas import AnalysisReportOut

router = APIRouter(prefix="/analysis", tags=["analysis"])


@router.get("/{case_id}", response_model=AnalysisReportOut)
def get_analysis(
    case_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    case = db.query(Case).filter(Case.id == case_id, Case.owner_id == current_user.id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    if case.status != "complete":
        raise HTTPException(status_code=202, detail=f"Analysis status: {case.status}")

    report = db.query(AnalysisReport).filter(AnalysisReport.case_id == case_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Analysis report not found")
    return report


@router.get("/{case_id}/pdf")
def download_pdf(
    case_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    case = db.query(Case).filter(Case.id == case_id, Case.owner_id == current_user.id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    if case.status != "complete":
        raise HTTPException(status_code=202, detail="Analysis not yet complete")

    report = db.query(AnalysisReport).filter(AnalysisReport.case_id == case_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Analysis report not found")

    from services.pdf_service import generate_strategy_report_pdf

    report_data = {
        "argument_style": {
            "recommended_style": report.recommended_argument_style,
            "rationale": report.argument_style_rationale,
        },
        "barrister_profiles": report.barrister_profiles or [],
        "judge_prediction": {
            "prediction": report.ruling_prediction,
            "confidence": report.ruling_confidence,
            "precedent_cases": report.precedent_cases or [],
        },
        "argument_scores": report.argument_scores or [],
        "strategy_report": {
            "recommended_approach": report.recommended_approach,
            "opposition_arguments": report.opposition_arguments or [],
            "risk_areas": report.risk_areas or [],
            "preparation_steps": report.preparation_steps or [],
        },
    }

    pdf_bytes = generate_strategy_report_pdf(case.title, report_data, case.case_type)
    safe_title = "".join(c if c.isalnum() or c in " -_" else "_" for c in case.title)[:50]

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="SilkAI_{safe_title}.pdf"'},
    )
