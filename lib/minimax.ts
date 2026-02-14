const MINIMAX_ENDPOINT = "https://api.minimaxi.chat/v1/text/chatcompletion_v2";

interface MinimaxResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

function extractJson(content: string) {
  const trimmed = content.trim();
  if (trimmed.startsWith("{")) return trimmed;
  const match = trimmed.match(/\{[\s\S]*\}$/);
  if (!match) throw new Error("No JSON object found in model response");
  return match[0];
}

export async function minimaxJsonCompletion<T>(prompt: string): Promise<T> {
  const apiKey = process.env.MINIMAX_API_KEY;

  if (!apiKey) {
    throw new Error("MINIMAX_API_KEY is not set");
  }

  const response = await fetch(MINIMAX_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.MINIMAX_MODEL ?? "abab6.5s-chat",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Minimax API failed (${response.status}): ${errorBody}`);
  }

  const data = (await response.json()) as MinimaxResponse;
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response content from Minimax");
  }

  return JSON.parse(extractJson(content)) as T;
}
