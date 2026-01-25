from uuid import uuid4
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    DateTime,
    UUID,
    Text,
    ForeignKey,
    Integer,
    CheckConstraint,
)
from app.database import Base
from sqlalchemy.orm import relationship

class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    user_id = Column(ForeignKey("users.id"))
    
    name = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=False)

    cost_price = Column(Integer, nullable=False)
    sale_price = Column(Integer, nullable=False)
    delivery_charges = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=True)

    created_at = Column(
        DateTime, nullable=False, default=lambda: datetime.now(timezone.utc)
    )
    updated_at = Column(
        DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    owner = relationship("User", back_populates="products")

    # Constraints
    __table_args__ = (
        # Prevents quantity from being -1, -5, etc.
        CheckConstraint("quantity >= 0", name="check_quantity_not_negative"),
    )

    @property
    def stock_status(self):
        """Returns Stock's status (Either In-stock/out-of-stock)"""
        if self.quantity is None:
            return "Infinite"
        if self.quantity == 0:
            return "Out of Stock"
        return f"{self.quantity} in stock"

    @property
    def profit_margin(self):
        """Calculates the raw profit per product"""
        if self.cost_price == 0:
            return 0
        profit_amount = self.sale_price - self.cost_price
        # Calculate percentage (with safety check for division by zero)
        percentage = 0
        if self.cost_price > 0:
            percentage = (profit_amount / self.cost_price) * 100

        return {"profit": profit_amount, "percentage": round(percentage, 2)}

    @property
    def total_price(self):
        """Calculates price with delivery"""
        return self.sale_price + self.delivery_charges
