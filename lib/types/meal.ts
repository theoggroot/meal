export type Mood = "cozy" | "spicy" | "light" | "energy";

export interface MealIdea {
  id: string;
  name: string;
  description: string;
  cookingTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  missingIngredients: string[];
  optionalIngredients: string[];
  recipeSteps: string[];
}

export interface MealIdeasResponse {
  meals: MealIdea[];
}

export interface IngredientPredictionResponse {
  requiredMissingIngredients: string[];
  optionalEnhancements: string[];
}

export interface RecipeResponse {
  recipeSteps: string[];
}
