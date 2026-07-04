from app.utils.sanitization import sanitize_string
from app.prompts.prompt_builder import build_planner_prompt
from app.schemas.planner import PlannerRequest

def test_sanitize_string():
    """Verify that the sanitization helper strips dangerous tokens and HTML tags."""
    dirty_html = "<script>alert('xss')</script>Fresh tomatoes!"
    sanitized = sanitize_string(dirty_html)
    assert "script" not in sanitized
    assert "Fresh tomatoes!" in sanitized

    dirty_markdown = "```json {key: value} ```"
    sanitized_md = sanitize_string(dirty_markdown)
    assert "```" not in sanitized_md

def test_build_planner_prompt():
    """Verify that build_planner_prompt incorporates the input fields correctly."""
    request = PlannerRequest(
        budget="Low Budget",
        number_of_people=3,
        cooking_skill="beginner",
        cooking_time="30 mins",
        cuisine="Italian",
        diet="None",
        health_goal="High Protein",
        available_ingredients="pasta, tomatoes",
        mood="happy"
    )
    prompt = build_planner_prompt(request)
    assert "Low Budget" in prompt
    assert "3" in prompt
    assert "Italian" in prompt
    assert "pasta, tomatoes" in prompt
