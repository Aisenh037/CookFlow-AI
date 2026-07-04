import React from "react";
import { usePlanner } from "./hooks/usePlanner";
import { ThemeToggle } from "./components/ThemeToggle";
import { PlannerForm } from "./components/PlannerForm";
import { MealCards } from "./components/MealCards";
import { ShoppingList } from "./components/ShoppingList";
import { BudgetCard } from "./components/BudgetCard";
import { CookingTimeline } from "./components/CookingTimeline";
import { Substitutions } from "./components/Substitutions";
import { ErrorMessage } from "./components/ErrorMessage";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { ChefHat } from "lucide-react";

export const App: React.FC = () => {
  const {
    formData,
    errors,
    loading,
    apiError,
    result,
    handleFieldChange,
    handleFormSubmit,
  } = usePlanner();

  return (
    <div className="min-h-screen pb-16 flex flex-col gap-8">
      {/* Navigation Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-500 text-white shadow-md">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                CookFlow AI
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personalized AI Daily Meal & Budget Planner
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 w-full flex flex-col gap-8 flex-1">
        {/* Form Selection */}
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="sr-only">Planner Request Form</h2>
          <PlannerForm
            formData={formData}
            errors={errors}
            loading={loading}
            onChange={handleFieldChange}
            onSubmit={handleFormSubmit}
          />
        </section>

        {/* Loading skeleton wrapper */}
        {loading && <LoadingIndicator />}

        {/* Error Callout */}
        {apiError && <ErrorMessage message={apiError} />}

        {/* Generated Results Outputs */}
        {result && !loading && (
          <div className="flex flex-col gap-8 animate-soft-pulse">
            <section aria-label="Meal Recommendations">
              <MealCards
                breakfast={result.breakfast}
                lunch={result.lunch}
                dinner={result.dinner}
              />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col gap-8">
                <section aria-label="Shopping checklist">
                  <ShoppingList items={result.shopping_list} />
                </section>
                <section aria-label="Ingredient substitutions list">
                  <Substitutions items={result.substitutions} />
                </section>
              </div>

              <div className="flex flex-col gap-8">
                <section aria-label="Budget calculations card">
                  <BudgetCard analysis={result.budget_analysis} />
                </section>
                <section aria-label="Cooking chronology timeline">
                  <CookingTimeline steps={result.timeline} />
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default App;
