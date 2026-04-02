const Groq = require("groq-sdk");
const axios = require("axios");
const pdfParse = require("pdf-parse");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function extractPdfText(fileUrl) {
  const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
  const data = await pdfParse(response.data);
  return data.text;
}

async function generateChatResponse({ messages, fileUrl, fileType }) {
  const formattedMessages = [
    {
      role: "system",
      content: `Tu SehatSaathi ka AI health assistant "Sehat AI" hai.
      User jo bhi symptom bataye, image ya PDF bheje — sab analyze kar.
      Suggest kar ki kaunsa doctor consult karna chahiye.
      Hindi aur English dono mein reply kar jaise user kare.
      Hamesha end mein bolna — real doctor se milna zaroori hai.`
    },
    ...messages.slice(0, -1).map(msg => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content
    }))
  ];

  const lastMessage = messages[messages.length - 1];

  if (fileUrl && fileType === "pdf") {
    const extractedText = await extractPdfText(fileUrl);
    formattedMessages.push({
      role: "user",
      content: `User ne yeh PDF share ki hai:\n\n${extractedText}\n\nUser ka sawaal: ${lastMessage.content}`
    });
  } else {
    formattedMessages.push({
      role: "user",
      content: lastMessage.content
    });
  }

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: formattedMessages,
  });

  return response.choices[0].message.content;
}

module.exports = { generateChatResponse };