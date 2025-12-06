from sqlmodel import Session, select, Relationship, func
from typing import Optional, List
from Domain.Entities.rutina import Rutina
from Domain.Entities.ejercicio import Ejercicio
from Domain.Exceptions.domain_exception import ValueError
from Domain.Interfaces.rutina_repository_interface import RutinaRepositoryInterface
from Infrastructure.Repositories.models_db import RutinaDB, EjercicioDB 
from Infrastructure.Repositories.mapper import Mapper

class RutinaRepository(RutinaRepositoryInterface):
    """Implementación concreta del Repositorio de Rutinas usando SQLModel/PostgreSQL."""
    
    def __init__(self, session: Session):
        self.session = session
    

    # --------------------------------- ALTA Y MODIFICACION DE RUTINA ----------------------
    def save(self, rutina: Rutina) -> Rutina:
        """Implementa el guardado/actualizado del Agregado."""
        rutina_db = Mapper.to_db_model(rutina)

        if rutina_db.id is not None:
             # Si ya tiene ID, usamos merge para asegurar que actualiza.
             rutina_db = self.session.merge(rutina_db)
        else:
             # Si el ID es None (nueva creación), usamos add.
             self.session.add(rutina_db)
    
        self.session.commit()
        self.session.refresh(rutina_db)
        return Mapper.to_domain_entity(rutina_db)
    # ---------------------------------------------------------------------------------------


    # -------------------------------------- LISTAR RUTINAS ---------------------------------
    def get_all(self, skip: int = 0, limit: int = 100) -> List[Rutina]:
        """Devuelve una lista paginada de autos"""
        query = select(RutinaDB).offset(skip).limit(limit)
        rutinas = self.session.exec(query).all()
        return rutinas
    # ---------------------------------------------------------------------------------------


    # ------------------------------------- BUSCAR POR ID -----------------------------------
    def get_by_id(self, rutina_id: int) -> Optional[Rutina]:
        """Obtiene una Rutina y sus Ejercicios por ID."""
        statement = select(RutinaDB).where(RutinaDB.id == rutina_id)
        rutina_db = self.session.exec(statement).first()
        if rutina_db:
            return Mapper.to_domain_entity(rutina_db)
        return None
    # ----------------------------------------------------------------------------------------
    

    # ------------------------------------- BUSCAR POR NOMBRE --------------------------------
    def get_by_nombre(self, nombre: str) -> Optional[Rutina]:
        """Implementa la búsqueda por nombre."""
        statement = select(RutinaDB).where(RutinaDB.nombre == nombre)
        rutina_db = self.session.exec(statement).first()
        if rutina_db:
            return Mapper.to_domain_entity(rutina_db)
        return None
    # -----------------------------------------------------------------------------------------

    
    # -------------------------------- BUSQUEDA PARCIAL POR NOMBRE ----------------------------
    def search_by_name(self, termino: str) -> List[Rutina]:
        """
        Busca rutinas cuyo nombre contenga el término de búsqueda,
        ignorando mayúsculas y minúsculas (LIKE ILIKE %termino%).
        """
        if not termino:
            return get_all() # Si el término está vacío, devolvemos todas las rutinas.
        search_pattern = f"%{termino.lower()}%"

        statement = select(RutinaDB).where(func.lower(RutinaDB.nombre).like(search_pattern))
        rutinas_db = self.session.exec(statement).all()

        return [Mapper.to_domain_entity(r) for r in rutinas_db]
    # -----------------------------------------------------------------------------------------


    # ------------------------------------- DAR DE BAJA UNA RUTINA ----------------------------
    def delete_by_id(self, rutina_id: int):
        """Busca el modelo DB por ID y lo elimina. El ORM debe manejar la cascada."""
        # Buscar el modelo DB
        rutina_db = self.session.get(RutinaDB, rutina_id)
        if not rutina_db:
            raise ValueError(f"Rutina con ID {rutina_id} no encontrada.")
        
        self.session.delete(rutina_db)
        self.session.commit()
    # -----------------------------------------------------------------------------------------
        


