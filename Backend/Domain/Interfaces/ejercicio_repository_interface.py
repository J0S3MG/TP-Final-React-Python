from abc import ABC, abstractmethod
from typing import Optional, Dict, Any
from Domain.Entities.ejercicio import Ejercicio

class EjercicioRepositoryInterface(ABC):
    """Interfaz (Puerto) que define las operaciones de persistencia del Ejercicio."""
    
    @abstractmethod
    def update_by_id(self, ejercicio_id: int, data: Dict[str, Any]) -> Optional[Ejercicio]:
        """Actualiza los campos de un Ejercicio por su ID de manera individual."""
        pass
    
    @abstractmethod
    def delete_by_id(self, ejercicio_id: int) -> bool:
        """Elimina un Ejercicio por su ID. Devuelve True si fue eliminado."""
        pass