"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { MealCard } from "@/app/components/meal-card";
import { MoodSelector } from "@/app/components/mood-selector";
import { RecipeModal } from "@/app/components/recipe-modal";
import { CuisineSelector } from "@/app/components/cuisine-selector";
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
  const [cuisine, setCuisine] = useState("Indian");
  const [ingredients, setIngredients] = useState("tomato, onion, paneer, rice");
  const [time, setTime] = useState("30 mins");
  const [budget, setBudget] = useState("moderate");
  const [diet, setDiet] = useState("vegetarian");
  const [loading, setLoading] = useState(false);

  const bg = useMemo(() => moodTheme[mood], [mood]);

  const getMeals = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/meal-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, cuisine, ingredients, time, budget, diet }),
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl space-y-8"
      >
        <section className="glass rounded-3xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">VibeMeal AI</h1>
              <p className="mt-2 text-sm text-white/80">Apple-polished meal ideation tuned to your mood and cuisine.</p>
            </div>
            <motion.div animate={{ rotate: [0, 8, -6, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
              <Sparkles className="text-white/80" />
            </motion.div>
          </div>

          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Mood</p>
              <MoodSelector value={mood} onChange={setMood} />
            </div>

            <CuisineSelector value={cuisine} onChange={setCuisine} />

            <div className="grid gap-3 md:grid-cols-3">
              <Input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget: low • moderate • premium" />
              <Input value={diet} onChange={(e) => setDiet(e.target.value)} placeholder="Diet: vegan • vegetarian • high-protein" />
              <Input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time: 15 mins • 30 mins • 45 mins" />
            </div>
            <Textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Ingredients: rice, chicken, garlic, tomato, yogurt"
            />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Button onClick={getMeals} disabled={loading}>
                {loading ? "Generating cinematic meal ideas..." : "Get Meal Ideas"}
              </Button>
            </motion.div>
          </div>
        </section>

        <motion.section
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid gap-4 md:grid-cols-3"
        >
          {meals.map((meal) => (
            <motion.div
              key={meal.id}
              variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.35 }}
            >
              <MealCard meal={meal} onSelect={openMeal} />
            </motion.div>
          ))}
        </motion.section>
      </motion.div>

      <RecipeModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
    </main>
  );
}
