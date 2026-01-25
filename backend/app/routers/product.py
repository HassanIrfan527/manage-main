from fastapi import APIRouter

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/all")
async def getAllProducts():
    """Dashboard endpoint - protected route"""
    return {'success': 'true'}
