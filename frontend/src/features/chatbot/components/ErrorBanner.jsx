export default function ErrorBanner({ error }) {
  if (!error) return null;

  return (
    <div className="mb-3 px-4 py-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
      ⚠️ {error}
    </div>
  );
}
