"use client";

import { motion } from "framer-motion";
import { Clock3, ChefHat } from "lucide-react";
import { MealIdea } from "@/lib/types/meal";

export function MealCard({ meal, onSelect }: { meal: MealIdea; onSelect: (meal: MealIdea) => void }) {
  return (
    <motion.button
      whileHover={{ y: -8, scale: 1.02, rotateX: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      onClick={() => onSelect(meal)}
      className="glass group w-full rounded-2xl p-5 text-left"
    >
      <h3 className="text-lg font-semibold transition group-hover:text-cyan-200">{meal.name}</h3>
      <p className="mt-2 text-sm text-white/80">{meal.description}</p>
      <div className="mt-4 flex gap-4 text-xs text-white/70">
        <span className="inline-flex items-center gap-1"><Clock3 size={14} /> {meal.cookingTime}</span>
        <span className="inline-flex items-center gap-1"><ChefHat size={14} /> {meal.difficulty}</span>
      </div>
    </motion.button>
  );
}
