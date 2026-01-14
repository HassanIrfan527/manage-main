from datetime import datetime, timezone
import bcrypt
from fastapi import HTTPException, status
from app.repositories.user_repository import UserRepository
from app.models.user import User
from app.schemas.users import UserCreate
from app.enums.errors import ErrorCode


def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash."""
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def register_user(self, user_data: UserCreate) -> User | ErrorCode:
        """Register a new user. Returns None if email already exists."""
        # 1. Check if user already exists
        existing = await self.repo.get_by_email(user_data.email)
        if existing:
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "code": ErrorCode.EMAIL_ALREADY_EXISTS,
                "message": "This email is already in use."
            }
        )

        # 2. Hash the password
        hashed_password = hash_password(user_data.password)

        # 3. Create user with all required fields
        now = datetime.now(timezone.utc)
        new_user = User(
            name=user_data.name,
            email=user_data.email,
            password=hashed_password,  # Store hashed password in 'password' field
            created_at=now,
            updated_at=now,
        )

        # 4. Save and return
        return await self.repo.create(new_user)
