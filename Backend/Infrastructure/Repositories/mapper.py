from Domain.Entities.rutina import Rutina
from Domain.Entities.ejercicio import Ejercicio
from Infrastructure.Repositories.models_db import RutinaDB, EjercicioDB # Modelos DB definidos en el paso anterior

class Mapper():
    
    # ------------------------------------ Mapeo de RutinaDB a Rutina -----------------------------------
    @staticmethod
    def to_domain_entity(rutina_db: RutinaDB) -> Rutina:
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
    # ---------------------------------------------------------------------------------------------------


    # ------------------------------------ Mapeo de EjercicioDB a Ejercicio -----------------------------
    @staticmethod
    def to_domain_entity_ejercicio(ejercicio_db: EjercicioDB) -> Ejercicio:
        """Convierte el Modelo DB a la Entidad de Dominio Pura."""
        return Ejercicio(
            id=ejercicio_db.id, 
            nombre=ejercicio_db.nombre, 
            dia_semana=ejercicio_db.dia_semana,
            series=ejercicio_db.series,
            repeticiones=ejercicio_db.repeticiones,
            peso=ejercicio_db.peso,
            notas=ejercicio_db.notas,
            orden=ejercicio_db.orden,
            rutina_id=ejercicio_db.rutina_id
        )
    # ---------------------------------------------------------------------------------------------------


    # ------------------------------------ Mapeo de Rutina a RutinaDB -----------------------------------
    @staticmethod
    def to_db_model(rutina_domain: Rutina) -> RutinaDB:
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
    # ---------------------------------------------------------------------------------------------------