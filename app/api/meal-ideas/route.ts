import { NextResponse } from "next/server";
import { minimaxJsonCompletion } from "@/lib/minimax";
import { mockMeals } from "@/lib/mock-data";
import { mealGenerationPrompt } from "@/lib/prompts";
import { MealIdeasResponse, Mood } from "@/lib/types/meal";

export async function POST(request: Request) {
  const body = await request.json();
  const payload = {
    mood: (body.mood ?? "cozy") as Mood,
    ingredients: body.ingredients ?? "",
    time: body.time ?? "30 mins",
    budget: body.budget ?? "moderate",
    diet: body.diet ?? "none",
  };

  try {
    const meals = await minimaxJsonCompletion<MealIdeasResponse>(mealGenerationPrompt(payload));
    return NextResponse.json(meals);
  } catch {
    return NextResponse.json(mockMeals);
  }
}
