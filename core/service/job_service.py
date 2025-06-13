from core.repo import job_repo

def post_job(title, description, skills, due_date, posted_by):
    return job_repo.create_job(title, description, skills, due_date, posted_by)

def list_jobs():
    return job_repo.get_all_jobs()
