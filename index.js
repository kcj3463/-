// gpt-server.js
export default async function handler(req, res) {
  const { messages } = await req.json();

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-...여기에_본인_키"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "당신은 대화를 요약하는 AI 비서입니다." },
        ...messages
      ],
      max_tokens: 200,
      temperature: 0.7
    })
  });

  const data = await openaiRes.json();
  res.json({ summary: data.choices[0].message.content });
}
