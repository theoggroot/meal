"use client";

import { motion } from "framer-motion";
import { Mood } from "@/lib/types/meal";
import { cn } from "@/lib/utils";

const moods: Mood[] = ["cozy", "spicy", "light", "energy"];

export function MoodSelector({ value, onChange }: { value: Mood; onChange: (mood: Mood) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {moods.map((mood) => {
        const active = mood === value;
        return (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={mood}
            onClick={() => onChange(mood)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm capitalize transition",
              active ? "border-white/60 bg-white/25 text-white" : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
            )}
          >
            {mood}
          </motion.button>
        );
      })}
    </div>
  );
}
