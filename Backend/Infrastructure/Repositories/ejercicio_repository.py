from sqlmodel import Session, select
from typing import Optional, Dict, Any
from Domain.Entities.ejercicio import Ejercicio
from Domain.Interfaces.ejercicio_repository_interface import EjercicioRepositoryInterface
from Infrastructure.Repositories.models_db import EjercicioDB # Tu modelo de base de datos
from Infrastructure.Repositories.mapper import Mapper


class EjercicioRepository(EjercicioRepositoryInterface):
    """Implementación concreta del Repositorio de Ejercicios."""
    
    def __init__(self, session: Session):
        self.session = session


    # ------------------------------------ ACTUALIZAR EJERCICIO -------------------------------------------
    def update_by_id(self, ejercicio_id: int, data: dict) -> Optional[Ejercicio]:
        """Actualiza un Ejercicio por su ID."""
        ejercicio_db = self.session.get(EjercicioDB, ejercicio_id)
        
        if not ejercicio_db:
            return None

        for key, value in data.items():
            if hasattr(ejercicio_db, key) and value is not None:
                setattr(ejercicio_db, key, value)
        
        self.session.add(ejercicio_db)
        self.session.commit()
        self.session.refresh(ejercicio_db)

        return Mapper.to_domain_entity_ejercicio(ejercicio_db)
    # -----------------------------------------------------------------------------------------------------


    # ------------------------------------ ELIMINAR EJERCICIO ---------------------------------------------
    def delete_by_id(self, ejercicio_id: int) -> bool:
        """Elimina un Ejercicio por su ID."""
        ejercicio_db = self.session.get(EjercicioDB, ejercicio_id)
        
        if not ejercicio_db:
            return False

        self.session.delete(ejercicio_db)
        self.session.commit()
        return True
    # -----------------------------------------------------------------------------------------------------