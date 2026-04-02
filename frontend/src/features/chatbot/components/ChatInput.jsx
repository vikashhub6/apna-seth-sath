export default function ChatInput({ input, onInputChange, onSend }) {
  return (
    <div className="p-4 border-t border-border bg-white">
      <div className="flex gap-2">
        <input
          className="input flex-1 text-sm"
          placeholder="Ask about symptoms, health tips, doctors..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
        />
        <button
          onClick={onSend}
          className="btn-primary px-4 py-2.5 flex-shrink-0"
        >
          Send ↗
        </button>
      </div>
    </div>
  );
}
