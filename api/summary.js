export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const apiKey = "sk-...sdYA"; // 여기에 네 진짜 OpenAI 키를 넣어

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "다음 대화를 짧게 요약해줘." },
          ...messages
        ],
        max_tokens: 200,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ error: errorData });
    }

    const data = await response.json();
    const summary = data.choices[0].message.content.trim();

    return res.status(200).json({ summary });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
