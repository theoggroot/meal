import { NextResponse } from "next/server";
import { minimaxJsonCompletion } from "@/lib/minimax";
import { mockRecipe } from "@/lib/mock-data";
import { recipeGenerationPrompt } from "@/lib/prompts";
import { RecipeResponse } from "@/lib/types/meal";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const recipe = await minimaxJsonCompletion<RecipeResponse>(
      recipeGenerationPrompt({
        dish: body.dish ?? "",
        ingredients: body.ingredients ?? "",
      })
    );
    return NextResponse.json(recipe);
  } catch {
    return NextResponse.json(mockRecipe);
  }
}
