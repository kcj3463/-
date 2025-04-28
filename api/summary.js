export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  const apiKey = "sk-...sdYA"; // 네 OpenAI API 키를 여기 넣어
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "당신은 대화를 요약하는 비서입니다." },
        ...messages
      ],
      max_tokens: 100,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    return res.status(500).json({ error: "OpenAI API Error" });
  }

  const data = await response.json();
  const summary = data.choices[0].message.content.trim();

  res.status(200).json({ summary });
}
