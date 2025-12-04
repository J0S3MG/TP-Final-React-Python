from pydantic import BaseModel
from sqlmodel import SQLModel, Field # Se usa SQLModel aquí como DTO
from typing import Optional, List
from datetime import datetime
# Importamos los DTOs de Ejercicio aquí (abajo) para la respuesta

# DTOs de Solicitud (Request)
class RutinaCreate(SQLModel):
    """DTO para crear una Rutina"""
    nombre: str = Field(..., max_length=100)
    descripcion: Optional[str] = Field(None, max_length=500)


class RutinaConEjerciciosCreate(SQLModel):
    rutina: RutinaCreate
    ejercicios: List["EjercicioCreate"] # Referencia a DTOs


class RutinaUpdate(BaseModel):
    """DTO para actualizar la Rutina"""
    nombre: Optional[str] = Field(None, max_length=100)
    descripcion: Optional[str] = Field(None, max_length=500)

# DTOs de Respuesta (Response)
class RutinaResponse(SQLModel):
    """DTO para la respuesta de Rutina simple"""
    id: int
    nombre: str
    descripcion: Optional[str] = None
    fecha_creacion: datetime
    ejercicios: List["EjercicioResponse"] = [] # Referencia a DTOs
    

# 1. DTO para un grupo de ejercicios por día (Sub-Response)
class EjerciciosPorDiaResponse(SQLModel):
    """Modelo para respuesta de ejercicios agrupados por día de la semana"""
    dia: DiaSemana
    ejercicios: List["EjercicioResponse"] # Asume EjercicioResponse está definido/importado


# 2. DTO de Detalle (Respuesta Completa)
class RutinaConEjerciciosPorDiaResponse(RutinaResponse):
    """
    Modelo para respuesta de rutina con ejercicios organizados por día.
    Hereda de RutinaResponse (ID, nombre, descripción, fecha_creacion).
    """
    # Sobrescribe el campo 'ejercicios' para usar la agrupación por día
    ejercicios: List["EjercicioResponse"] = [] # Mantener por consistencia o eliminar
    ejercicios_por_dia: List[EjerciciosPorDiaResponse] = []


# Importaciones y refs para resolver dependencia circular
from Application.DTOs.ejercicio_dto import EjercicioResponse, EjercicioCreate
RutinaResponse.update_forward_refs()
RutinaConEjerciciosCreate.update_forward_refs()