from fastapi import APIRouter, Depends
from app.dependency import get_current_user
from app.models.user import User

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("")
async def get_dashboard(user: User = Depends(get_current_user)):
    """Dashboard endpoint - protected route"""
    return {"name": user.name}
