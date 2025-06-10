from passlib.context import CryptContext
from core.repo import auth_repo

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def register_user(email: str, password: str):
    hashed = hash_password(password)
    return auth_repo.create_user(email, hashed)

def login_user(email: str, password: str):
    user = auth_repo.get_user_by_email(email)
    if not user:
        return None
    if not verify_password(password, user[2]):
        return None
    return user
