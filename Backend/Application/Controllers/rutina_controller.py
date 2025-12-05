from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List
from Domain.Entities.ejercicio import Ejercicio
from Domain.ValueObjects.dias import DiaSemana
from Domain.Exceptions.domain_exception import ValueError
from Domain.Interfaces.rutina_service_interface import RutinaServiceInterface
from Application.DTOs.ejercicio_dto import EjercicioResponse
from Application.DTOs.rutina_dto import RutinaConEjerciciosCreate, RutinaResponse, RutinaModificarRequest
from Application.Exceptions.rutina_exception import RutinaAlreadyExistsError, RutinaNotFoundError
from Infrastructure.deps import get_rutina_service

router = APIRouter(prefix="/rutinas", tags=["Rutinas"])

# ------------------------------------ ALTA RUTINAS ------------------------------------------------------------
@router.post(" ", response_model=RutinaResponse, status_code=status.HTTP_201_CREATED, summary="Da de Alta una Rutina", operation_id="Alta_Rutina")
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
# --------------------------------------------------------------------------------------------------------------


# ------------------------------------ LISTAR RUTINAS ----------------------------------------------------------
@router.get( " ", response_model=List[RutinaResponse], summary="Lista todas las rutinas con paginación", operation_id="Listar_Rutina" )
def listar_rutinas( skip: int = Query(0, ge=0, description="Número de autos a saltar"),
    limit: int = Query(100, ge=1, le=1000, description="Número de autos a devolver"),
    servicio: RutinaServiceInterface = Depends(get_rutina_service)) -> List[RutinaResponse]:
    try:
        rutinas = servicio.listar_rutinas(skip, limit)
        return [RutinaResponse.model_validate(r) for r in rutinas]
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
# --------------------------------------------------------------------------------------------------------------


# ------------------------------------ BUSCAR RUTINA POR ID ----------------------------------------------------
@router.get("/{rutina_id}", response_model=RutinaResponse, summary="Obtiene el detalle completo de una rutina agrupado por día", operation_id="Rutina_por_dia")
def obtener_detalle_rutina( rutina_id: int, servicio: RutinaServiceInterface = Depends(get_rutina_service)):
    try:
        rutina_domain = servicio.obtener_detalle_rutina(rutina_id)
        response_data = RutinaResponse.model_validate(rutina_domain)
        return response_data
    except RutinaNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
# --------------------------------------------------------------------------------------------------------------


# ------------------------------------ BUSCAR RUTINA POR NOMBRE ------------------------------------------------
@router.get("/nombre/{nombre}", response_model=RutinaResponse, summary="Buscar una Rutina por su nombre", operation_id="Buscar_Rutina_por_Nombre")
def buscar_por_nombre( nombre: str, servicio: RutinaServiceInterface = Depends(get_rutina_service)) -> RutinaResponse:
    try:
        rutina = servicio.buscar_por_nombre(nombre)
        return RutinaResponse.model_validate(rutina)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
# --------------------------------------------------------------------------------------------------------------


# ------------------------------------ MODIFICAR RUTINA --------------------------------------------------------
@router.put("/{rutina_id}", response_model=RutinaResponse, summary="Modifica una rutina existente y sus ejercicios asociados", operation_id="Modificar_Rutina")
def modificar_rutina( rutina_id: int, data: RutinaModificarRequest, servicio: RutinaServiceInterface = Depends(get_rutina_service)):
    try:
        # Llamada al Caso de Uso/Servicio de Aplicación
        rutina_domain = servicio.modificar_rutina(rutina_id, data)
        response_data = RutinaResponse.model_validate(rutina_domain)
        return response_data
    except RutinaNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except RutinaAlreadyExistsError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
    except ValueError as e:
        # Errores de Dominio (e.g., Ejercicio no encontrado en el agregado)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
# --------------------------------------------------------------------------------------------------------------


# ------------------------------------ DAR DE BAJA UNA RUTINA --------------------------------------------------
@router.delete("/{rutina_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Elimina una rutina y todos sus ejercicios asociados", operation_id="Dar_Baja_Rutina")
def dar_baja_rutina( rutina_id: int, rutina_service: RutinaServiceInterface = Depends(get_rutina_service)):
    try:
        # Llamada al Caso de Uso/Servicio de Aplicación
        rutina_service.dar_baja_rutina(rutina_id)
        return 
    except RutinaNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
# --------------------------------------------------------------------------------------------------------------


