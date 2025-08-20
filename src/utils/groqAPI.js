export async function getGroqReply(messages, role = "Software Engineer") {
  try {
    // build safe payload 
    const payload = {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are interviewing the candidate for a ${role} role.`,
        },
        ...messages
          .filter((msg) => msg.text && msg.text.trim() !== "") 
          .map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text.trim(),
          })),
      ],
    };

    // Debug log 
    console.log("📤 Sending payload to Groq:", JSON.stringify(payload, null, 2));

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    //Debug Groq response
    console.log("📥 Groq API response:", data);

    return data.choices?.[0]?.message?.content || "⚠️ No response from Groq";
  } catch (error) {
    console.error("Error fetching Groq reply:", error);
    return "⚠️ Error: Could not get a response from Groq.";
  }
}
