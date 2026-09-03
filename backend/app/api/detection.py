import logging
import time
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.detection_model import Detection

from app.services.detection_service import detection_service
from app.services.report_service import report_service

try:
    from app.ai.gemini import gemini_service
    GEMINI_AVAILABLE = True
except Exception:
    GEMINI_AVAILABLE = False


logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/detect",
    tags=["Detection"],
)


@router.post("/latest")
async def detect_latest(
    db: Session = Depends(get_db),
):

    start_time = time.perf_counter()

    uploads = Path("app/uploads")

    if not uploads.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Uploads directory not found.",
        )

    files = [
        file
        for file in uploads.iterdir()
        if file.is_file()
    ]

    if not files:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No uploaded image found.",
        )

    latest = max(
        files,
        key=lambda file: file.stat().st_mtime,
    )

    logger.info("Processing image: %s", latest.name)

    try:

        # ----------------------------------
        # Run YOLO Detection
        # ----------------------------------

        result = detection_service.detect(
            str(latest)
        )

        workers_count = result.get(
            "workers_count",
            0,
        )

        stats = result.get(
            "stats",
            {},
        )

        missing = result.get(
            "missing",
            {},
        )

        violations = result.get(
            "violations",
            0,
        )

        score = result.get(
            "safety_score",
            0,
        )

        risk = result.get(
            "risk",
            "LOW",
        )

        detections = result.get(
            "detections",
            [],
        )

        annotated_image = result.get(
            "annotated_image",
            "",
        )

        # ----------------------------------
        # Generate AI Report
        # ----------------------------------

        ai_report = report_service.generate(
            workers=workers_count,
            stats=stats,
            missing=missing,
            score=score,
            risk=risk,
        )

        # ----------------------------------
        # Gemini Enhancement
        # ----------------------------------

        if GEMINI_AVAILABLE:

            try:

                gemini_report = (
                    gemini_service.generate_report(
                        workers=workers_count,
                        stats=stats,
                        missing=missing,
                        score=score,
                        risk=risk,
                    )
                )

                if (
                    gemini_report
                    and "Gemini Error" not in gemini_report
                    and "quota" not in gemini_report.lower()
                ):
                    ai_report = gemini_report

            except Exception as gemini_error:

                logger.warning(
                    "Gemini unavailable: %s",
                    gemini_error,
                )

        # ----------------------------------
        # Save Detection
        # ----------------------------------

        detection = Detection(
            filename=latest.name,
            workers=workers_count,
            helmets=stats.get("helmet", 0),
            vests=stats.get("vest", 0),
            gloves=stats.get("gloves", 0),
            goggles=stats.get("goggles", 0),
            boots=stats.get("boots", 0),
            violations=violations,
            safety_score=score,
            risk=risk,
            ai_report=ai_report,
            pdf_path="",
        )

        db.add(detection)
        db.commit()
        db.refresh(detection)

        elapsed = round(
            time.perf_counter() - start_time,
            2,
        )

        logger.info(
            "Detection completed in %.2f seconds",
            elapsed,
        )

        return {
            "success": True,
            "message": "Detection completed successfully.",

            "filename": latest.name,
            "detection_id": detection.id,

            "workers": workers_count,
            "workers_count": workers_count,

            "detections": detections,

            "annotated_image": "/" + annotated_image.replace(
                "\\",
                "/",
            ),

            "violations": violations,
            "safety_score": score,
            "risk": risk,

            "stats": stats,
            "missing": missing,

            "ai_report": ai_report,

            "processing_time": elapsed,
        }

    except HTTPException:
        raise

    except Exception as error:

        db.rollback()

        logger.exception(
            "Detection failed: %s",
            error,
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Detection failed. Please try again.",
        )