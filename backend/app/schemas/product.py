from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# Shared fields
class ProductBase(BaseModel):
    name: str
    description: str
    cost_price: int
    sale_price: int
    delivery_charges: int
    quantity: int | None = 0


# For creation
class ProductCreate(ProductBase):
    pass


# For updates
class ProductUpdate(BaseModel):
    name: str | None
    description: str | None
    cost_price: int | None
    sale_price: int | None
    delivery_charges: int | None
    quantity: int | None


# For output
class ProductOut(ProductBase):
    id: str  # UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# For GET Query parameters
class ProductQuery(BaseModel):
    limit: int = 10
    offset: int = 0
    search: Optional[str] = None
    sort_by: Optional[str] = "name"
    order: Optional[str] = "asc"
