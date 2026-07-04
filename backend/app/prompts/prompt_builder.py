from app.schemas.planner import PlannerRequest

def build_planner_prompt(request: PlannerRequest) -> str:
    """Builds the prompt text to send to Gemini, requiring a strict JSON response."""
    return f"""You are an expert chef and budget planner. Generate a personalized 1-day cooking plan (Breakfast, Lunch, Dinner).
Provide a coordinated Shopping List, Ingredient Substitutions, Budget Analysis, and a synchronized Cooking Timeline.

USER CONSTRAINTS:
- Budget: {request.budget}
- Number of People: {request.number_of_people}
- Cooking Skill Level: {request.cooking_skill}
- Available Time: {request.cooking_time}
- Cuisine Preference: {request.cuisine}
- Dietary Preference: {request.diet}
- Health Goal: {request.health_goal}
- Available Ingredients: {request.available_ingredients}
- Current Mood: {request.mood}

You MUST return a JSON object matching this EXACT schema structure:
{{
  "breakfast": {{ "name": "Dish Name", "ingredients": ["1 cup ingredient"], "instructions": ["Step 1", "Step 2"] }},
  "lunch": {{ "name": "Dish Name", "ingredients": ["2 oz ingredient"], "instructions": ["Step 1"] }},
  "dinner": {{ "name": "Dish Name", "ingredients": ["3 units ingredient"], "instructions": ["Step 1"] }},
  "shopping_list": [
    {{ "item": "ingredient name", "category": "Produce/Pantry/Meat/Dairy", "estimated_cost": "$2.50" }}
  ],
  "substitutions": [
    {{ "original": "ingredient to replace", "substitute": "alternative", "reason": "why substitute" }}
  ],
  "budget_analysis": {{
    "estimated_total_cost": "$15.00",
    "cost_per_person": "$5.00",
    "saving_tips": ["Tip 1", "Tip 2"]
  }},
  "timeline": [
    {{ "time": "0-15 mins", "description": "Prep all veggies", "meals_involved": ["Breakfast", "Lunch"] }}
  ]
}}

Ensure the output is valid JSON. Do not include markdown code block formatting (like ```json). Respond with the raw JSON string only.
"""
