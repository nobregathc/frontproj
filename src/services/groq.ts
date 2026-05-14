const API_KEY = "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";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function sendMessageToGroq(prompt: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  console.log("Resposta Groq:", data);

  if (!response.ok) {
    throw new Error("Erro na API Groq.");
  }

  return data.choices[0].message.content as string;
}