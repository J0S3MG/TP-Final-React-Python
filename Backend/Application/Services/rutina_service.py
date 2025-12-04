from typing import List
from Domain.Entities.rutina import Rutina
from Domain.Entities.ejercicio import Ejercicio
from Domain.Interfaces.rutina_repository_interface import RutinaRepositoryInterface
from Domain.Interfaces.rutina_service_interface import RutinaServiceInterface
from Application.DTOs.rutina_dto import RutinaConEjerciciosCreate

# Define excepciones de aplicación o dominio
class RutinaAlreadyExistsError(Exception):
	"""Excepción lanzada cuando una rutina con el mismo nombre ya existe."""
	pass


class RutinaService(RutinaServiceInterface):
	"""Implementacion de la interfaz"""

	def __init__(self, rutina_repository: RutinaRepositoryInterface):
		self.repository = rutina_repository


	def alta_rutina(self, rutina_completa: RutinaConEjerciciosCreate) -> Rutina:
		"""
		Caso de Uso: Da de alta y persiste una nueva rutina y sus ejercicios.
		"""
		# Validación de Regla de Negocio: Nombre Único.
		if self.repository.buscar_por_nombre(rutina_completa.rutina.nombre): # Aca salta la excepcion en caso de no tener un nombre unico.
			raise RutinaAlreadyExistsError(f"Ya existe una rutina con el nombre: {rutina_completa.rutina.nombre}")

		# Mapeamos DTOs (Ejercicios) a Entidades de Dominio Puras.
		ejercicios_domain: List[Ejercicio] = []
		for e_dto in rutina_completa.ejercicios:
			ejercicios_domain.append(
				Ejercicio(
					nombre=e_dto.nombre,
					dia_semana=e_dto.dia_semana,
					series=e_dto.series,
					repeticiones=e_dto.repeticiones,
					peso=e_dto.peso,
					notas=e_dto.notas,
					orden=e_dto.orden
				)
			)     
		# Crear la Entidad Raíz del Agregado (Rutina).
		rutina_domain = Rutina(
			nombre=rutina_completa.rutina.nombre,
			descripcion=rutina_completa.rutina.descripcion,
			ejercicios=ejercicios_domain
		)
		# 3. Persistir el Agregado usando el Repositorio.
		# (El Repositorio se encarga de traducir Rutina -> RutinaDB y guardar).
		rutina_guardada = self.repository.alta_rutina(rutina_domain)
		return rutina_guardada