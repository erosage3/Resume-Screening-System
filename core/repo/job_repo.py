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
