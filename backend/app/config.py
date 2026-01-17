from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY environment variable is required")


class Config:
    SECRET_KEY: str = SECRET_KEY
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_TIME: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_TIME", 1800))