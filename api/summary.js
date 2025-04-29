export default async function handler(req, res) {
  const OPENAI_API_KEY = sk-...sdYA;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET only' });
  }

  const userText = req.query.text;
  if (!userText) {
    return res.status(400).json({ error: 'No text provided' });
  }

  const body = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `다음 내용을 한 줄로 요약해줘:\n${userText}` }],
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    const summary = result.choices?.[0]?.message?.content?.trim() || "요약 실패";

    res.status(200).json({ summary });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI API 요청 실패', detail: err.message });
  }
}
