from abc import ABC, abstractmethod
from typing import Optional, List
from Domain.Entities.rutina import Rutina # Importa la Entidad Pura

class RutinaRepositoryInterface(ABC):
    """Interfaz (Puerto) que define las operaciones de persistencia del Agregado Rutina."""

    @abstractmethod
    def save(self, rutina: Rutina) -> Rutina:
        """Guarda o actualiza la Rutina completa (incluyendo sus Ejercicios)."""
        pass

    @abstractmethod
    def get_all(self, skip: int, limit: int) -> List[Rutina]:
        """Lista las rutinas con paginación, devolviendo Entidades de Dominio."""
        pass

    @abstractmethod
    def get_by_id(self, rutina_id: int) -> Optional[Rutina]:
        """Obtiene el detalle completo de una rutina por ID."""
        pass
    
    @abstractmethod
    def get_by_nombre(self, nombre: str) -> Optional[Rutina]:
        """Busca una rutina por su nombre para la validación de unicidad."""
        pass
    
    @abstractmethod
    def delete_by_id(self, rutina_id: int):
        """Elimina el Agregado Rutina completo por ID."""
        pass