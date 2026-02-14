"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { MealCard } from "@/app/components/meal-card";
import { MoodSelector } from "@/app/components/mood-selector";
import { RecipeModal } from "@/app/components/recipe-modal";
import { useMealStore } from "@/lib/store/useMealStore";
import { MealIdea, Mood } from "@/lib/types/meal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const moodTheme: Record<Mood, string> = {
  cozy: "from-amber-400/35 via-orange-500/20 to-rose-500/20",
  spicy: "from-red-500/35 via-orange-500/25 to-fuchsia-600/20",
  light: "from-white/30 via-slate-300/20 to-sky-300/25",
  energy: "from-cyan-400/35 via-violet-500/30 to-pink-500/30",
};

export default function HomePage() {
  const { mood, setMood, meals, setMeals, selectedMeal, setSelectedMeal } = useMealStore();
  const [ingredients, setIngredients] = useState("tomato, onion, pasta, eggs");
  const [time, setTime] = useState("30 mins");
  const [budget, setBudget] = useState("moderate");
  const [diet, setDiet] = useState("balanced");
  const [loading, setLoading] = useState(false);

  const bg = useMemo(() => moodTheme[mood], [mood]);

  const getMeals = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/meal-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, ingredients, time, budget, diet }),
      });
      const data = await res.json();
      setMeals(data.meals ?? []);
    } finally {
      setLoading(false);
    }
  };

  const openMeal = async (meal: MealIdea) => {
    const predictionRes = await fetch("/api/ingredient-prediction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients, selectedDish: meal.name }),
    });
    const prediction = await predictionRes.json();

    const recipeRes = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dish: meal.name, ingredients }),
    });
    const recipe = await recipeRes.json();

    setSelectedMeal({
      ...meal,
      missingIngredients: prediction.requiredMissingIngredients ?? meal.missingIngredients,
      optionalIngredients: prediction.optionalEnhancements ?? meal.optionalIngredients,
      recipeSteps: recipe.recipeSteps ?? meal.recipeSteps,
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 md:px-10">
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br blur-3xl", bg, "animate-aurora")} />

      <div className="relative mx-auto max-w-6xl space-y-8">
        <section className="glass rounded-3xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">VibeMeal AI</h1>
              <p className="mt-2 text-sm text-white/80">Apple-polished meal ideation tuned to your mood.</p>
            </div>
            <Sparkles className="text-white/80" />
          </div>

          <div className="mt-6 space-y-5">
            <MoodSelector value={mood} onChange={setMood} />
            <div className="grid gap-3 md:grid-cols-3">
              <Input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" />
              <Input value={diet} onChange={(e) => setDiet(e.target.value)} placeholder="Diet" />
              <Input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
            </div>
            <Textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Add ingredients you currently have"
            />

            <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
              <Button onClick={getMeals} disabled={loading}>
                {loading ? "Generating..." : "Get Meal Ideas"}
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onSelect={openMeal} />
          ))}
        </section>
      </div>

      <RecipeModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
    </main>
  );
}
