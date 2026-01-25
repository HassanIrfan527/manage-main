from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.product import Product
from uuid import UUID


class ProductRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, product_id: UUID) -> Product | None:
        """Find a user by id."""
        result = await self.db.execute(select(Product).where(Product.id == product_id))
        return result.scalar_one_or_none()

    async def create(self, product_obj: Product) -> Product:
        """Save a new product to the database."""
        self.db.add(product_obj)
        await self.db.commit()
        await self.db.refresh(product_obj)
        return product_obj
