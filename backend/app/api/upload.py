import logging
import shutil
import uuid
from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile, status
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/upload",
    tags=["Upload"],
)

# ---------------------------------------------------------
# Upload Configuration
# ---------------------------------------------------------

UPLOAD_DIR = Path("app/uploads")
UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)

ALLOWED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp",
    ".mp4",
    ".avi",
    ".mov",
    ".pdf",
}

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 MB


# ---------------------------------------------------------
# Upload File
# ---------------------------------------------------------

@router.post("/")
async def upload_file(
    file: UploadFile = File(...),
):

    if file.filename is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No filename provided.",
        )

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type: {extension}",
        )

    contents = await file.read()

    if len(contents) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty.",
        )

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Maximum upload size is 20 MB.",
        )

    unique_name = (
        f"{uuid.uuid4().hex}{extension}"
    )

    destination = UPLOAD_DIR / unique_name

    try:

        with destination.open("wb") as buffer:
            buffer.write(contents)

        logger.info(
            "Uploaded file: %s",
            unique_name,
        )

        return JSONResponse(

            status_code=status.HTTP_201_CREATED,

            content={

                "success": True,

                "message": "File uploaded successfully.",

                "original_filename": file.filename,

                "stored_filename": unique_name,

                "extension": extension,

                "size_bytes": len(contents),

                "uploaded_at": datetime.utcnow().isoformat(),

                "path": str(destination),

            },

        )

    except Exception as error:

        logger.exception(error)

        if destination.exists():
            destination.unlink()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload file.",
        )

    finally:
        await file.close()