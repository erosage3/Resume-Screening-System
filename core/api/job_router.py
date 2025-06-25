from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
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

# Auth helper
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

# GET /jobs/ - List jobs
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

# POST /jobs/apply/{job_id}
@router.post("/apply/{job_id}")
def apply_to_job(
    job_id: int,
    resume: UploadFile = File(...),
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...)
):
    job_data = job_service.get_job_by_id(job_id)
    if not job_data:
        raise HTTPException(status_code=404, detail="Job not found")

    result = job_service.apply_to_job(job_id, resume, job_data, name, email, phone)
    return result

@router.get("/applicants/me")
def get_my_applicants(user=Depends(get_current_user)):
    applicants = job_service.get_applicants_for_recruiter(user["user_id"])
    return [
        {
            "id": a[0],
            "name": a[1],
            "email": a[2],
            "phone": a[3],
            "match_score": a[4],
            "applied_on": str(a[5]),
            "job_title": a[6]
        }
        for a in applicants
    ]
# GET /jobs/me - List jobs posted by the currently authenticated recruiter
@router.get("/me", response_model=List[JobResponse])
def list_my_jobs(user=Depends(get_current_user)):
    jobs = job_service.get_jobs_by_recruiter(user["user_id"])
    return [
        JobResponse(
            id=job[0], title=job[1], description=job[2],
            skills=job[3], due_date=str(job[4]),
            posted_by=job[5], created_at=str(job[6])
        )
        for job in jobs
    ]
