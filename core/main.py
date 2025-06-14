from fastapi import FastAPI
from core.api import health_router,auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Resume Screening System",
    description="A smart system to rank resumes based on job descriptions",
    version="1.0.0"
)

# Allow requests from frontend
origins = [
    "http://localhost:5173",  # React (Vite) dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            #List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],              # Allow all HTTP methods
    allow_headers=["*"],              # Allow all headers
)

app.include_router(health_router.router)
app.include_router(auth_router.router)
