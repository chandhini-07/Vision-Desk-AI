from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.database.db import get_db
from app.models.user_model import User

from app.auth.schemas import RegisterUser, LoginUser
from app.auth.security import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


# ---------------------------------------------------------
# Schemas
# ---------------------------------------------------------

class ResetPassword(BaseModel):
    email: EmailStr
    password: str


# ---------------------------------------------------------
# Register
# ---------------------------------------------------------

@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: RegisterUser,
    db: Session = Depends(get_db),
):

    email = user.email.lower().strip()

    existing = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )

    if len(user.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must contain at least 6 characters.",
        )

    new_user = User(
        full_name=user.full_name.strip(),
        email=email,
        password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "success": True,
        "message": "Registration successful.",
        "user": {
            "id": new_user.id,
            "name": new_user.full_name,
            "email": new_user.email,
        },
    }


# ---------------------------------------------------------
# Login
# ---------------------------------------------------------

@router.post("/login")
def login(
    user: LoginUser,
    db: Session = Depends(get_db),
):

    email = user.email.lower().strip()

    existing = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found.",
        )

    if not verify_password(
        user.password,
        existing.password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password.",
        )

    access_token = create_access_token(
        {
            "sub": existing.email,
        }
    )

    return {
        "success": True,
        "message": "Login successful.",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": existing.id,
            "name": existing.full_name,
            "email": existing.email,
        },
    }


# ---------------------------------------------------------
# Current User
# ---------------------------------------------------------

@router.get("/me")
def current_user(
    user: User = Depends(get_current_user),
):

    return {
        "success": True,
        "user": {
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
        },
    }


# ---------------------------------------------------------
# Reset Password
# ---------------------------------------------------------

@router.post("/reset-password")
def reset_password(
    data: ResetPassword,
    db: Session = Depends(get_db),
):

    email = data.email.lower().strip()

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found.",
        )

    if len(data.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must contain at least 6 characters.",
        )

    user.password = hash_password(data.password)

    db.commit()

    return {
        "success": True,
        "message": "Password updated successfully.",
    }


# ---------------------------------------------------------
# Logout
# ---------------------------------------------------------

@router.post("/logout")
def logout():

    return {
        "success": True,
        "message": "Logged out successfully.",
    }