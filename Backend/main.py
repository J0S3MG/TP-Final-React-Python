from fastapi import FastAPI
from contextlib import asynccontextmanager
from Infrastructure.database import create_db_and_tables, engine
from Application.Controllers.ejercicio_controller import router as ejercicio_router 
from Application.Controllers.rutina_controller import router as rutina_router # Importamos el enrutador y le ponemos un nuevo nombre.

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("="*80)
    print("INICIANDO APLICACIÓN")
    print("="*80)
    create_db_and_tables()
    yield
    print("App terminando...")
    
app = FastAPI(
    title="FastAPI Rutinas", 
    description="Trabajo Final Prog IV 2025", 
    version="1.0.0",
    lifespan=lifespan
)

# Incluimos el router de rutina.
app.include_router(rutina_router)
app.include_router(ejercicio_router)

