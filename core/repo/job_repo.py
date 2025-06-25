from core.repo.db import get_connection

def create_job(title: str, description: str, skills: str, due_date: str, posted_by: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO jobs (title, description, skills, due_date, posted_by)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id
    """, (title, description, skills, due_date, posted_by))
    job_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return job_id

def get_all_jobs():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, title, description, skills, due_date, posted_by, created_at FROM jobs")
    jobs = cur.fetchall()
    cur.close()
    conn.close()
    return jobs

def get_job_by_id(job_id: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT title, description, skills FROM jobs WHERE id = %s", (job_id,))
    job = cur.fetchone()
    cur.close()
    conn.close()
    if not job:
        return None
    return {"title": job[0], "description": job[1], "skills": job[2]}

def save_applicant(name, email, phone, job_id, match_score, resume_text):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO applicants (name, email, phone, job_id, match_score, resume_text)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (name, email, phone, job_id, match_score, resume_text))
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
        SELECT id, title, description, skills, due_date, posted_by, created_at
        FROM jobs
        WHERE posted_by = %s
        ORDER BY created_at DESC
    """, (recruiter_id,))
    jobs = cur.fetchall()
    cur.close()
    conn.close()
    return jobs
