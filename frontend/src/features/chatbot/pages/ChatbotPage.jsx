import { useState, useRef, useEffect } from "react";
import { useChat } from "../hooks/chat.hook";
import ChatHeader from "../components/ChatHeader";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import SuggestedPrompts from "../components/SuggestedPrompts";
import ErrorBanner from "../components/ErrorBanner";

export default function ChatbotPage() {
  const { messages, typing, error, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    sendMessage(msg);
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <ChatHeader onClear={clearChat} />
      <ErrorBanner error={error} />
      <ChatWindow
        messages={messages}
        typing={typing}
        formatTime={formatTime}
        bottomRef={bottomRef}
      />
      <ChatInput
        input={input}
        onInputChange={setInput}
        onSend={() => handleSend()}
      />
      <SuggestedPrompts onSelect={handleSend} />
    </div>
  );
}
