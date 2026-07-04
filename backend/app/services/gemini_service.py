import json
import google.generativeai as genai
from app.config import settings
from app.schemas.planner import PlannerResponse

class GeminiService:
    """Service to interact with Google Gemini API and validate structured JSON output."""

    def __init__(self):
        # Configure Gemini API client
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel("gemini-3.5-flash")

    def _call_gemini(self, prompt: str) -> str:
        """Invokes the Gemini API with instructions to return JSON."""
        # Use response_mime_type to force JSON return
        generation_config = {"response_mime_type": "application/json"}
        response = self.model.generate_content(
            prompt, 
            generation_config=generation_config
        )
        return response.text.strip() if response.text else ""

    def _parse_and_validate(self, text: str) -> PlannerResponse:
        """Parses the text response to JSON and validates against the schema."""
        # Clean markdown code blocks if the model generated any
        if text.startswith("```"):
            lines = text.split("\n")
            if lines[0].startswith("```json") or lines[0].startswith("```"):
                text = "\n".join(lines[1:-1])
        
        data = json.loads(text.strip())
        return PlannerResponse(**data)

    def get_plan(self, prompt: str) -> PlannerResponse:
        """Fetches the cooking plan from Gemini with a single retry on parsing failure."""
        try:
            raw_response = self._call_gemini(prompt)
            return self._parse_and_validate(raw_response)
        except Exception as first_error:
            # Retry exactly once
            try:
                retry_prompt = f"{prompt}\n\nIMPORTANT: Your previous output failed verification. Make sure it matches the JSON format perfectly."
                raw_response = self._call_gemini(retry_prompt)
                return self._parse_and_validate(raw_response)
            except Exception as second_error:
                raise ValueError(
                    f"Gemini output parsing failed after retry. Details: {second_error}"
                ) from first_error
