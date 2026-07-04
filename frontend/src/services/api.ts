import { PlannerRequest, PlannerResponse } from "../types/planner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function generateCookingPlan(request: PlannerRequest): Promise<PlannerResponse> {
  const response = await fetch(`${API_BASE_URL}/api/planner/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.detail || `Server returned error status ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}
