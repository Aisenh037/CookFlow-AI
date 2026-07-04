import React from "react";
import { Meal } from "../types/planner";
import { Coffee, Sun, Moon } from "lucide-react";

interface MealCardsProps {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

interface SingleCardProps {
  title: string;
  meal: Meal;
  icon: React.ReactNode;
}

const SingleMealCard: React.FC<SingleCardProps> = ({ title, meal, icon }) => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col gap-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800 text-brand-600 dark:text-brand-400">
        {icon}
        <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
          {title}
        </h3>
      </div>
      <div>
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {meal.name}
        </h4>
        <div className="mb-4">
          <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Ingredients
          </h5>
          <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
            {meal.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Instructions
          </h5>
          <ol className="list-decimal list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
            {meal.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export const MealCards: React.FC<MealCardsProps> = ({
  breakfast,
  lunch,
  dinner,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <SingleMealCard
        title="Breakfast"
        meal={breakfast}
        icon={<Coffee className="w-5 h-5" />}
      />
      <SingleMealCard
        title="Lunch"
        meal={lunch}
        icon={<Sun className="w-5 h-5" />}
      />
      <SingleMealCard
        title="Dinner"
        meal={dinner}
        icon={<Moon className="w-5 h-5" />}
      />
    </div>
  );
};
export default MealCards;
