from typing import Optional, List
from datetime import datetime
from Domain.Entities.ejercicio import Ejercicio

class Rutina: # Elegiremos rutina como el Agregado de nuestro dominio.
    """Entidad Raíz del Agregado Rutina"""
    def __init__( self, id: Optional[int] = None, nombre: Optional[str] = None, descripcion: Optional[str] = None,
        fecha_creacion: Optional[datetime] = None, ejercicios: List[Ejercicio] = None ):
        self.id = id
        self.nombre = nombre
        self.descripcion = descripcion
        self.fecha_creacion = fecha_creacion or datetime.now()
        self.ejercicios: List[Ejercicio] = ejercicios if ejercicios is not None else []
    
    # Este es el método de comportamiento del Agregado.
    def actualizar_ejercicio(self, id_ejercicio: int, datos_actualizacion: dict):
        # Implementación vista anteriormente. Usa datos_actualizacion (dict)
        # o un Objeto de Dominio si la actualización es compleja.
        pass