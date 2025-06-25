from core.repo import job_repo
from core.util.resume_utils import match_resume_to_job_manual, extract_text_from_resume

def post_job(title, description, skills, due_date, posted_by):
    return job_repo.create_job(title, description, skills, due_date, posted_by)

def list_jobs():
    return job_repo.get_all_jobs()

def get_job_by_id(job_id):
    return job_repo.get_job_by_id(job_id)

def get_applicants_for_recruiter(recruiter_id):
    return job_repo.get_applicants_for_recruiter(recruiter_id)


def apply_to_job(job_id, resume_file, job_data, name, email, phone):
    # Match score
    result = match_resume_to_job_manual(
        resume_file=resume_file,
        job_title=job_data["title"],
        job_description=job_data["description"],
        job_skills=job_data["skills"]
    )
    score = result["match_score"]

    # Reset file pointer before reading again
    resume_file.file.seek(0)
    contents = resume_file.file.read()
    resume_text = extract_text_from_resume(contents, resume_file.filename)

    # Save to DB
    job_repo.save_applicant(name, email, phone, job_id, score, resume_text)

    return {
        "match_score": score,
        "message": "Resume processed and saved successfully"
    }
def get_jobs_by_recruiter(recruiter_id):
    return job_repo.get_jobs_by_recruiter(recruiter_id)
