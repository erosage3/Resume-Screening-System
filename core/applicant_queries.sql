

CREATE TABLE applicants (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    resume_text TEXT NOT NULL,
    match_score NUMERIC(5, 2),
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
