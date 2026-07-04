import React, { useState } from "react";
import { ShoppingItem } from "../types/planner";
import { ShoppingCart, Check } from "lucide-react";

interface ShoppingListProps {
  items: ShoppingItem[];
}

export const ShoppingList: React.FC<ShoppingListProps> = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (itemName: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  // Group items by category
  const categories = items.reduce<Record<string, ShoppingItem[]>>((acc, item) => {
    const cat = item.category || "Pantry";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  if (items.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-center text-slate-500 dark:text-slate-400">
        All ingredients are in stock! No shopping required.
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col gap-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800 text-brand-600 dark:text-brand-400">
        <ShoppingCart className="w-5 h-5" />
        <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
          Shopping Checklist
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([category, catItems]) => (
          <div key={category} className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {category}
            </h4>
            <ul className="flex flex-col gap-1.5" aria-label={`Shopping items for ${category}`}>
              {catItems.map((item, idx) => {
                const key = `${category}-${item.item}-${idx}`;
                const isChecked = !!checkedItems[key];
                return (
                  <li key={key}>
                    <button
                      onClick={() => toggleCheck(key)}
                      className="flex items-center justify-between w-full text-left p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
                      aria-checked={isChecked}
                      role="checkbox"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isChecked
                              ? "bg-brand-500 border-brand-500 text-white"
                              : "border-slate-300 dark:border-slate-700 bg-transparent"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span
                          className={`text-sm ${
                            isChecked
                              ? "line-through text-slate-400 dark:text-slate-500"
                              : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {item.item}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                        {item.estimated_cost}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShoppingList;
