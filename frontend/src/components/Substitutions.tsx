import React from "react";
import { SubstitutionItem } from "../types/planner";
import { ArrowRight, Info } from "lucide-react";

interface SubstitutionsProps {
  items: SubstitutionItem[];
}

export const Substitutions: React.FC<SubstitutionsProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-center text-slate-500 dark:text-slate-400">
        No ingredient substitutions recommended.
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col gap-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800 text-brand-600 dark:text-brand-400">
        <Info className="w-5 h-5" />
        <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
          Ingredient Substitutions
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-sm text-slate-700 dark:text-slate-300">
          <thead>
            <tr>
              <th scope="col" className="pb-3 font-semibold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider">
                Original Ingredient
              </th>
              <th scope="col" className="pb-3 text-center w-8">
                {/* Arrow column */}
              </th>
              <th scope="col" className="pb-3 font-semibold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider">
                Substitute
              </th>
              <th scope="col" className="pb-3 font-semibold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider pl-4">
                Reason
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {items.map((sub, idx) => (
              <tr key={idx} className="align-middle">
                <td className="py-3.5 pr-2 font-medium text-slate-900 dark:text-white">
                  {sub.original}
                </td>
                <td className="py-3.5 text-center text-slate-400 dark:text-slate-600">
                  <ArrowRight className="w-4 h-4 mx-auto" />
                </td>
                <td className="py-3.5 px-2 font-medium text-brand-600 dark:text-brand-400">
                  {sub.substitute}
                </td>
                <td className="py-3.5 pl-4 text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                  {sub.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Substitutions;
