const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/summary', async (req, res) => {
  const messages = req.body.messages;
  const apiKey = 'sk-...sdYA';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '너는 대화를 요약해주는 AI야.' },
          { role: 'user', content: `다음 대화를 요약해줘:\n${messages.join('\n')}` },
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    const result = await response.json();
    const summary = result.choices[0].message.content;
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: 'GPT 요청 실패', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`GPT 요약 서버 작동 중: http://localhost:${PORT}`);
});
