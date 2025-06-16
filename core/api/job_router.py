from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from core.service import job_service
from core.util.jwt_utils import decode_token
from fastapi.security import OAuth2PasswordBearer
from typing import List, Optional

router = APIRouter(prefix="/jobs", tags=["Jobs"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Pydantic Schemas
class JobCreateRequest(BaseModel):
    title: str
    description: str
    skills: Optional[str] = ""
    due_date: str

class JobResponse(BaseModel):
    id: int
    title: str
    description: str
    skills: Optional[str]
    due_date: str
    posted_by: int
    created_at: str

# Auth Helper
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = decode_token(token)
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# POST /jobs/ - Create job
@router.post("/", response_model=dict)
def create_job(req: JobCreateRequest, user=Depends(get_current_user)):
    job_id = job_service.post_job(req.title, req.description, req.skills, req.due_date, user["user_id"])
    return {"message": "Job posted successfully", "job_id": job_id}

# GET /jobs/ - List all jobs
@router.get("/", response_model=List[JobResponse])
def list_jobs():
    jobs = job_service.list_jobs()
    return [
        JobResponse(
            id=job[0], title=job[1], description=job[2],
            skills=job[3], due_date=str(job[4]),
            posted_by=job[5], created_at=str(job[6])
        )
        for job in jobs
    ]

# POST /jobs/apply/{job_id}/ - Apply with resume
@router.post("/apply/{job_id}")
def apply_to_job(job_id: int, resume: UploadFile = File(...)):
    job_data = job_service.get_job_by_id(job_id)
    if not job_data:
        raise HTTPException(status_code=404, detail="Job not found")
    
    result = job_service.apply_to_job(job_id, resume, job_data)
    return result
