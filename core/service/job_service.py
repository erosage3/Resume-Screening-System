from core.repo import job_repo
from core.util.resume_utils import tokenize, compute_tf, compute_idf, compute_tfidf_vector, cosine_similarity_manual, extract_text_from_resume

def post_job(title, company, location, job_type, description,  salary, due_date, posted_by, job_vector):
    job_text = f"{title} {company} {location} {job_type} {description} "
    tokens = tokenize(job_text)
    tf = compute_tf(tokens)
    idf = compute_idf([tokens])
    job_vector = compute_tfidf_vector(tf, idf)

    return job_repo.create_job(title, company, location, job_type, description,salary, due_date, posted_by, job_vector)

def list_jobs():
    return job_repo.get_all_jobs()

def get_job_by_id(job_id):
    return job_repo.get_job_by_id(job_id)

def get_applicants_for_recruiter(recruiter_id):
    return job_repo.get_applicants_for_recruiter(recruiter_id)

def apply_to_job(job_id, resume_file, job_data, name, email, phone):
    resume_file.file.seek(0)
    contents = resume_file.file.read()
    resume_text = extract_text_from_resume(contents, resume_file.filename)

    resume_tokens = tokenize(resume_text)
    resume_tf = compute_tf(resume_tokens)
    idf = compute_idf([resume_tokens])
    resume_vector = compute_tfidf_vector(resume_tf, idf)

    job_vector = job_data["job_vector"]
    match_score = round(cosine_similarity_manual(resume_vector, job_vector) * 100, 2)

    job_repo.save_applicant(name, email, phone, job_id, match_score, resume_text, resume_vector)

    return {
        "match_score": match_score,
        "message": "Resume processed and saved successfully"
    }

def get_jobs_by_recruiter(recruiter_id):
    return job_repo.get_jobs_by_recruiter(recruiter_id)

def delete_job(job_id, recruiter_id):
    job = job_repo.get_job_by_id_full(job_id)
    if not job:
        raise Exception("Job not found")

    if job["posted_by"] != recruiter_id:
        raise ValueError("You are not authorized to delete this job.")

    job_repo.delete_job(job_id)
