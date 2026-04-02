const { generateChatResponse } = require("../services/ai.service");

async function chatController(req, res) {
  try {
    let { messages } = req.body;
    const file = req.file?.path || null; // ✅ multer yahan dalta hai URL

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

    let fileType = null;

    if (file) {
      if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
        fileType = "image";
      } else if (/\.pdf$/i.test(file)) {
        fileType = "pdf";
      }
    }

    const reply = await generateChatResponse({
      messages,
      fileUrl: file,
      fileType,
    });

    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Chat controller error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}

module.exports = { chatController };
