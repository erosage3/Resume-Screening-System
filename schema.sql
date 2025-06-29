-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    job_type VARCHAR(50) NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship', 'remote')),
    description TEXT NOT NULL,
    salary VARCHAR(100) NOT NULL,
    due_date DATE NOT NULL,
    posted_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
    job_vector JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create applicants table
CREATE TABLE IF NOT EXISTS applicants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    match_score FLOAT,
    resume_text TEXT,
    resume_vector JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
