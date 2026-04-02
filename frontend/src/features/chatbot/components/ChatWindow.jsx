import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({
  messages,
  typing,
  formatTime,
  bottomRef,
}) {
  return (
    <div
      className="card overflow-hidden"
      style={{ height: "60vh", display: "flex", flexDirection: "column" }}
    >
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} formatTime={formatTime} />
        ))}

        {typing && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
