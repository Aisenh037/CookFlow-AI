import { PlannerRequest } from "../types/planner";

export interface ValidationErrors {
  budget?: string;
  number_of_people?: string;
  cooking_skill?: string;
  cooking_time?: string;
  cuisine?: string;
  diet?: string;
  health_goal?: string;
  available_ingredients?: string;
  mood?: string;
}

export function validatePlannerRequest(data: PlannerRequest): ValidationErrors {
  const errors: ValidationErrors = {};
  
  if (!data.budget.trim()) errors.budget = "Budget is required.";
  if (data.number_of_people < 1 || data.number_of_people > 100) {
    errors.number_of_people = "Number of people must be between 1 and 100.";
  }
  if (!data.cooking_skill.trim()) errors.cooking_skill = "Cooking skill is required.";
  if (!data.cooking_time.trim()) errors.cooking_time = "Cooking time is required.";
  if (!data.cuisine.trim()) errors.cuisine = "Cuisine preference is required.";
  if (!data.diet.trim()) errors.diet = "Diet choice is required.";
  if (!data.health_goal.trim()) errors.health_goal = "Health goal is required.";
  
  const ingredients = data.available_ingredients.trim();
  if (!ingredients) {
    errors.available_ingredients = "Available ingredients list is required.";
  } else if (ingredients.length > 1000) {
    errors.available_ingredients = "Ingredients must be under 1000 characters.";
  }
  
  if (!data.mood.trim()) errors.mood = "Mood / style is required.";
  
  return errors;
}
