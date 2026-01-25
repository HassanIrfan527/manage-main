from pydantic import BaseModel
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    description: str
    cost_price: int
    sale_price: int
    quantity: int | None
    created_at: datetime
    updated_at: datetime
    
class ProductAll(ProductBase):
    user_id: int
    delivery_charges: int
