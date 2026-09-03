from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.database.db import Base, engine

from app.models.user_model import User
from app.models.document_model import Document
from app.models.detection_model import Detection

from app.api.upload import router as upload_router
from app.api.detection import router as detection_router
from app.api.report import router as report_router
from app.api.dashboard import router as dashboard_router
from app.api.chat import router as chat_router
from app.api.documents import router as documents_router

from app.auth.auth import router as auth_router


# --------------------------------------------------
# Logging
# --------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)

logger = logging.getLogger("VisionDeskAI")


# --------------------------------------------------
# Startup / Shutdown
# --------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):

    logger.info("Starting VisionDesk AI Backend...")

    Base.metadata.create_all(bind=engine)

    logger.info("Database initialized successfully.")

    yield

    logger.info("VisionDesk AI Backend stopped.")


# --------------------------------------------------
# FastAPI App
# --------------------------------------------------

app = FastAPI(
    title="VisionDesk AI API",
    version="1.0.0",
    description="AI-powered Workplace Safety Monitoring Platform",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)


# --------------------------------------------------
# Middleware
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    GZipMiddleware,
    minimum_size=1000,
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=[
        "localhost",
        "127.0.0.1",
        "*",
    ],
)


# --------------------------------------------------
# Static Files
# --------------------------------------------------

app.mount(
    "/app",
    StaticFiles(directory="app"),
    name="app",
)


# --------------------------------------------------
# Routers
# --------------------------------------------------

app.include_router(
    auth_router,
    tags=["Authentication"],
)

app.include_router(
    upload_router,
    tags=["Upload"],
)

app.include_router(
    detection_router,
    tags=["Detection"],
)

app.include_router(
    report_router,
    tags=["Reports"],
)

app.include_router(
    dashboard_router,
    tags=["Dashboard"],
)

app.include_router(
    chat_router,
    tags=["AI Chat"],
)

app.include_router(
    documents_router,
    tags=["Documents"],
)


# --------------------------------------------------
# Root Endpoint
# --------------------------------------------------

@app.get("/", tags=["System"])
async def root():

    return {
        "project": "VisionDesk AI",
        "version": "1.0.0",
        "status": "Running",
        "documentation": "/docs",
    }


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.get("/health", tags=["System"])
async def health():

    return {
        "status": "healthy",
        "database": "connected",
        "api": "online",
    }


# --------------------------------------------------
# API Information
# --------------------------------------------------

@app.get("/info", tags=["System"])
async def info():

    return {
        "name": "VisionDesk AI",
        "description": "AI Powered Workplace Safety Monitoring",
        "backend": "FastAPI",
        "version": "1.0.0",
        "author": "VisionDesk AI Team",
    }


# --------------------------------------------------
# Global Exception Handler
# --------------------------------------------------

@app.exception_handler(Exception)
async def global_exception_handler(
    request: Request,
    exc: Exception,
):

    logger.exception(exc)

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal Server Error",
            "detail": str(exc),
        },
    )