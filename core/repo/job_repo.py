import datetime
from core.repo.db import get_connection
import json

def create_job(title: str, description: str, skills: str, due_date: str, salary: str, posted_by: int, job_vector: dict):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO jobs (title, description, skills, due_date, salary, posted_by, job_vector)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (title, description, skills, due_date, salary, posted_by, json.dumps(job_vector)))
    job_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return job_id

def get_all_jobs():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, title, description, skills, due_date, salary, posted_by, created_at FROM jobs")
    jobs = cur.fetchall()
    cur.close()
    conn.close()
    return jobs

def get_job_by_id(job_id: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT title, description, skills, job_vector FROM jobs WHERE id = %s", (job_id,))
    job = cur.fetchone()
    cur.close()
    conn.close()
    if not job:
        return None
    return {"title": job[0], "description": job[1], "skills": job[2], "job_vector": json.loads(job[3])}

def save_applicant(name, email, phone, job_id, match_score, resume_text, resume_vector):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO applicants (name, email, phone, job_id, match_score, resume_text, resume_vector)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (name, email, phone, job_id, match_score, resume_text, json.dumps(resume_vector)))
    conn.commit()
    cur.close()
    conn.close()

def get_applicants_for_recruiter(recruiter_id: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT a.id, a.name, a.email, a.phone, a.match_score, a.created_at, j.title
        FROM applicants a
        JOIN jobs j ON a.job_id = j.id
        WHERE j.posted_by = %s
        ORDER BY a.created_at DESC
    """, (recruiter_id,))
    data = cur.fetchall()
    cur.close()
    conn.close()
    return data

def get_jobs_by_recruiter(recruiter_id: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, title, description, skills, due_date, salary, posted_by, created_at
        FROM jobs
        WHERE posted_by = %s
        ORDER BY created_at DESC
    """, (recruiter_id,))
    jobs = cur.fetchall()
    cur.close()
    conn.close()
    return jobs
def update_job(
    job_id: int,
    title: str,
    company: str,
    location: str,
    job_type: str,
    description: str,
    salary: str,
    due_date: str
):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        UPDATE jobs
        SET 
            title = %s,
            company = %s,
            location = %s,
            type = %s,
            description = %s,
            salary = %s,
            due_date = %s,
            updated_at = %s
        WHERE id = %s
    """, (
        title,
        company,
        location,
        job_type,
        description,
        salary,
        due_date,
        datetime.now(),
        job_id
    ))
    conn.commit()
    cur.close()
    conn.close()

def delete_job(job_id, user_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM jobs WHERE id = %s AND posted_by = %s", (job_id, user_id))
    conn.commit()
    cur.close()
    conn.close()