from fastapi import APIRouter, Depends, HTTPException, status
from Domain.Interfaces.rutina_service_interface import RutinaServiceInterface
from Application.DTOs.ejercicio_dto import EjercicioCreate, EjercicioUpdate, EjercicioResponse
from Application.DTOs.rutina_dto import RutinaResponse 
from Application.Exceptions.rutina_exception import RutinaNotFoundError
from Infrastructure.deps import get_rutina_service
from Domain.Exceptions.domain_exception import ValueError

# Usamos un router dedicado para la gestión de Ejercicios
router = APIRouter(prefix="/api", tags=["Ejercicios"])


# ------------------------------------ POST /rutinas/{id}/ejercicios ---------------------------------------------
@router.post("/rutinas/{rutina_id}/ejercicios", response_model=RutinaResponse,status_code=status.HTTP_201_CREATED, summary="Agrega un ejercicio a una rutina existente", operation_id="Agregar_Ejercicio")
def agregar_ejercicio(rutina_id: int, data: EjercicioCreate, servicio: RutinaServiceInterface = Depends(get_rutina_service)) -> RutinaResponse:
    try:
        rutina_domain = servicio.agregar_ejercicio_a_rutina(rutina_id, data)
        return RutinaResponse.model_validate(rutina_domain)
    except RutinaNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error interno: {str(e)}")
# ----------------------------------------------------------------------------------------------------------------


# ------------------------------------ PUT /ejercicios/{id} ------------------------------------------------------
@router.put( "/ejercicios/{ejercicio_id}", response_model=EjercicioResponse, summary="Actualiza un ejercicio existente por ID", operation_id="Actualizar_Ejercicio")
def actualizar_ejercicio( ejercicio_id: int, data: EjercicioUpdate, servicio: RutinaServiceInterface = Depends(get_rutina_service)) -> EjercicioResponse:
    try:
        ejercicio_domain = servicio.actualizar_ejercicio(ejercicio_id, data)
        return EjercicioResponse.model_validate(ejercicio_domain)
    except RutinaNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
# ----------------------------------------------------------------------------------------------------------------


# ------------------------------------ DELETE /ejercicios/{id} ---------------------------------------------------
@router.delete("/ejercicios/{ejercicio_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Elimina un ejercicio por ID", operation_id="Eliminar_Ejercicio")
def eliminar_ejercicio( ejercicio_id: int, servicio: RutinaServiceInterface = Depends(get_rutina_service)):
    try:
        servicio.eliminar_ejercicio(ejercicio_id)
        return 
    except RutinaNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
# ----------------------------------------------------------------------------------------------------------------