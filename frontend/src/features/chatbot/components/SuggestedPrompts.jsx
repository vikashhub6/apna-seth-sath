const suggestions = [
  "I have a headache",
  "Tips for better sleep",
  "Manage anxiety",
  "Blood pressure advice",
  "Book a doctor",
  "Emergency numbers",
  "Government health schemes",
  "Exercise recommendations",
];

export default function SuggestedPrompts({ onSelect }) {
  return (
    <div className="mt-4">
      <p className="text-xs text-muted mb-3 font-medium">
        💡 Suggested questions
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className="text-xs bg-white border border-border text-gray-700 px-3 py-2 rounded-xl hover:border-primary hover:text-primary transition-all"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
