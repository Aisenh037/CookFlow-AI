from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import planner
from app.config import settings

app = FastAPI(
    title="CookFlow AI API",
    description="Backend service for generating personalized cooking plans using Gemini.",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(planner.router)

@app.get("/")
def read_root():
    """Simple API status healthcheck."""
    return {"status": "healthy", "service": "CookFlow AI API"}
