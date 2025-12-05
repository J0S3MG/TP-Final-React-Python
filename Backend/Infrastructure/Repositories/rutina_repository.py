from sqlmodel import Session, select, Relationship
from typing import Optional, List
from Domain.Entities.rutina import Rutina
from Domain.Entities.ejercicio import Ejercicio
from Domain.Exceptions.domain_exception import ValueError
from Domain.Interfaces.rutina_repository_interface import RutinaRepositoryInterface
from Infrastructure.Repositories.models_db import RutinaDB, EjercicioDB # Modelos DB definidos en el paso anterior

class RutinaRepository(RutinaRepositoryInterface):
    """Implementación concreta del Repositorio de Rutinas usando SQLModel/PostgreSQL."""
    
    def __init__(self, session: Session):
        self.session = session


    # ------------------------------------ Mapeo (Mapper) -----------------------------------
    def _to_domain_entity(self, rutina_db: RutinaDB) -> Rutina:
        """Convierte el Modelo DB a la Entidad de Dominio Pura."""
        ejercicios_domain = [
            Ejercicio(
                # ... mapeo de todos los campos de EjercicioDB a Ejercicio.
                id=e.id, 
                nombre=e.nombre, 
                dia_semana=e.dia_semana,
                series=e.series,
                repeticiones=e.repeticiones,
                peso=e.peso,
                notas=e.notas,
                orden=e.orden,
                rutina_id=e.rutina_id
            ) for e in rutina_db.ejercicios
        ]
        return Rutina(
            id=rutina_db.id,
            nombre=rutina_db.nombre,
            descripcion=rutina_db.descripcion,
            fecha_creacion=rutina_db.fecha_creacion,
            ejercicios=ejercicios_domain
        )


    def _to_db_model(self, rutina_domain: Rutina) -> RutinaDB:
        """Convierte la Entidad de Dominio Pura al Modelo DB (para guardar)."""
        rutina_db = RutinaDB(
            id=rutina_domain.id,
            nombre=rutina_domain.nombre,
            descripcion=rutina_domain.descripcion,
            fecha_creacion=rutina_domain.fecha_creacion,
        ) 
        # Mapeo de Ejercicios. Necesario para manejar la relación en el ORM.
        rutina_db.ejercicios = [
             EjercicioDB(
                id=e.id,
                nombre=e.nombre,
                dia_semana=e.dia_semana,
                series=e.series,
                repeticiones=e.repeticiones,
                peso=e.peso,
                notas=e.notas,
                orden=e.orden,
                rutina_id=e.rutina_id # Puede ser None en objetos nuevos
            ) for e in rutina_domain.ejercicios
        ]
        return rutina_db
    # --------------------------------------------------------------------------------------


    # ---------------------------------- Implementación del Contrato -----------------------

    
    # --------------------------------- ALTA Y MODIFICACION DE RUTINA ----------------------
    def save(self, rutina: Rutina) -> Rutina:
        """Implementa el guardado/actualizado del Agregado."""
        rutina_db = self._to_db_model(rutina)

        if rutina_db.id is not None:
             # Si ya tiene ID, usamos merge para asegurar que actualiza.
             rutina_db = self.session.merge(rutina_db)
        else:
             # Si el ID es None (nueva creación), usamos add.
             self.session.add(rutina_db)
    
        self.session.commit()
        self.session.refresh(rutina_db)
        return self._to_domain_entity(rutina_db)
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
            return self._to_domain_entity(rutina_db)
        return None
    # ----------------------------------------------------------------------------------------
    

    # ------------------------------------- BUSCAR POR NOMBRE --------------------------------
    def get_by_nombre(self, nombre: str) -> Optional[Rutina]:
        """Implementa la búsqueda por nombre."""
        statement = select(RutinaDB).where(RutinaDB.nombre == nombre)
        rutina_db = self.session.exec(statement).first()
        if rutina_db:
            return self._to_domain_entity(rutina_db)
        return None
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
        


