from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("")
async def dashboard():
    """Dashboard endpoint."""
    return {"message": "Welcome to the dashboard!"}
