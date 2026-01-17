from app.config import Config
import jwt
from datetime import datetime, timedelta, timezone
from typing import Optional

async def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Generate a JWT access token for user for login/register"""
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=Config.ACCESS_TOKEN_EXPIRE_TIME)

    to_encode.update({"exp": expire})

    # Return: The signed string
    return jwt.encode(to_encode, Config.SECRET_KEY, algorithm=Config.ALGORITHM)



def verify_token(token: str) -> dict | None:
    """Verify and decode a JWT token. Returns payload or None if invalid."""
    try:
        payload = jwt.decode(token, Config.SECRET_KEY, algorithms=[Config.ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None