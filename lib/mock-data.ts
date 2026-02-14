import { IngredientPredictionResponse, MealIdeasResponse, RecipeResponse } from "./types/meal";

export const mockMeals: MealIdeasResponse = {
  meals: [
    {
      id: "cozy-miso-pasta",
      name: "Cozy Miso Mushroom Pasta",
      description: "Creamy umami pasta with soft garlic warmth.",
      cookingTime: "25 mins",
      difficulty: "Easy",
      missingIngredients: ["Miso paste", "Parmesan"],
      optionalIngredients: ["Truffle oil", "Chili flakes"],
      recipeSteps: [
        "Boil pasta until al dente.",
        "Sauté mushrooms and garlic in butter.",
        "Whisk miso with a splash of pasta water.",
        "Combine pasta, sauce, and parmesan.",
        "Finish with black pepper and serve warm.",
      ],
    },
    {
      id: "spicy-lime-rice-bowl",
      name: "Spicy Lime Crunch Bowl",
      description: "High-energy rice bowl with citrus heat.",
      cookingTime: "30 mins",
      difficulty: "Medium",
      missingIngredients: ["Lime", "Sriracha"],
      optionalIngredients: ["Pickled onions", "Avocado"],
      recipeSteps: [
        "Cook rice and keep warm.",
        "Sear protein with smoked paprika and chili.",
        "Toss veggies with lime and salt.",
        "Layer bowl and drizzle sriracha.",
        "Top with herbs and crunchy garnish.",
      ],
    },
    {
      id: "light-herb-soup",
      name: "Light Herb Garden Soup",
      description: "Bright, soothing broth with tender vegetables.",
      cookingTime: "20 mins",
      difficulty: "Easy",
      missingIngredients: ["Vegetable stock", "Fresh dill"],
      optionalIngredients: ["Lemon zest", "White beans"],
      recipeSteps: [
        "Sweat onions and celery in olive oil.",
        "Add stock and simmer diced vegetables.",
        "Stir in herbs and season lightly.",
        "Finish with lemon zest and serve.",
      ],
    },
  ],
};

export const mockPrediction: IngredientPredictionResponse = {
  requiredMissingIngredients: ["Garlic", "Olive oil"],
  optionalEnhancements: ["Fresh herbs", "Cracked pepper", "Lemon zest"],
};

export const mockRecipe: RecipeResponse = {
  recipeSteps: [
    "Prep all ingredients and measure seasonings.",
    "Build flavor base by sautéing aromatics for 2-3 minutes.",
    "Add core ingredients and cook until lightly caramelized.",
    "Pour in liquid components and simmer 8-10 minutes.",
    "Adjust seasoning, plate, and garnish before serving.",
  ],
};
