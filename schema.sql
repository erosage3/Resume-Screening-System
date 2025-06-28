-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    skills TEXT,
    salary VARCHAR(50),
    due_date DATE NOT NULL,
    posted_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
    vector JSONB,  -- Stored TF-IDF vector for job
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applicants Table
CREATE TABLE IF NOT EXISTS applicants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    match_score FLOAT,
    resume_text TEXT,
    resume_vector JSONB,  -- Stored TF-IDF vector for resume
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
