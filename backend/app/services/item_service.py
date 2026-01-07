from typing import List, Optional
from ..repositories.item_repository import InMemoryItemRepository
from ..models.item import ItemModel


class ItemService:
    def __init__(self, repo: InMemoryItemRepository):
        self.repo = repo

    def list_items(self) -> List[ItemModel]:
        return self.repo.list_items()

    def get_item(self, item_id: int) -> Optional[ItemModel]:
        return self.repo.get_item(item_id)

    def create_item(self, name: str, quantity: int) -> ItemModel:
        return self.repo.create_item(name, quantity)

    def update_item(self, item_id: int, name: Optional[str], quantity: Optional[int]) -> Optional[ItemModel]:
        return self.repo.update_item(item_id, name, quantity)

    def delete_item(self, item_id: int) -> bool:
        return self.repo.delete_item(item_id)
