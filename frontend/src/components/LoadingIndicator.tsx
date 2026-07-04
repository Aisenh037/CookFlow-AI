import React from "react";
import { ChefHat } from "lucide-react";

export const LoadingIndicator: React.FC = () => {
  return (
    <div
      className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-all"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="p-3 bg-brand-50 dark:bg-brand-950/30 rounded-xl text-brand-500 animate-bounce">
          <ChefHat className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            CookFlow AI is thinking...
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Generating your personalized meal cards, shopping checklist, budget cards, and synchronized timelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-3 animate-pulse"
          >
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
          </div>
        ))}
      </div>

      <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-full" />
      </div>
    </div>
  );
};
export default LoadingIndicator;
