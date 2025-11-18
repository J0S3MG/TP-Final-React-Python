from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel

# --- Clase Base que valida los datos del Usuario ---
class UserBase(SQLModel):
    """Modelo base para Usuario"""
    # Campos obligatorios para identificación y visualización
    email: str = Field(max_length=150, unique=True, index=True, nullable=False, description="Correo electrónico único del usuario")
    username: str = Field(max_length=50, unique=True, index=True, nullable=False, description="Nombre de usuario único")
    first_name: Optional[str] = Field(default=None, max_length=50, description="Nombre de pila del usuario")
    last_name: Optional[str] = Field(default=None, max_length=50, description="Apellido del usuario")


# --- Clase que mappea a la BD el Usuario ---
class User(UserBase, table=True):
    """Modelo de la tabla User"""
    __tablename__ = "user"

    id: Optional[int] = Field(default=None, primary_key=True)
    # Campo crucial para seguridad: Almacena el hash de la contraseña, no el texto plano
    hashed_password: str = Field(nullable=False, description="Contraseña hasheada (no debe exponerse)")
    
    # Campos de gestión
    is_active: bool = Field(default=True, description="Indica si la cuenta está activa")
    is_admin: bool = Field(default=False, description="Indica si el usuario tiene permisos de administrador")


# --- DTO para crear/registrar un Usuario (Input) ---
class UserCreate(UserBase):
    """Modelo para registrar un nuevo Usuario"""
    # La contraseña en texto plano es necesaria solo para la creación (luego se hashea)
    password: str = Field(min_length=8, description="Contraseña en texto plano (mínimo 8 caracteres)")


# --- DTO para actualizar un Usuario (Input) ---
class UserUpdate(SQLModel):
    """Modelo para actualizar el Usuario"""
    email: Optional[str] = Field(default=None, max_length=150, unique=True, index=True, description="Correo electrónico único")
    username: Optional[str] = Field(default=None, max_length=50, unique=True, index=True, description="Nombre de usuario único")
    first_name: Optional[str] = Field(default=None, max_length=50, description="Nombre de pila del usuario")
    last_name: Optional[str] = Field(default=None, max_length=50, description="Apellido del usuario")
    password: Optional[str] = Field(default=None, min_length=8, description="Nueva contraseña en texto plano")


# --- DTO para la respuesta con la info del Usuario (Output) ---
class UserResponse(UserBase):
    """Modelo para la respuesta de Usuario"""
    id: int = Field(description="ID del usuario")
    # Nota: No se incluye el campo 'hashed_password' por seguridad















































