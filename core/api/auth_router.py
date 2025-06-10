# Login and register api routes
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from core.service import auth_service
from core.util.jwt_utils import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

class RegisterRequest(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(req: RegisterRequest):
    try:
        auth_service.register_user(req.email, req.password)
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(req: LoginRequest):
    user = auth_service.login_user(req.email, req.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"user_id": user[0], "email": user[1]})
    return {"access_token": token}
