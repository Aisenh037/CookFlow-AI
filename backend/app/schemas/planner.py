from pydantic import BaseModel, Field, conint, constr
from typing import List

# Input Request Schema
class PlannerRequest(BaseModel):
    budget: constr(max_length=100) = Field(..., description="Target budget (e.g. '$20', 'Low budget')")
    number_of_people: conint(ge=1, le=100) = Field(..., description="Number of people to cook for")
    cooking_skill: constr(max_length=50) = Field(..., description="Cooking skill level (beginner, intermediate, advanced)")
    cooking_time: constr(max_length=100) = Field(..., description="Maximum prep/cooking time")
    cuisine: constr(max_length=100) = Field(..., description="Preferred cuisine (e.g. Italian, Mexican, Any)")
    diet: constr(max_length=100) = Field(..., description="Dietary restrictions or preferences")
    health_goal: constr(max_length=100) = Field(..., description="Health/nutrition goals (e.g. high-protein, low-carb)")
    available_ingredients: constr(max_length=1000) = Field(..., description="List of ingredients currently available")
    mood: constr(max_length=100) = Field(..., description="User's current mood or style of food desired")


# Output response Schemas
class Meal(BaseModel):
    name: str = Field(..., description="Name of the dish")
    ingredients: List[str] = Field(..., description="Ingredients required for this meal")
    instructions: List[str] = Field(..., description="Step-by-step instructions for preparing the meal")

class ShoppingItem(BaseModel):
    item: str = Field(..., description="Name of the ingredient to buy")
    category: str = Field(..., description="Category (e.g. Produce, Pantry, Meat, Dairy)")
    estimated_cost: str = Field(..., description="Estimated cost for this item")

class SubstitutionItem(BaseModel):
    original: str = Field(..., description="Ingredient being replaced")
    substitute: str = Field(..., description="Recommended alternative ingredient")
    reason: str = Field(..., description="Reason for the substitution (e.g., lower cost, allergen, common pantry item)")

class BudgetAnalysis(BaseModel):
    estimated_total_cost: str = Field(..., description="Estimated overall cost of all meals")
    cost_per_person: str = Field(..., description="Estimated cost per person")
    saving_tips: List[str] = Field(..., description="Tips on how to reduce cost further or use leftovers")

class TimelineStep(BaseModel):
    time: str = Field(..., description="Time interval or phase (e.g. '0-10 mins', '10-20 mins')")
    description: str = Field(..., description="Actions to perform during this step")
    meals_involved: List[str] = Field(..., description="List of meals this step helps prepare (e.g., ['Breakfast', 'Lunch'])")

class PlannerResponse(BaseModel):
    breakfast: Meal = Field(..., description="Breakfast meal planner details")
    lunch: Meal = Field(..., description="Lunch meal planner details")
    dinner: Meal = Field(..., description="Dinner meal planner details")
    shopping_list: List[ShoppingItem] = Field(..., description="Shopping list for missing ingredients")
    substitutions: List[SubstitutionItem] = Field(..., description="Ingredient substitutions recommendation")
    budget_analysis: BudgetAnalysis = Field(..., description="Budget planning details")
    timeline: List[TimelineStep] = Field(..., description="Cooking timeline synchronizing prep and cooking steps")
