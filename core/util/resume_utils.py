import math
import string
import fitz  # PyMuPDF for PDFs
import docx  # for DOCX
import io
from collections import Counter, defaultdict

def extract_text_from_resume(file_bytes: bytes, filename: str) -> str:
    """Extract text from PDF or DOCX resume."""
    if filename.endswith(".pdf"):
        with fitz.open(stream=file_bytes, filetype="pdf") as doc:
            return " ".join(page.get_text() for page in doc)
    elif filename.endswith(".docx"):
        doc = docx.Document(io.BytesIO(file_bytes))
        return " ".join(p.text for p in doc.paragraphs)
    else:
        raise ValueError("Unsupported file type. Only PDF and DOCX are allowed.")

def tokenize(text: str):
    """Lowercase, remove punctuation, and split into words."""
    translator = str.maketrans('', '', string.punctuation)
    return text.lower().translate(translator).split()

def compute_tf(doc_tokens):
    tf = Counter(doc_tokens)
    total_terms = len(doc_tokens)
    return {term: count / total_terms for term, count in tf.items()}

def compute_idf(documents):
    """Compute IDF across all docs."""
    N = len(documents)
    idf = defaultdict(lambda: 0)

    for doc in documents:
        seen = set()
        for term in doc:
            if term not in seen:
                idf[term] += 1
                seen.add(term)

    return {term: math.log(N / (df + 1)) + 1 for term, df in idf.items()}

def compute_tfidf_vector(tf, idf):
    return {term: tf.get(term, 0) * idf_val for term, idf_val in idf.items()}

def cosine_similarity_manual(vec1, vec2):
    common_terms = set(vec1.keys()) & set(vec2.keys())
    dot_product = sum(vec1[t] * vec2[t] for t in common_terms)
    
    norm1 = math.sqrt(sum(v**2 for v in vec1.values()))
    norm2 = math.sqrt(sum(v**2 for v in vec2.values()))

    if norm1 == 0 or norm2 == 0:
        return 0.0

    return dot_product / (norm1 * norm2)

def match_resume_to_job_manual(resume_file, job_title, job_description, job_skills):
    contents = resume_file.file.read()
    resume_text = extract_text_from_resume(contents, resume_file.filename)

    job_text = f"{job_title} {job_description} {job_skills}"

    # Tokenize
    resume_tokens = tokenize(resume_text)
    job_tokens = tokenize(job_text)

    # Compute TF
    resume_tf = compute_tf(resume_tokens)
    job_tf = compute_tf(job_tokens)

    # Compute IDF using both docs
    idf = compute_idf([resume_tokens, job_tokens])

    # TF-IDF vectors
    resume_vec = compute_tfidf_vector(resume_tf, idf)
    job_vec = compute_tfidf_vector(job_tf, idf)

    # Cosine similarity
    score = cosine_similarity_manual(resume_vec, job_vec)

    return {
        "match_score": round(score * 100, 2),  # Percentage
        "message": "Resume matched to job successfully"
    }
