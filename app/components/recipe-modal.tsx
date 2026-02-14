"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { MealIdea } from "@/lib/types/meal";

export function RecipeModal({
  meal,
  onClose,
}: {
  meal: MealIdea | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {meal && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass relative w-full max-w-2xl rounded-3xl p-6"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
          >
            <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/10 p-2"><X size={16} /></button>
            <h2 className="text-2xl font-semibold">{meal.name}</h2>
            <p className="mt-2 text-white/80">{meal.description}</p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div>
                <h4 className="font-medium">Missing ingredients</h4>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-white/80">
                  {meal.missingIngredients.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Optional ingredients</h4>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-white/80">
                  {meal.optionalIngredients.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>

            <h4 className="mt-5 font-medium">Recipe steps</h4>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-white/85">
              {meal.recipeSteps.map((step, idx) => <li key={`${meal.id}-${idx}`}>{step}</li>)}
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
