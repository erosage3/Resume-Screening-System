from fastapi import FastAPI
from core.api import health_router,auth_router,job_router

app = FastAPI(
    title="AI Resume Screening System",
    description="A smart system to rank resumes based on job descriptions",
    version="1.0.0"
)

app.include_router(health_router.router)
app.include_router(auth_router.router)

app.include_router(job_router.router)
