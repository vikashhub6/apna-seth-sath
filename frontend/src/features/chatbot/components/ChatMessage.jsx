export default function ChatMessage({ msg, formatTime }) {
  return (
    <div
      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
    >
      {msg.role === "bot" && (
        <div className="w-8 h-8 gradient-hero rounded-xl flex items-center justify-center text-sm flex-shrink-0 mr-2">
          🤖
        </div>
      )}
      <div className={`max-w-[80%] ${msg.role === "user" ? "order-1" : ""}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            msg.role === "user"
              ? "bg-primary text-white rounded-br-none"
              : "bg-surface text-gray-800 rounded-bl-none border border-border"
          }`}
        >
          {msg.text}
        </div>
        <p
          className={`text-xs text-muted mt-1 ${
            msg.role === "user" ? "text-right" : ""
          }`}
        >
          {formatTime(msg.time)}
        </p>
      </div>
    </div>
  );
}
