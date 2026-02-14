import { Mood } from "./types/meal";

export const mealGenerationPrompt = ({
  mood,
  cuisine,
  ingredients,
  time,
  budget,
  diet,
}: {
  mood: Mood;
  cuisine: string;
  ingredients: string;
  time: string;
  budget: string;
  diet: string;
}) => `
You are a culinary AI assistant.
Task: Generate exactly 3 meal ideas in JSON.

User inputs:
- mood: ${mood}
- cuisine preference: ${cuisine}
- available ingredients: ${ingredients}
- max cooking time: ${time}
- budget: ${budget}
- diet preference: ${diet}

Output JSON schema:
{
  "meals": [
    {
      "id": "short-kebab-case-id",
      "name": "string",
      "description": "string",
      "cookingTime": "string",
      "difficulty": "Easy|Medium|Hard",
      "missingIngredients": ["string"],
      "optionalIngredients": ["string"],
      "recipeSteps": ["string"]
    }
  ]
}

Rules:
- Keep meal names vivid and aligned with mood + cuisine preference.
- Keep steps concise but practical.
- Return only valid JSON, no markdown.
`;

export const ingredientPredictionPrompt = ({
  ingredients,
  selectedDish,
}: {
  ingredients: string;
  selectedDish: string;
}) => `
You are an ingredient gap analysis model.
Given a dish and user available ingredients, output JSON only:
{
  "requiredMissingIngredients": ["string"],
  "optionalEnhancements": ["string"]
}

Dish: ${selectedDish}
Available ingredients: ${ingredients}

Rules:
- requiredMissingIngredients should include essentials only.
- optionalEnhancements should improve flavor/texture.
- Return valid JSON only.
`;

export const recipeGenerationPrompt = ({
  dish,
  ingredients,
}: {
  dish: string;
  ingredients: string;
}) => `
You are a recipe generation model.
Given a dish and ingredients, output JSON only:
{
  "recipeSteps": ["step 1", "step 2", "step 3"]
}

Dish: ${dish}
Ingredients list: ${ingredients}

Rules:
- Include 5-8 clear sequential steps.
- Mention estimated heat/time where useful.
- Return valid JSON only.
`;
