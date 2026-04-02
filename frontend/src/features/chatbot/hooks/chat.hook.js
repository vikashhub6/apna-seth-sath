import { useState, useCallback } from "react";
import { chatService } from "../services/chatbot.service";
import { useAuth } from "../../auth/hooks/useAuth";

export function useChat() {
  const { user } = useAuth();
  const token = user?.token;
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      text: "Hi! I'm Sehat AI, your personal health assistant. 🏥\n\nI can help with symptoms, health tips, doctor suggestions, and even analyze images. How can I help you today?",
      time: new Date(),
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageType, setCurrentImageType] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      if (!token) {
        setError("Please login first to use chat");
        return;
      }

      const userMsg = text?.trim();
      if (!userMsg && !currentImage) return;

      const newUserMessage = {
        id: Date.now(),
        role: "user",
        text: userMsg,
        image: currentImage,
        time: new Date(),
      };

      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);
      setTyping(true);
      setError(null);

      try {
        const apiMessages = updatedMessages.map((msg) => ({
          role: msg.role === "bot" ? "assistant" : "user",
          content: msg.text,
        }));

        const data = await chatService.sendMessage(
          apiMessages,
          token,
          currentImage,
          currentImageType
        );

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "bot",
            text: data.reply || data.message || "Koi jawab nahi mila.",
            time: new Date(),
          },
        ]);

        // Clear image after sending
        setCurrentImage(null);
        setCurrentImageType(null);
      } catch (err) {
        setError(err.message);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "bot",
            text: "Server se connect nahi ho pa raha, please dobara try karein.",
            time: new Date(),
          },
        ]);
      } finally {
        setTyping(false);
      }
    },
    [messages, token, currentImage, currentImageType]
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 1,
        role: "bot",
        text: "Hi! I'm Sehat AI, your personal health assistant. 🏥\n\nHow can I help you today?",
        time: new Date(),
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    typing,
    error,
    sendMessage,
    clearChat,
    setCurrentImage,
    setCurrentImageType,
  };
}