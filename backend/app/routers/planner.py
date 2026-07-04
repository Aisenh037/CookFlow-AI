from fastapi import APIRouter, HTTPException, Request
from app.schemas.planner import PlannerRequest, PlannerResponse
from app.utils.sanitization import sanitize_string
from app.prompts.prompt_builder import build_planner_prompt
from app.services.gemini_service import GeminiService
from app.config import settings

router = APIRouter(prefix="/api/planner", tags=["planner"])
gemini_service = GeminiService()

def check_request_size(request: Request):
    """Enforces request body size limits from headers."""
    content_length = request.headers.get("content-length")
    if content_length:
        try:
            length = int(content_length)
            if length > settings.MAX_CONTENT_LENGTH:
                raise HTTPException(
                    status_code=413, 
                    detail="Request body size exceeds the allowed limit."
                )
        except ValueError:
            raise HTTPException(
                status_code=400, 
                detail="Invalid Content-Length header."
            )

def sanitize_planner_request(payload: PlannerRequest) -> PlannerRequest:
    """Sanitizes all string fields within the planner payload."""
    return PlannerRequest(
        budget=sanitize_string(payload.budget),
        number_of_people=payload.number_of_people,
        cooking_skill=sanitize_string(payload.cooking_skill),
        cooking_time=sanitize_string(payload.cooking_time),
        cuisine=sanitize_string(payload.cuisine),
        diet=sanitize_string(payload.diet),
        health_goal=sanitize_string(payload.health_goal),
        available_ingredients=sanitize_string(payload.available_ingredients),
        mood=sanitize_string(payload.mood)
    )

@router.post("/generate", response_model=PlannerResponse)
async def generate_cooking_plan(payload: PlannerRequest, request: Request):
    """Sanitizes inputs and uses Gemini API to create a personalized meal plan."""
    # 1. Enforce size limits
    check_request_size(request)
    
    # 2. Check API Key
    if not settings.GEMINI_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="Gemini API Key is not configured on the server."
        )
    
    # 3. Sanitize inputs
    sanitized_payload = sanitize_planner_request(payload)
    
    # 4. Generate plan
    prompt = build_planner_prompt(sanitized_payload)
    try:
        plan = gemini_service.get_plan(prompt)
        return plan
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate cooking plan: {str(e)}"
        )
