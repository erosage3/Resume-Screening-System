from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from core.service import job_service
from core.util.jwt_utils import decode_token
from fastapi.security import OAuth2PasswordBearer
from typing import List, Optional
from core.util.resume_utils import compute_job_vector

router = APIRouter(prefix="/jobs", tags=["Jobs"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

class JobCreateRequest(BaseModel):
    title: str
    company: str
    location: str
    job_type: str  # Should be: full-time, part-time, contract, internship, remote
    description: str
    # skills: Optional[str] = ""
    salary: Optional[str] = ""
    due_date: str

class JobResponse(BaseModel):
    id: int
    title: str
    company: str
    location: str
    job_type: str
    description: str
    # skills: Optional[str]
    salary: Optional[str]
    due_date: str
    posted_by: int
    created_at: str

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = decode_token(token)
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@router.post("/", response_model=dict)
def create_job(req: JobCreateRequest, user=Depends(get_current_user)):
    job_vector = compute_job_vector(req.title, req.description, "")
    job_id = job_service.post_job(
        req.title,
        req.company,
        req.location,
        req.job_type,
        req.description,
        req.salary,
        req.due_date,
        user["user_id"],
        job_vector
    )
    return {"message": "Job posted successfully", "job_id": job_id}

@router.get("/", response_model=List[JobResponse])
def list_jobs():
    jobs = job_service.list_jobs()
    return [
        JobResponse(
            id=job[0],
            title=job[1],
            company=job[2],
            location=job[3],
            job_type=job[4],
            description=job[5],
            
            salary=job[6],
            due_date=str(job[7]),
            posted_by=job[8],
            created_at=str(job[9])
        )
        for job in jobs
    ]

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

@router.get("/me", response_model=List[JobResponse])
def list_my_jobs(user=Depends(get_current_user)):
    jobs = job_service.get_jobs_by_recruiter(user["user_id"])
    return [
        JobResponse(
            id=job[0],
            title=job[1],
            company=job[2],
            location=job[3],
            job_type=job[4],
            description=job[5],
            salary=job[6],
            due_date=str(job[7]),
            posted_by=int(job[8]) if job[9] not in (None, '') else 0,
            created_at=str(job[9])
        )
        for job in jobs
    ]

@router.delete("/{job_id}/")
def delete_job(job_id: int, user=Depends(get_current_user)):
    try:
        job_service.delete_job(job_id, user["user_id"])
        return {"message": "Job deleted successfully"}
    except ValueError as ve:
        raise HTTPException(status_code=403, detail=str(ve))
    except Exception:
        raise HTTPException(status_code=404, detail="Job not found")
