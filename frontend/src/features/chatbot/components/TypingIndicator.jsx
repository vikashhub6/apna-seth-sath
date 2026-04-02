export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 animate-fade-in">
      <div className="w-8 h-8 gradient-hero rounded-xl flex items-center justify-center text-sm flex-shrink-0">
        🤖
      </div>
      <div className="bg-surface rounded-2xl rounded-bl-none px-4 py-3 border border-border">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
