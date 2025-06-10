from core.repo.db import get_connection

def create_user(email: str, hashed_password: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, hashed_password))
    conn.commit()
    cur.close()
    conn.close()

def get_user_by_email(email: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user
