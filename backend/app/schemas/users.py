from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    name: str
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    password: str | None = None


class User(UserBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True