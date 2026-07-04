import React from "react";
import { BudgetAnalysis } from "../types/planner";
import { DollarSign, Lightbulb } from "lucide-react";

interface BudgetCardProps {
  analysis: BudgetAnalysis;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ analysis }) => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col gap-5">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800 text-brand-600 dark:text-brand-400">
        <DollarSign className="w-5 h-5" />
        <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
          Budget Analysis
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Estimated Total
          </span>
          <span className="text-2xl font-bold text-slate-800 dark:text-white mt-1 block">
            {analysis.estimated_total_cost}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Cost Per Person
          </span>
          <span className="text-2xl font-bold text-brand-600 dark:text-brand-400 mt-1 block">
            {analysis.cost_per_person}
          </span>
        </div>
      </div>

      {analysis.saving_tips && analysis.saving_tips.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-amber-500">
            <Lightbulb className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Smart Savings Tips
            </h4>
          </div>
          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5 pl-1.5">
            {analysis.saving_tips.map((tip, idx) => (
              <li key={idx} className="leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default BudgetCard;
