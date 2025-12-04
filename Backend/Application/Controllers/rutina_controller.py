from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List
from Application.DTOs.rutina_dto import RutinaConEjerciciosCreate, RutinaResponse
from Application.Services.rutina_service import RutinaAlreadyExistsError
from Domain.Interfaces.rutina_service_interface import RutinaServiceInterface
from Infrastructure.deps import get_rutina_service

router = APIRouter(prefix="/rutinas", tags=["Rutinas"])

# -------------------------------- POST ---------------------------------------------
# Definimos el endpoint: POST/rutinas.
@router.post("/", response_model=RutinaResponse, status_code=status.HTTP_201_CREATED, summary="Da de Alta una Rutina", operation_id="Alta_Rutina")
def alta_rutina( data: RutinaConEjerciciosCreate,
    servicio: RutinaServiceInterface = Depends(get_rutina_service)) -> RutinaResponse:
    try:
        # Llamada al Caso de Uso/Servicio de Aplicación
        rutina = servicio.alta_rutina(data)

        # Mapeo de Entidad de Dominio a DTO de Respuesta (para el cliente)
        return RutinaResponse.model_validate(rutina) 
    except RutinaAlreadyExistsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, 
            detail=str(e)
        )
    except Exception as e:
        # Manejo de errores generales (e.g., errores de DB, validación de Pydantic)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Error al crear la rutina: {str(e)}"
        )
# -----------------------------------------------------------------------------------


# ------------------------------------ LISTAR RUTINAS ----------------------------------------------------------
@router.get( "/rutinas", response_model=List[RutinaResponse], summary="Lista todas las rutinas con paginación" )
def listar_rutinas( skip: int = Query(0, ge=0, description="Número de autos a saltar"),
    limit: int = Query(100, ge=1, le=1000, description="Número de autos a devolver"),
    rutina_service: RutinaServiceInterface = Depends(get_rutina_service)) -> List[RutinaResponse]:
    try:
       return servicio.listar_rutinas(skip, limit)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
# ---------------------------------------------------------------------------------------------------------------


# -----------------------------------------------------------------------------------
@router.get(
    "/rutinas/{rutina_id}",
    response_model=RutinaConEjerciciosPorDiaResponse,
    summary="Obtiene el detalle completo de una rutina agrupado por día"
)
def get_rutina_detail(
    rutina_id: int,
    rutina_service: RutinaServiceInterface = Depends(get_rutina_service)
):
    try:
        # 1. Llamada al Caso de Uso (obtiene la Entidad con todos los ejercicios)
        rutina_domain = rutina_service.obtener_detalle_rutina(rutina_id)

        # 2. Mapeo de Entidad a DTO y Lógica de Presentación (Agrupación)
        
        # Mapeo de campos base
        response_data = RutinaConEjerciciosPorDiaResponse.model_validate(rutina_domain)
        
        # Agrupación y mapeo de ejercicios (lógica de presentación)
        response_data.ejercicios_por_dia = _group_exercises_by_day(rutina_domain.ejercicios)
        
        return response_data
        
    except RutinaNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
# -----------------------------------------------------------------------------------
