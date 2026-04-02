export default function ChatHeader({ onClear }) {
  return (
    <div className="card p-5 mb-4 flex items-center gap-4">
      <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center text-2xl">
        🤖
      </div>
      <div className="flex-1">
        <h2 className="font-bold text-gray-900">Sehat AI</h2>
        <p className="text-muted text-sm">Your intelligent health assistant</p>
      </div>
      <button
        onClick={onClear}
        className="text-xs text-muted border border-border px-3 py-1.5 rounded-lg hover:text-primary hover:border-primary transition-all"
      >
        Clear Chat
      </button>
      <span className="badge bg-green-100 text-green-700 text-xs">
        🟢 Online
      </span>
    </div>
  );
}
