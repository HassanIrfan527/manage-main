from typing import Dict, List, Optional
from ..models.item import ItemModel


class InMemoryItemRepository:
    def __init__(self):
        self._items: Dict[int, ItemModel] = {}
        self._next_id = 1

    def list_items(self) -> List[ItemModel]:
        return list(self._items.values())

    def get_item(self, item_id: int) -> Optional[ItemModel]:
        return self._items.get(item_id)

    def create_item(self, name: str, quantity: int) -> ItemModel:
        item = ItemModel(id=self._next_id, name=name, quantity=quantity)
        self._items[self._next_id] = item
        self._next_id += 1
        return item

    def update_item(self, item_id: int, name: Optional[str], quantity: Optional[int]) -> Optional[ItemModel]:
        item = self._items.get(item_id)
        if not item:
            return None
        if name is not None:
            item.name = name
        if quantity is not None:
            item.quantity = quantity
        return item

    def delete_item(self, item_id: int) -> bool:
        return self._items.pop(item_id, None) is not None
