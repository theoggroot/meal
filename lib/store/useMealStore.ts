import { create } from "zustand";
import { MealIdea, Mood } from "@/lib/types/meal";

interface MealState {
  mood: Mood;
  meals: MealIdea[];
  selectedMeal: MealIdea | null;
  setMood: (mood: Mood) => void;
  setMeals: (meals: MealIdea[]) => void;
  setSelectedMeal: (meal: MealIdea | null) => void;
}

export const useMealStore = create<MealState>((set) => ({
  mood: "cozy",
  meals: [],
  selectedMeal: null,
  setMood: (mood) => set({ mood }),
  setMeals: (meals) => set({ meals }),
  setSelectedMeal: (selectedMeal) => set({ selectedMeal }),
}));
