from fastapi import APIRouter, Depends
from typing import Optional
from app.models.user import User
from app.dependency import get_current_user
from app.schemas import ProductCreate, ProductUpdate, ProductOut, ProductQuery
from uuid import UUID

router = APIRouter(prefix="/products", tags=["products"])


@router.get("")
async def get_products(
    current_user: User = Depends(get_current_user), query: ProductQuery = Depends()
):
    """Returns all products for the user with a default limit of 10. Also queries the DB based on the search string"""
    return {"success": "true"}


@router.post("")
async def create_product(
    product: ProductCreate, current_user: User = Depends(get_current_user)
):
    """Create a new product for the user"""
    return {"success": "true"}


@router.get("/{product_id}")
async def get_product(product_id: UUID, current_user: User = Depends(get_current_user)):
    """Get product with id"""
    return {"success": "true"}


@router.put("/{product_id}")
async def update_product(
    product_id: UUID, current_user: User = Depends(get_current_user)
):
    """Update an existing product"""
    return {"success": "true"}


@router.patch("/{product_id}")
async def partial_update_product(
    product_id: UUID, current_user: User = Depends(get_current_user)
):
    """Partial update an existing product"""
    return {"success": "true"}


@router.delete("/{product_id}")
async def delete_product(
    product_id: UUID, current_user: User = Depends(get_current_user)
):
    """Delete a product"""
    return {"success": "true"}
