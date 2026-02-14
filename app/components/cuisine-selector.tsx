"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const cuisines = ["Indian", "Arabian", "Chinese", "Italian", "Japanese", "Mexican", "Mediterranean"];

export function CuisineSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (cuisine: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.2em] text-white/60">Cuisine style</p>
      <div className="flex flex-wrap gap-2">
        {cuisines.map((cuisine) => {
          const active = cuisine === value;
          return (
            <motion.button
              key={cuisine}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onChange(cuisine)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                active
                  ? "border-cyan-200/70 bg-cyan-300/20 text-white shadow-lg shadow-cyan-500/20"
                  : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
              )}
            >
              {cuisine}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
