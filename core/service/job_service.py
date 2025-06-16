from core.repo import job_repo
from core.util.resume_utils import match_resume_to_job_manual

def post_job(title, description, skills, due_date, posted_by):
    return job_repo.create_job(title, description, skills, due_date, posted_by)

def list_jobs():
    return job_repo.get_all_jobs()

def get_job_by_id(job_id):
    return job_repo.get_job_by_id(job_id)

def apply_to_job(job_id, resume_file, job_data):
    return match_resume_to_job_manual(
        resume_file=resume_file,
        job_title=job_data["title"],
        job_description=job_data["description"],
        job_skills=job_data["skills"]
    )
