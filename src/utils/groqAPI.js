export async function getGroqReply(messages) {
  const response = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();
  console.log("GROQ Response:", data);

  return data.choices?.[0]?.message?.content || "Sorry, I couldn’t think of a reply.";
}
