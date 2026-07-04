export interface PlannerRequest {
  budget: string;
  number_of_people: number;
  cooking_skill: string;
  cooking_time: string;
  cuisine: string;
  diet: string;
  health_goal: string;
  available_ingredients: string;
  mood: string;
}

export interface Meal {
  name: string;
  ingredients: string[];
  instructions: string[];
}

export interface ShoppingItem {
  item: string;
  category: string;
  estimated_cost: string;
}

export interface SubstitutionItem {
  original: string;
  substitute: string;
  reason: string;
}

export interface BudgetAnalysis {
  estimated_total_cost: string;
  cost_per_person: string;
  saving_tips: string[];
}

export interface TimelineStep {
  time: string;
  description: string;
  meals_involved: string[];
}

export interface PlannerResponse {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  shopping_list: ShoppingItem[];
  substitutions: SubstitutionItem[];
  budget_analysis: BudgetAnalysis;
  timeline: TimelineStep[];
}
