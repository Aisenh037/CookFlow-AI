from fastapi.testclient import TestClient
from unittest.mock import patch
from app.main import app
from app.schemas.planner import PlannerResponse, Meal, BudgetAnalysis

client = TestClient(app)

# Mock Response Object matching the PlannerResponse schema
mock_response = PlannerResponse(
    breakfast=Meal(
        name="Scrambled Eggs with Avocado",
        ingredients=["2 eggs", "1/2 avocado"],
        instructions=["Scramble eggs in a pan.", "Serve with avocado slices."]
    ),
    lunch=Meal(
        name="Tomato Avocado Toast",
        ingredients=["1 slice bread", "1/2 avocado", "1 tomato"],
        instructions=["Toast the bread.", "Mash avocado on toast.", "Top with sliced tomato."]
    ),
    dinner=Meal(
        name="Simple Pasta",
        ingredients=["100g pasta", "1 cup tomato sauce"],
        instructions=["Boil pasta.", "Drain and mix with warmed tomato sauce."]
    ),
    shopping_list=[],
    substitutions=[],
    budget_analysis=BudgetAnalysis(
        estimated_total_cost="$10.00",
        cost_per_person="$5.00",
        saving_tips=["Buy bread in bulk"]
    ),
    timeline=[]
)

@patch("app.routers.planner.settings.GEMINI_API_KEY", "fake_key_for_testing")
@patch("app.routers.planner.gemini_service.get_plan")
def test_generate_endpoint(mock_get_plan):
    """Ensures /api/planner/generate returns valid plan response when patched."""
    mock_get_plan.return_value = mock_response
    
    payload = {
        "budget": "$10",
        "number_of_people": 2,
        "cooking_skill": "beginner",
        "cooking_time": "30 mins",
        "cuisine": "Any",
        "diet": "None",
        "health_goal": "None",
        "available_ingredients": "eggs, avocado, bread, pasta, tomato sauce",
        "mood": "lazy"
    }
    
    response = client.post("/api/planner/generate", json=payload)
    
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["breakfast"]["name"] == "Scrambled Eggs with Avocado"
    assert json_data["budget_analysis"]["estimated_total_cost"] == "$10.00"
    mock_get_plan.assert_called_once()
