export default async function handler(req, res) {
  const { messages } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "당신은 대화를 요약하는 비서입니다." },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 200
    })
  });

  const result = await response.json();
  const summary = result.choices?.[0]?.message?.content || "요약 실패";

  res.status(200).json({ summary });
}
