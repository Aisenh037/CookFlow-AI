import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PlannerForm } from "../components/PlannerForm";
import { PlannerRequest } from "../types/planner";

const mockFormData: PlannerRequest = {
  budget: "Low",
  number_of_people: 2,
  cooking_skill: "beginner",
  cooking_time: "30 mins",
  cuisine: "Italian",
  diet: "None",
  health_goal: "None",
  available_ingredients: "tomatoes, pasta",
  mood: "happy",
};

describe("PlannerForm Component", () => {
  it("renders all key form input elements correctly", () => {
    const handleFieldChange = vi.fn();
    const handleFormSubmit = vi.fn();

    render(
      <PlannerForm
        formData={mockFormData}
        errors={{}}
        loading={false}
        onChange={handleFieldChange}
        onSubmit={handleFormSubmit}
      />
    );

    expect(screen.getByLabelText("Budget Constraint")).toBeInTheDocument();
    expect(screen.getByLabelText("Number of People")).toBeInTheDocument();
    expect(screen.getByLabelText("Cooking Skill Level")).toBeInTheDocument();
    expect(screen.getByLabelText("Available Cooking Time")).toBeInTheDocument();
    expect(screen.getByLabelText("Preferred Cuisine")).toBeInTheDocument();
    expect(screen.getByLabelText("Available Ingredients")).toBeInTheDocument();
  });

  it("submits the form when clicking the submit button", () => {
    const handleFieldChange = vi.fn();
    const handleFormSubmit = vi.fn((e) => e.preventDefault());

    render(
      <PlannerForm
        formData={mockFormData}
        errors={{}}
        loading={false}
        onChange={handleFieldChange}
        onSubmit={handleFormSubmit}
      />
    );

    const submitBtn = screen.getByRole("button", { name: /Generate Cooking Plan/i });
    fireEvent.click(submitBtn);

    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  });
});
