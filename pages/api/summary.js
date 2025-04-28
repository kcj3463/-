// pages/api/summary.js

export default async function handler(req, res) {
  const { text } = req.query; // GET 요청에서 'text' 받기

  if (!text) {
    return res.status(400).json({ error: "No text provided." });
  }

  const apiKey = "sk-...sdYA"; // 네 OpenAI API 키

  try {
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
          { role: "user", content: text }
        ],
        max_tokens: 100,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content?.trim();

    if (summary) {
      res.status(200).json({ summary });
    } else {
      res.status(500).json({ error: "No summary generated." });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error.", details: err.message });
  }
}
