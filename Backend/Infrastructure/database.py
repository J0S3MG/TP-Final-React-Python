from sqlmodel import create_engine, Session, SQLModel
from typing import Generator

DATABASE_URL = "postgresql://postgres:1234@localhost:5432/BaseRutina" # Le paso la url de la BD.

# Agregamos parámetros importantes para PostgreSQL.
engine = create_engine(
    DATABASE_URL, 
    echo=True,
    pool_pre_ping=True,  # Verifica las conexiones antes de usarlas.
    pool_recycle=3600    # Recicla conexiones cada hora.
)


def create_db_and_tables():
    """Nos aseguramos de crear la BD y sus Tablas"""
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """Devuelve una sesion de la BD"""
    session = Session(engine) # Crea la sesión.
    try:
        yield session # La devuelve para que FastAPI la use.
    finally:
        session.close()