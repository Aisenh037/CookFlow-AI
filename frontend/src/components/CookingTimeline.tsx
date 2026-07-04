import React, { useState } from "react";
import { TimelineStep } from "../types/planner";
import { Clock, Check } from "lucide-react";

interface CookingTimelineProps {
  steps: TimelineStep[];
}

export const CookingTimeline: React.FC<CookingTimelineProps> = ({ steps }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  if (steps.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-center text-slate-500 dark:text-slate-400">
        No cooking timeline available.
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col gap-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800 text-brand-600 dark:text-brand-400">
        <Clock className="w-5 h-5" />
        <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
          Cooking Timeline
        </h3>
      </div>

      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3.5 pl-6 flex flex-col gap-6">
        {steps.map((step, idx) => {
          const isDone = !!completedSteps[idx];
          return (
            <div key={idx} className="relative group">
              {/* Bullet node on timeline */}
              <button
                onClick={() => toggleStep(idx)}
                className={`absolute -left-[35px] top-0 w-6.5 h-6.5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isDone
                    ? "bg-brand-500 border-brand-500 text-white"
                    : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-transparent"
                }`}
                aria-label={`Mark step ${idx + 1} as ${isDone ? "incomplete" : "complete"}`}
                aria-checked={isDone}
                role="checkbox"
              >
                <Check className="w-3.5 h-3.5" />
              </button>

              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {step.time}
                  </span>
                  <div className="flex items-center gap-1">
                    {step.meals_involved.map((m) => (
                      <span
                        key={m}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <p
                  className={`text-sm leading-relaxed transition-all ${
                    isDone
                      ? "line-through text-slate-400 dark:text-slate-500"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CookingTimeline;
