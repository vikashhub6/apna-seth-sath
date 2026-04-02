export default function HospitalCard({ h }) {
  return (
    <div className={`card p-4 ${h.recommended ? 'border-accent border-2' : ''}`}>
      {h.recommended && (
        <div className="flex items-center gap-1 mb-2">
          <span className="badge bg-accent/10 text-accent text-xs">⭐ RECOMMENDED</span>
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{h.name}</h3>
          <p className="text-muted text-sm">{h.type}</p>
          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="text-muted">📍 {h.distance}</span>
            <span className={`badge text-xs ${parseInt(h.wait) <= 15 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'}`}>
              ⏱ {h.wait} wait
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {h.services?.map(s => (
              <span key={s} className="badge bg-surface text-muted text-xs border border-border">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <a href={`tel:${h.phone}`} 
            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
            📞
          </a>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button className="btn-primary flex-1 text-sm py-2">Get Directions</button>
        <button className="btn-outline flex-1 text-sm py-2">View Details</button>
      </div>
    </div>
  );
}