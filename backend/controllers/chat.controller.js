const { generateChatResponse } = require("../services/ai.service");

async function chatController(req, res) {
  try {
    let { messages, fileUrl, fileType } = req.body;
    const file = req.file?.path || null;

    // Parse messages if it's a string (from form-data)
    if (typeof messages === "string") {
      messages = JSON.parse(messages);
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Messages must be a valid array",
      });
    }

    // Use fileUrl from body (base64) or file from multer
    const imageUrl = fileUrl || file;

    const reply = await generateChatResponse({
      messages,
      fileUrl: imageUrl,
      fileType,
    });

    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Chat controller error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}

module.exports = { chatController };
