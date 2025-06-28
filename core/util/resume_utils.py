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

#  Compute job vector directly from text
def compute_job_vector(title, description, skills):
    text = f"{title} {description} {skills}"
    tokens = tokenize(text)
    tf = compute_tf(tokens)
    idf = compute_idf([tokens])
    vector = compute_tfidf_vector(tf, idf)
    return vector

# Compute resume vector directly from text
def compute_resume_vector(resume_text):
    tokens = tokenize(resume_text)
    tf = compute_tf(tokens)
    idf = compute_idf([tokens])
    vector = compute_tfidf_vector(tf, idf)
    return vector
