import logging
import time
from pathlib import Path
from datetime import datetime

from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.detection_model import Detection

from app.services.detection_service import detection_service
from app.services.report_service import report_service
from app.reports.pdf_report import pdf_report

try:
    from app.ai.gemini import gemini_service
    GEMINI_AVAILABLE = True
except Exception:
    GEMINI_AVAILABLE = False


logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/report",
    tags=["Report"],
)


# ---------------------------------------------------------
# Generate PDF Report
# ---------------------------------------------------------

@router.post("/generate")
async def generate_report():

    start = time.perf_counter()

    uploads = Path("app/uploads")

    if not uploads.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Uploads folder not found.",
        )

    files = [
        file
        for file in uploads.iterdir()
        if file.is_file()
    ]

    if len(files) == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No uploaded image found.",
        )

    latest = max(
        files,
        key=lambda file: file.stat().st_mtime,
    )

    try:

        result = detection_service.detect(
            str(latest)
        )

        workers = result.get("workers_count", 0)
        stats = result.get("stats", {})
        missing = result.get("missing", [])
        score = result.get("safety_score", 0)
        risk = result.get("risk", "Unknown")
        violations = result.get("violations", 0)

        # -----------------------------------------
        # AI Report
        # -----------------------------------------

        if GEMINI_AVAILABLE:

            try:

                ai_report = gemini_service.generate_report(
                    workers=workers,
                    stats=stats,
                    missing=missing,
                    score=score,
                    risk=risk,
                )

            except Exception:

                ai_report = report_service.generate(
                    workers=workers,
                    stats=stats,
                    missing=missing,
                    score=score,
                    risk=risk,
                )

        else:

            ai_report = report_service.generate(
                workers=workers,
                stats=stats,
                missing=missing,
                score=score,
                risk=risk,
            )

        # -----------------------------------------
        # Generate PDF
        # -----------------------------------------

        pdf_path = pdf_report.generate(
            filename=latest.name,
            original_image=str(latest),
            annotated_image=result["annotated_image"],
            stats=stats,
            violations=violations,
            score=score,
            risk=risk,
            ai_report=ai_report,
        )

        elapsed = round(
            time.perf_counter() - start,
            2,
        )

        logger.info(
            "PDF generated in %.2f seconds",
            elapsed,
        )

        return {
            "success": True,
            "message": "Report generated successfully.",
            "filename": latest.name,
            "pdf": pdf_path,
            "processing_time": elapsed,
        }

    except Exception as error:

        logger.exception(error)

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to generate report.",
        )


# ---------------------------------------------------------
# Report List
# ---------------------------------------------------------

@router.get("/list")
def list_reports(
    db: Session = Depends(get_db),
):

    reports_dir = Path("app/generated_reports")

    if not reports_dir.exists():
        return {
            "reports": [],
        }

    detections = (
        db.query(Detection)
        .order_by(Detection.id.desc())
        .all()
    )

    lookup = {}

    for detection in detections:

        if detection.filename:

            lookup.setdefault(
                Path(detection.filename).stem,
                detection,
            )

    reports = []

    for pdf in reports_dir.glob("*.pdf"):

        stat = pdf.stat()

        stem = pdf.stem.replace(
            "_report",
            "",
        )

        detection = lookup.get(stem)

        reports.append({

            "id": pdf.stem,

            "filename": pdf.name,

            "pdf_path": f"app/generated_reports/{pdf.name}",

            "created_at": datetime.fromtimestamp(
                stat.st_mtime
            ).isoformat(),

            "size_bytes": stat.st_size,

            "safety_score": (
                detection.safety_score
                if detection
                else None
            ),

            "risk": (
                detection.risk
                if detection
                else None
            ),

            "workers": (
                detection.workers
                if detection
                else None
            ),

            "violations": (
                detection.violations
                if detection
                else None
            ),

        })

    reports.sort(
        key=lambda item: item["created_at"],
        reverse=True,
    )

    return {
        "count": len(reports),
        "reports": reports,
    }


# ---------------------------------------------------------
# Delete Report
# ---------------------------------------------------------

@router.delete("/{report_id}")
def delete_report(
    report_id: str,
):

    pdf = (
        Path("app/generated_reports")
        / f"{report_id}.pdf"
    )

    if not pdf.exists():

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found.",
        )

    pdf.unlink()

    logger.info(
        "Deleted report %s",
        report_id,
    )

    return {
        "success": True,
        "message": "Report deleted successfully.",
    }


# ---------------------------------------------------------
# Report Details
# ---------------------------------------------------------

@router.get("/{report_id}")
def report_details(
    report_id: str,
):

    pdf = (
        Path("app/generated_reports")
        / f"{report_id}.pdf"
    )

    if not pdf.exists():

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found.",
        )

    stat = pdf.stat()

    return {

        "id": report_id,

        "filename": pdf.name,

        "size_bytes": stat.st_size,

        "created_at": datetime.fromtimestamp(
            stat.st_mtime
        ).isoformat(),

        "path": str(pdf),

    }