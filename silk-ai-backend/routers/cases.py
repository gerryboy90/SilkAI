from typing import List

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session

from auth import get_current_user
from database import get_db
from models import User, Case, AnalysisReport
from schemas import CaseCreate, CaseOut, CaseDetail

router = APIRouter(prefix="/cases", tags=["cases"])


@router.post("/", response_model=CaseOut, status_code=status.HTTP_201_CREATED)
async def create_case(
    payload: CaseCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    case = Case(
        owner_id=current_user.id,
        title=payload.title,
        brief_raw=payload.brief_raw,
        case_type=payload.case_type,
        jurisdiction=payload.jurisdiction,
        status="pending",
    )
    db.add(case)
    db.commit()
    db.refresh(case)

    # Kick off anonymization + analysis in background
    background_tasks.add_task(_process_case, case.id)

    return case


@router.get("/", response_model=List[CaseOut])
def list_cases(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Case).filter(Case.owner_id == current_user.id).order_by(Case.created_at.desc()).all()


@router.get("/{case_id}", response_model=CaseDetail)
def get_case(
    case_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    case = db.query(Case).filter(Case.id == case_id, Case.owner_id == current_user.id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case


@router.delete("/{case_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_case(
    case_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    case = db.query(Case).filter(Case.id == case_id, Case.owner_id == current_user.id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    db.delete(case)
    db.commit()


async def _process_case(case_id: str):
    """Background task: anonymize brief and run Claude analysis."""
    from database import SessionLocal
    from services.anonymization import anonymize
    from services.claude_service import get_client, analyse_case

    db = SessionLocal()
    try:
        case = db.query(Case).filter(Case.id == case_id).first()
        if not case:
            return

        case.status = "processing"
        db.commit()

        # Step 1: Anonymize
        client = get_client()
        anonymized = await anonymize(case.brief_raw, client)
        case.brief_anonymized = anonymized
        db.commit()

        # Step 2: Claude analysis (anonymized text only)
        result = await analyse_case(anonymized, case.case_type, case.jurisdiction)

        # Step 3: Persist report
        arg_style = result.get("argument_style", {})
        judge_pred = result.get("judge_prediction", {})
        strat = result.get("strategy_report", {})

        report = AnalysisReport(
            case_id=case.id,
            recommended_argument_style=arg_style.get("recommended_style"),
            argument_style_rationale=arg_style.get("rationale"),
            barrister_profiles=result.get("barrister_profiles", []),
            ruling_prediction=judge_pred.get("prediction"),
            ruling_confidence=judge_pred.get("confidence"),
            precedent_cases=judge_pred.get("precedent_cases", []),
            argument_scores=result.get("argument_scores", []),
            overall_strength=_calc_overall_strength(result.get("argument_scores", [])),
            recommended_approach=strat.get("recommended_approach"),
            opposition_arguments=strat.get("opposition_arguments", []),
            risk_areas=strat.get("risk_areas", []),
            preparation_steps=strat.get("preparation_steps", []),
        )
        db.add(report)
        case.status = "complete"
        db.commit()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error(f"Case processing failed for {case_id}: {e}")
        case = db.query(Case).filter(Case.id == case_id).first()
        if case:
            case.status = "failed"
            db.commit()
    finally:
        db.close()


def _calc_overall_strength(argument_scores: list) -> float:
    if not argument_scores:
        return 0.0
    scores = [float(a.get("score", 0)) for a in argument_scores]
    return round(sum(scores) / len(scores), 2)
