from abc import ABC, abstractmethod
from Domain.Entities.rutina import Rutina
from Application.DTOs.rutina_dto import RutinaConEjerciciosCreate

class RutinaServiceInterface(ABC):
    """
    Interfaz (Puerto) que define el Caso de Uso para la creación de Rutinas.
    El Controlador dependerá de esta interfaz.
    """
    @abstractmethod
    def alta_rutina(self, data: RutinaConEjerciciosCreate) -> Rutina:
        """Contrato para dar de alta una rutina completa."""
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
    
