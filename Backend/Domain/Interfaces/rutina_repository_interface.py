from abc import ABC, abstractmethod
from typing import Optional
from Domain.Entities.rutina import Rutina # Importa la Entidad Pura

class RutinaRepositoryInterface(ABC):
    """Interfaz (Puerto) que define las operaciones de persistencia del Agregado Rutina."""

    @abstractmethod
    def alta_rutina(self, rutina: Rutina) -> Rutina:
        """Guarda o actualiza la Rutina completa (incluyendo sus Ejercicios)."""
        pass

    @abstractmethod
    def listar_rutinas(self, page: int, size: int) -> List[Rutina]:
        """Lista las rutinas con paginación, devolviendo Entidades de Dominio."""
        pass

    @abstractmethod
    def obtener_detalle_rutina(self, rutina_id: int) -> Optional[Rutina]:
        """Obtiene el detalle completo de una rutina por ID."""
        pass
    
    @abstractmethod
    def buscar_por_nombre(self, nombre: str) -> Optional[Rutina]:
        """Busca una rutina por su nombre para la validación de unicidad."""
        pass
    
    # ... otros métodos (get_by_id, delete, etc.)