For Backend Setup
#  Resume Screening System - Backend (FastAPI + PostgreSQL)

This is the backend of the Resume Screening System built using **FastAPI**, **PostgreSQL**, and **pure TF-IDF-based NLP logic** (no external ML libraries). It enables recruiters to post jobs, 
job seekers to apply, and resumes to be matched with job descriptions based on semantic relevance.

---

##  Features

-  JWT-based user authentication (register/login)
-  Role-flexible system (any user can post jobs or apply)
-  Job posting with automatic TF-IDF vectorization
-  Resume uploading with text extraction (PDF/DOCX)
-  Resume–Job matching using TF-IDF & cosine similarity
-  Applicants’ data saved with match score
-  Recruiter dashboard (list own applicants and jobs)
-  Delete jobs with access control
-  Stored resume and job vectors for fast scoring

---

## 🛠 Tech Stack

- **FastAPI** – Backend framework
- **PostgreSQL** – Relational database
- **PyMuPDF** / **python-docx** – Resume parsing (PDF/DOCX)
- **JWT (PyJWT)** – Authentication
- **Passlib (bcrypt)** – Password hashing
- **Raw SQL (psycopg2)** – No ORM used

---
Setup Instructions

 1. Clone the Repository
 2. Create a .env file with:
DB_NAME=resume_screening
DB_USER=your_db_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

3. Install dependencies
pip install -r requirements.txt

4. Setup postgres table as
psql -U your_db_user -d resume_screening -f schema.sql
Ensure tables:

users

jobs (includes salary, vector)

applicants (includes vector, match_score, etc.)


5. To run the server
uvicorn core.main:app --reload



 
For FRONTEND SETUP