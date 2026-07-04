import os
from dotenv import load_dotenv

# Load environment variables from .env if present
load_dotenv()

class Settings:
    """Application settings and configuration."""
    
    # Gemini API Configuration
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # CORS Configuration
    ALLOWED_ORIGINS_RAW: str = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
    
    @property
    def ALLOWED_ORIGINS(self) -> list[str]:
        """Parse allowed origins from a comma-separated string."""
        if not self.ALLOWED_ORIGINS_RAW:
            return ["*"]
        return [origin.strip() for origin in self.ALLOWED_ORIGINS_RAW.split(",")]
    
    # Security limits
    # Max size of request body in bytes (e.g. 500 KB limit for input form data)
    MAX_CONTENT_LENGTH: int = 500 * 1024
    
    # Server configuration
    PORT: int = int(os.getenv("PORT", "8000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")

settings = Settings()
