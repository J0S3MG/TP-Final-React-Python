import os
from fastapi import Depends
from sqlmodel import Session
from Infrastructure.database import get_session
from Infrastructure.Repositories.rutina_repository import RutinaRepository
from Infrastructure.Repositories.ejercicio_repository import EjercicioRepository
from Domain.Interfaces.rutina_repository_interface import RutinaRepositoryInterface
from Domain.Interfaces.ejercicio_repository_interface import EjercicioRepositoryInterface
from Domain.Interfaces.rutina_service_interface import RutinaServiceInterface
from Application.Services.rutina_service import RutinaService

# --------------------------------------------------- FACTORY --------------------------------------------------------------------------
# Este archivo cumple la funcion de una "Fabrica" (Solo hace Inyeccion de Dependencia).
# Farbica (Factory): Se llama “fábrica” porque el archivo produce (crea) objetos dependiendo del contexto.
# Con esto ayudamos a cumplir los principios SOLID, más concretamente el OCP.
# --------------------------------------------------------------------------------------------------------------------------------------

# --------------------------------------------------- RUTINA FACTORY ---------------------------------------------------------------------
# Con este metodo realizamos la inyeccion de dependencia del Repositorio.
def get_rutina_repository(session: Session = Depends(get_session)) -> RutinaRepositoryInterface:
    return RutinaRepository(session) # De esta manera da igual los cambios que hagamos en la implementacion que el resto seguira funcionando igual.


def get_ejercicio_repository(session: Session = Depends(get_session)) -> EjercicioRepositoryInterface:
    return EjercicioRepository(session)


# En este caso hacemos la inyeccion de dependencia del Servicio.
def get_rutina_service(rutina_repo: RutinaRepositoryInterface = Depends(get_rutina_repository), ejercicio_repo: EjercicioRepositoryInterface = Depends(get_ejercicio_repository)) -> RutinaServiceInterface:
    return RutinaService(rutina_repo, ejercicio_repo) # Le pasamos el Repositorio para que se inyeccte en la clase concreta.
# ----------------------------------------------------------------------------------------------------------------------------------------