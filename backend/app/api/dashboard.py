import logging
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import desc, func
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.detection_model import Detection

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"],
)


@router.get("/summary")
async def dashboard_summary(
    db: Session = Depends(get_db),
):
    try:

        latest = (
            db.query(Detection)
            .order_by(desc(Detection.id))
            .first()
        )

        total_detections = db.query(
            func.count(Detection.id)
        ).scalar() or 0

        average_score = db.query(
            func.avg(Detection.safety_score)
        ).scalar()

        average_score = (
            round(float(average_score), 2)
            if average_score
            else 0
        )

        reports_dir = Path("app/generated_reports")
        reports_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

        report_files = sorted(
            reports_dir.glob("*.pdf"),
            key=lambda f: f.stat().st_mtime,
            reverse=True,
        )

        recent_reports = [
            {
                "name": pdf.name,
                "path": f"/app/generated_reports/{pdf.name}",
            }
            for pdf in report_files[:10]
        ]

        recent_detections = (
            db.query(Detection)
            .order_by(desc(Detection.id))
            .limit(5)
            .all()
        )

        history = []

        for item in recent_detections:
            history.append(
                {
                    "id": item.id,
                    "filename": item.filename,
                    "workers": item.workers,
                    "violations": item.violations,
                    "safety_score": item.safety_score,
                    "risk": item.risk,
                }
            )

        if latest is None:

            return {
                "success": True,
                "summary": {
                    "workers": 0,
                    "violations": 0,
                    "safety_score": 0,
                    "average_score": 0,
                    "reports": 0,
                    "detections": 0,
                    "risk": "LOW",
                },
                "latest": {},
                "stats": {
                    "Person": 0,
                    "helmet": 0,
                    "vest": 0,
                    "gloves": 0,
                    "goggles": 0,
                    "boots": 0,
                },
                "recent_reports": [],
                "history": [],
            }

        return {

            "success": True,

            "summary": {

                "workers": latest.workers,

                "violations": latest.violations,

                "safety_score": latest.safety_score,

                "average_score": average_score,

                "reports": len(report_files),

                "detections": total_detections,

                "risk": latest.risk,

            },

            "latest": {

                "filename": latest.filename,

                "image": f"/app/uploads/{latest.filename}",

                "annotated": f"/app/uploads/results/{latest.filename}",

                "ai_report": latest.ai_report,

            },

            "stats": {

                "Person": latest.workers,

                "helmet": latest.helmets,

                "vest": latest.vests,

                "gloves": latest.gloves,

                "goggles": latest.goggles,

                "boots": latest.boots,

            },

            "recent_reports": recent_reports,

            "history": history,

        }

    except Exception as error:

        logger.exception(error)

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to load dashboard data.",
        )