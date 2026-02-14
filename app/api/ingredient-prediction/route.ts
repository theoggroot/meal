import { NextResponse } from "next/server";
import { minimaxJsonCompletion } from "@/lib/minimax";
import { mockPrediction } from "@/lib/mock-data";
import { ingredientPredictionPrompt } from "@/lib/prompts";
import { IngredientPredictionResponse } from "@/lib/types/meal";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const prediction = await minimaxJsonCompletion<IngredientPredictionResponse>(
      ingredientPredictionPrompt({
        ingredients: body.ingredients ?? "",
        selectedDish: body.selectedDish ?? "",
      })
    );
    return NextResponse.json(prediction);
  } catch {
    return NextResponse.json(mockPrediction);
  }
}
