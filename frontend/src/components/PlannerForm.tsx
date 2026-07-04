import React from "react";
import { PlannerRequest } from "../types/planner";
import { ValidationErrors } from "../utils/validation";
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { Sparkles } from "lucide-react";

interface PlannerFormProps {
  formData: PlannerRequest;
  errors: ValidationErrors;
  loading: boolean;
  onChange: (field: keyof PlannerRequest, value: string | number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PlannerForm: React.FC<PlannerFormProps> = ({
  formData,
  errors,
  loading,
  onChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col gap-6"
    >
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <Sparkles className="w-5 h-5 text-brand-500" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Plan Your Day
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          id="budget"
          label="Budget Constraint"
          value={formData.budget}
          placeholder="e.g. $15 total, Low budget"
          error={errors.budget}
          onChange={(e) => onChange("budget", e.target.value)}
        />
        <Input
          id="number_of_people"
          label="Number of People"
          type="number"
          min="1"
          max="100"
          value={formData.number_of_people}
          error={errors.number_of_people}
          onChange={(e) => onChange("number_of_people", parseInt(e.target.value) || 1)}
        />
        <Select
          id="cooking_skill"
          label="Cooking Skill Level"
          value={formData.cooking_skill}
          error={errors.cooking_skill}
          onChange={(e) => onChange("cooking_skill", e.target.value)}
          options={[
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
          ]}
        />
        <Select
          id="cooking_time"
          label="Available Cooking Time"
          value={formData.cooking_time}
          error={errors.cooking_time}
          onChange={(e) => onChange("cooking_time", e.target.value)}
          options={[
            { value: "15 mins", label: "Quick (15 mins)" },
            { value: "30 mins", label: "Standard (30 mins)" },
            { value: "1 hour", label: "Leisurely (1 hour)" },
            { value: "No limit", label: "No Limit" },
          ]}
        />
        <Input
          id="cuisine"
          label="Preferred Cuisine"
          value={formData.cuisine}
          placeholder="e.g. Italian, Mexican, Any"
          error={errors.cuisine}
          onChange={(e) => onChange("cuisine", e.target.value)}
        />
        <Select
          id="diet"
          label="Diet Preference"
          value={formData.diet}
          error={errors.diet}
          onChange={(e) => onChange("diet", e.target.value)}
          options={[
            { value: "None", label: "No Diet Restriction" },
            { value: "Vegetarian", label: "Vegetarian" },
            { value: "Vegan", label: "Vegan" },
            { value: "Keto", label: "Keto" },
            { value: "Paleo", label: "Paleo" },
            { value: "Gluten-Free", label: "Gluten-Free" },
          ]}
        />
        <Select
          id="health_goal"
          label="Health/Nutrition Goal"
          value={formData.health_goal}
          error={errors.health_goal}
          onChange={(e) => onChange("health_goal", e.target.value)}
          options={[
            { value: "None", label: "None" },
            { value: "Low Carb", label: "Low Carb" },
            { value: "High Protein", label: "High Protein" },
            { value: "Weight Loss", label: "Weight Loss" },
            { value: "Balanced", label: "Balanced" },
          ]}
        />
        <Input
          id="mood"
          label="Mood / Style"
          value={formData.mood}
          placeholder="e.g. Comfort food, Light & Fresh"
          error={errors.mood}
          onChange={(e) => onChange("mood", e.target.value)}
        />
      </div>

      <Textarea
        id="available_ingredients"
        label="Available Ingredients"
        value={formData.available_ingredients}
        placeholder="Enter ingredients you currently have (comma separated, e.g., eggs, bread, tomatoes, spinach)"
        error={errors.available_ingredients}
        rows={3}
        onChange={(e) => onChange("available_ingredients", e.target.value)}
      />

      <Button type="submit" loading={loading} className="w-full mt-2 py-3 text-base">
        Generate Cooking Plan
      </Button>
    </form>
  );
};
export default PlannerForm;
