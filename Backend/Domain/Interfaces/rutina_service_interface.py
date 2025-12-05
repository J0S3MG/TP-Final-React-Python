from abc import ABC, abstractmethod
from typing import Optional, List
from Domain.Entities.rutina import Rutina
from Application.DTOs.rutina_dto import RutinaConEjerciciosCreate, RutinaModificarRequest

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
    def listar_rutinas(self, skip: int, limit: int) -> List[Rutina]:
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

    @abstractmethod
    def modificar_rutina(self, rutina_id: int, data: RutinaModificarRequest) -> Rutina:
        """Modifica la rutina base y sus ejercicios asociados (agregar/editar/eliminar)."""
        pass

    @abstractmethod
    def dar_baja_rutina(self, rutina_id: int):
        """Elimina el Agregado Rutina completo por ID."""
        pass
    
