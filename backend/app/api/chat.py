import logging

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.detection_model import Detection

from app.ai.gemini import gemini_service
from app.ai.rag import rag_integration

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api",
    tags=["AI Chat"],
)


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=2, max_length=1000)


@router.post("/chat")
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
):

    latest = (
        db.query(Detection)
        .order_by(Detection.id.desc())
        .first()
    )

    if latest is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No inspection has been performed yet.",
        )

    question = request.question.strip()

    workers = latest.workers
    helmets = latest.helmets
    vests = latest.vests
    gloves = latest.gloves
    goggles = latest.goggles
    boots = latest.boots
    violations = latest.violations
    score = latest.safety_score
    risk = latest.risk
    report = latest.ai_report

    # -------------------------------------------------
    # Build Violation Breakdown
    # -------------------------------------------------

    missing_helmet = max(0, workers - helmets)
    missing_vest = max(0, workers - vests)
    missing_gloves = max(0, workers - gloves)
    missing_goggles = max(0, workers - goggles)
    missing_boots = max(0, workers - boots)

    violation_list = []

    if missing_helmet:
        violation_list.append(
            f"{missing_helmet} worker(s) are missing helmets."
        )

    if missing_vest:
        violation_list.append(
            f"{missing_vest} worker(s) are missing safety vests."
        )

    if missing_gloves:
        violation_list.append(
            f"{missing_gloves} worker(s) are missing gloves."
        )

    if missing_goggles:
        violation_list.append(
            f"{missing_goggles} worker(s) are missing safety goggles."
        )

    if missing_boots:
        violation_list.append(
            f"{missing_boots} worker(s) are missing safety boots."
        )

    if violation_list:
        violation_summary = "\n".join(
            f"• {item}" for item in violation_list
        )
    else:
        violation_summary = "No PPE violations were detected."

    # -------------------------------------------------
    # Retrieve RAG Context
    # -------------------------------------------------

    try:
        context_chunks = rag_integration.retrieve_context(question)

    except Exception as error:
        logger.warning(
            "RAG retrieval failed: %s",
            error,
        )
        context_chunks = []

    # -------------------------------------------------
    # Build Prompt
    # -------------------------------------------------

    detection_context = f"""
You are VisionDesk AI.

You are an intelligent workplace safety assistant.

Answer ONLY using the inspection data below.

LATEST INSPECTION

Workers Detected : {workers}

Detected PPE

Helmet : {helmets}
Vest : {vests}
Gloves : {gloves}
Goggles : {goggles}
Boots : {boots}

PPE VIOLATION BREAKDOWN

{violation_summary}

Total PPE Violations : {violations}

Safety Score : {score}%

Risk Level : {risk}

Latest Inspection Report

{report}

Instructions

- If the user asks about violations, explain each missing PPE item.
- Do not answer only with the total violation count.
- Answer naturally.
- If asked for recommendations, use the inspection report.
"""    # -------------------------------------------------
    # Gemini
    # -------------------------------------------------

    try:

        if context_chunks:

            prompt = rag_integration.build_rag_prompt(
                question=question,
                context_chunks=context_chunks,
                detection_context=detection_context,
            )

        else:

            prompt = f"""
{detection_context}

User Question

{question}
"""

        print("\n========== PROMPT ==========\n")
        print(prompt)

        answer = gemini_service.ask(prompt)

        print("\n========== GEMINI ANSWER ==========\n")
        print(answer)

        return {
            "success": True,
            "source": "VisionDesk AI",
            "answer": answer,
            "sources": [
                {
                    "filename": chunk.source_filename,
                    "page": chunk.page_number,
                }
                for chunk in context_chunks
            ],
        }

    except Exception as error:

        logger.warning(
            "Gemini failed: %s",
            error,
        )

    # -------------------------------------------------
    # Keyword Fallback
    # -------------------------------------------------

    q = question.lower()

    responses = {

        "worker":
            f"The latest inspection detected {workers} workers.",

        "person":
            f"The latest inspection detected {workers} workers.",

        "helmet":
            f"{helmets} workers are wearing helmets.",

        "vest":
            f"{vests} workers are wearing safety vests.",

        "glove":
            f"{gloves} workers are wearing gloves.",

        "goggle":
            f"{goggles} workers are wearing safety goggles.",

        "boot":
            f"{boots} workers are wearing safety boots.",

        "score":
            f"The latest safety score is {score}% .",

        "risk":
            f"The workplace risk level is {risk}.",

        "violation":
            violation_summary,

        "report":
            report,
    }

    for keyword, response in responses.items():

        if keyword in q:

            return {
                "success": True,
                "source": "Knowledge Base",
                "answer": response,
            }

    if "safe" in q:

        if risk.upper() == "LOW":
            answer = (
                "The workplace is currently considered safe with good PPE compliance."
            )

        elif risk.upper() == "MEDIUM":
            answer = (
                "The workplace has a MEDIUM safety risk. Some PPE violations require attention."
            )

        else:
            answer = (
                "The workplace has a HIGH safety risk. Immediate corrective action is recommended."
            )

        return {
            "success": True,
            "source": "Knowledge Base",
            "answer": answer,
        }

    return {
        "success": True,
        "source": "Assistant",
        "answer": (
            "I can answer questions about:\n\n"
            "• Workers detected\n"
            "• PPE violations\n"
            "• Missing PPE\n"
            "• Helmets\n"
            "• Vests\n"
            "• Gloves\n"
            "• Goggles\n"
            "• Boots\n"
            "• Safety score\n"
            "• Risk level\n"
            "• AI inspection report\n"
            "• Safety recommendations"
        ),
    }