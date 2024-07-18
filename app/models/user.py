from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.sql import func
from app.database import Base
from pydantic import BaseModel
from datetime import datetime


class DateTime_(datetime):
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler):
        return handler(cls)

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if isinstance(v, datetime):
            return v
        return datetime.fromisoformat(v)


class UserCreate(BaseModel):
    id: int
    username: str
    email: str
    password_hash: str
    role: str
    created_at: str
    updated_at: str

    class Config:
        arbitrary_types_allowed = True


# Define the User model
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(128), nullable=False)
    role = Column(Enum('user', 'admin', name='user_roles'), default='user')
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())