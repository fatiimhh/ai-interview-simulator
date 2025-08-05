export async function getGroqReply(messages, role = "Software Engineer") {
  const formattedMessages = messages.map((msg) => ({
    role: msg.sender === 'user' ? 'user' : msg.sender === 'ai' ? 'assistant' : 'system',
    content: [
      {
        type: "text",
        text: msg.text,
      }
    ]
  }));

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: formattedMessages,
    })
  });

  const data = await response.json();
  console.log("GROQ Response:", data);

  return data.choices?.[0]?.message?.content || "Sorry, I couldn’t think of a reply.";
}
