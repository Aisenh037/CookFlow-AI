import { useState } from "react";
import { PlannerRequest, PlannerResponse } from "../types/planner";
import { generateCookingPlan } from "../services/api";
import { validatePlannerRequest, ValidationErrors } from "../utils/validation";

const initialRequest: PlannerRequest = {
  budget: "",
  number_of_people: 2,
  cooking_skill: "intermediate",
  cooking_time: "30 mins",
  cuisine: "Any",
  diet: "None",
  health_goal: "None",
  available_ingredients: "",
  mood: "Comfort food",
};

export function usePlanner() {
  const [formData, setFormData] = useState<PlannerRequest>(initialRequest);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<PlannerResponse | null>(null);

  const handleFieldChange = (field: keyof PlannerRequest, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validatePlannerRequest(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    setApiError(null);
    try {
      const data = await generateCookingPlan(formData);
      setResult(data);
    } catch (err: any) {
      setApiError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    apiError,
    result,
    handleFieldChange,
    handleFormSubmit,
  };
}
