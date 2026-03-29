import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const specializations = [
  "All", "Neurology Expert", "Genetics & Longevity", "Cardiology",
  "Dermatology", "Mental Health", "Sports Medicine",
];

const avatarEmojis = ["🧠", "🧬", "❤️", "🩺", "🧘", "⚡"];
const avatarGradients = [
  "linear-gradient(160deg, #3a1c71, #d76d77, #ffaf7b)",
  "linear-gradient(160deg, #0f2027, #203a43, #2c5364)",
  "linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)",
  "linear-gradient(160deg, #134e5e, #71b280)",
  "linear-gradient(160deg, #373b44, #4286f4)",
  "linear-gradient(160deg, #200122, #6f0000)",
];

const myConsultations = [
  { id: 1, title: "Cardiology Follow-up", doctor: "Dr. Alistair Vance", mode: "Video Call", date: "TODAY, 14:30", status: "upcoming", icon: "🫀", color: "#6c3ce1" },
  { id: 2, title: "Vitality Scan Review", doctor: "Central Diagnostic Hub", mode: "In-Person", date: "OCT 13, 09:00", status: "scheduled", icon: "📊", color: "#00c896" },
  { id: 3, title: "Dermatology Script", doctor: "Dr. Sarah Jenkins", mode: "Chat Only", date: "", status: "completed", icon: "🩺", color: "#94a3b8" },
];

function BookDoctorCard({ doctor, index, onBook }) {
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  const handleBook = async () => {
    if (!doctor.available) return;
    setBooking(true);
    try {
      await onBook(doctor._id);
      setBooked(true);
      setTimeout(() => setBooked(false), 3000);
    } finally {
      setBooking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      style={{
        borderRadius: "20px", overflow: "hidden",
        flexShrink: 0, width: "200px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{
        height: "220px",
        background: avatarGradients[index % avatarGradients.length],
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
          borderRadius: "50px", padding: "3px 8px",
          display: "flex", alignItems: "center", gap: "3px",
          border: "1px solid rgba(255,255,255,0.15)",
        }}>
          <span style={{ color: "#fbbf24", fontSize: "11px" }}>★</span>
          <span style={{ color: "#fff", fontSize: "11px", fontWeight: "700" }}>{doctor.rating}</span>
        </div>
        <div style={{
          width: "80px", height: "80px", borderRadius: "20px",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
          border: "2px solid rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2.5rem", boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}>
          {avatarEmojis[index % avatarEmojis.length]}
        </div>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
        }}>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            {doctor.specialization}
          </div>
          <div style={{ fontSize: "14px", color: "#fff", fontWeight: "700", marginTop: "2px" }}>
            {doctor.name}
          </div>
        </div>
      </div>
      <div style={{ padding: "12px" }}>
        <motion.button
          onClick={handleBook}
          disabled={booking || !doctor.available}
          whileHover={doctor.available ? { scale: 1.03 } : {}}
          whileTap={doctor.available ? { scale: 0.97 } : {}}
          style={{
            width: "100%", padding: "10px", borderRadius: "10px",
            cursor: doctor.available ? "pointer" : "not-allowed",
            fontSize: "13px", fontWeight: "600",
            background: booked ? "#00c896" : doctor.available ? "rgba(108,60,225,0.15)" : "rgba(255,255,255,0.05)",
            color: booked ? "#fff" : doctor.available ? "#a78bfa" : "rgba(255,255,255,0.3)",
            border: doctor.available && !booked ? "1px solid rgba(108,60,225,0.3)" : "1px solid transparent",
          }}
        >
          {booked ? "✓ Booked!" : booking ? "Booking..." : "Book Session"}
        </motion.button>
      </div>
    </motion.div>
  );
}

function DoctorCard({ doctor, index, onBook }) {
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  const handleBook = async () => {
    if (!doctor.available) return;
    setBooking(true);
    try {
      await onBook(doctor._id);
      setBooked(true);
      setTimeout(() => setBooked(false), 3000);
    } finally {
      setBooking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px", overflow: "hidden", position: "relative",
      }}
    >
      <div style={{
        position: "absolute", top: "12px", right: "12px",
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
        borderRadius: "50px", padding: "4px 10px",
        display: "flex", alignItems: "center", gap: "4px", zIndex: 10,
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        <span style={{ color: "#fbbf24", fontSize: "12px" }}>★</span>
        <span style={{ color: "#fff", fontSize: "12px", fontWeight: "700" }}>{doctor.rating}</span>
      </div>
      <div style={{
        height: "180px", background: avatarGradients[index % avatarGradients.length],
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          style={{
            width: "90px", height: "90px", borderRadius: "24px",
            background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)",
            border: "2px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2.8rem", boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {avatarEmojis[index % avatarEmojis.length]}
        </motion.div>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 16px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
        }}>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>{doctor.specialization}</div>
          <div style={{ fontSize: "16px", color: "#fff", fontWeight: "700", marginTop: "2px" }}>{doctor.name}</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>{doctor.experience} yrs exp</span>
          <span style={{ fontSize: "15px", fontWeight: "700", color: "#00c896" }}>₹{doctor.fee}</span>
        </div>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.6", marginBottom: "14px" }}>{doctor.about}</p>
        <motion.button
          onClick={handleBook}
          disabled={booking || !doctor.available}
          whileHover={doctor.available ? { scale: 1.02 } : {}}
          whileTap={doctor.available ? { scale: 0.98 } : {}}
          style={{
            width: "100%", padding: "12px", borderRadius: "12px", border: "none",
            cursor: doctor.available ? "pointer" : "not-allowed",
            fontSize: "14px", fontWeight: "600",
            background: booked ? "#00c896" : doctor.available ? "linear-gradient(135deg, #6c3ce1, #00c896)" : "rgba(255,255,255,0.05)",
            color: doctor.available || booked ? "#fff" : "rgba(255,255,255,0.3)",
            boxShadow: doctor.available && !booked ? "0 0 20px rgba(108,60,225,0.4)" : "none",
          }}
        >
          {booked ? "✓ Session Booked!" : booking ? "Booking..." : "Book Session"}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios.get("/api/doctors")
      .then((r) => setDoctors(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "All" ? doctors : doctors.filter((d) => d.specialization === filter);

  const bookDoctor = async (id) => {
    await axios.post(`/api/doctors/${id}/book`, {
      date: new Date().toISOString(), time: "10:00 AM", type: "Video Call",
    });
  };

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{
          borderRadius: "24px", overflow: "hidden", marginBottom: "36px",
          display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "300px",
          background: "#f8f6ff", border: "1px solid rgba(108,60,225,0.1)",
          boxShadow: "0 4px 24px rgba(108,60,225,0.08)",
        }}
      >
        <div style={{ padding: "44px" }}>
          <motion.span
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            style={{
              display: "inline-block", padding: "4px 14px", borderRadius: "50px",
              background: "rgba(0,200,150,0.12)", border: "1px solid rgba(0,200,150,0.3)",
              color: "#059669", fontSize: "11px", fontWeight: "700",
              letterSpacing: "1px", marginBottom: "16px",
            }}
          >EXPERT ACCESS</motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontSize: "2.4rem", fontWeight: "900", lineHeight: "1.15", marginBottom: "16px", color: "#6c3ce1" }}
          >
            Experience Care in its<br />Purest Form.
          </motion.h1>
          <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.7", marginBottom: "28px", maxWidth: "340px" }}>
            Connect with global specialists from the comfort of our ethereal digital lounge. Precision medicine met with human empathy.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ padding: "12px 24px", borderRadius: "12px", border: "none", cursor: "pointer", fontWeight: "700", fontSize: "14px", background: "#6c3ce1", color: "#fff", boxShadow: "0 4px 20px rgba(108,60,225,0.3)" }}>
              Start Consultation
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ padding: "12px 24px", borderRadius: "12px", cursor: "pointer", fontWeight: "600", fontSize: "14px", background: "transparent", color: "#6c3ce1", border: "1.5px solid rgba(108,60,225,0.3)" }}>
              View Specialist Directory
            </motion.button>
          </div>
        </div>
        <div style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "9rem", position: "relative", overflow: "hidden",
        }}>
          🔬
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            style={{
              position: "absolute", bottom: "24px", left: "24px",
              background: "rgba(255,255,255,0.95)", borderRadius: "16px", padding: "14px 20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <p style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "700", letterSpacing: "1px", marginBottom: "4px" }}>LIVE STATUS</p>
            <motion.p animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: "2.2rem", fontWeight: "800", color: "#6c3ce1", lineHeight: "1" }}>
              {doctors.filter((d) => d.available).length}
            </motion.p>
            <p style={{ color: "#6c3ce1", fontSize: "12px", fontWeight: "700", marginTop: "2px" }}>Specialists</p>
            <p style={{ color: "#94a3b8", fontSize: "10px" }}>Available for instant chat</p>
          </motion.div>
        </div>
      </motion.div>

      {/* MY CONSULTATIONS + BOOK ONE-ON-ONE */}
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "28px", marginBottom: "40px" }}>

        {/* My Consultations */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#fff" }}>My Consultations</h2>
            <span style={{ fontSize: "13px", color: "#6c3ce1", cursor: "pointer", fontWeight: "600" }}>History</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {myConsultations.map((c, i) => (
              <motion.div key={c.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px", padding: "14px",
                  display: "flex", gap: "12px", alignItems: "flex-start",
                }}
              >
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
                  background: c.status === "completed" ? "rgba(148,163,184,0.1)" : `${c.color}20`,
                  border: `1px solid ${c.status === "completed" ? "rgba(148,163,184,0.15)" : c.color + "40"}`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
                }}>{c.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: c.status === "completed" ? "rgba(255,255,255,0.35)" : "#fff" }}>{c.title}</span>
                    {c.date && (
                      <span style={{
                        fontSize: "10px", fontWeight: "700", whiteSpace: "nowrap",
                        color: c.status === "upcoming" ? "#fbbf24" : "rgba(255,255,255,0.35)",
                        background: c.status === "upcoming" ? "rgba(251,191,36,0.1)" : "transparent",
                        padding: "2px 6px", borderRadius: "50px",
                        border: c.status === "upcoming" ? "1px solid rgba(251,191,36,0.25)" : "none",
                      }}>{c.date}</span>
                    )}
                    {c.status === "completed" && (
                      <span style={{ fontSize: "9px", fontWeight: "700", color: "#94a3b8", background: "rgba(148,163,184,0.08)", padding: "2px 6px", borderRadius: "50px", border: "1px solid rgba(148,163,184,0.15)" }}>COMPLETED</span>
                    )}
                  </div>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>{c.doctor} · {c.mode}</p>
                  {c.status === "upcoming" && (
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button style={{ padding: "6px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "700", background: "#6c3ce1", color: "#fff", flex: 1 }}>Join Room</button>
                      <button style={{ width: "30px", height: "28px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>···</button>
                    </div>
                  )}
                  {c.status === "scheduled" && (
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(108,60,225,0.35)", cursor: "pointer", fontSize: "12px", fontWeight: "600", background: "transparent", color: "#a78bfa", flex: 1 }}>Reschedule</button>
                      <button style={{ width: "30px", height: "28px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}>📋</button>
                    </div>
                  )}
                  {c.status === "completed" && (
                    <button style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(148,163,184,0.15)", cursor: "pointer", fontSize: "11px", fontWeight: "600", background: "transparent", color: "rgba(255,255,255,0.3)" }}>View Summary</button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Book One-on-One - ✅ FIXED */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
          style={{ minWidth: 0 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#fff" }}>Book One-on-One</h2>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={() => scroll("left")} style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>‹</button>
              <button onClick={() => scroll("right")} style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>›</button>
            </div>
          </div>
          <div
            ref={scrollRef}
            style={{ display: "flex", gap: "14px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none" }}
          >
            {loading ? (
              <div style={{ color: "rgba(255,255,255,0.4)", padding: "40px" }}>Loading...</div>
            ) : (
              doctors.map((doc, i) => (
                <BookDoctorCard key={doc._id} doctor={doc} index={i} onBook={bookDoctor} />
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* ALL SPECIALISTS */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "32px" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#fff", marginBottom: "18px" }}>All Specialists</h2>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", overflowX: "auto", paddingBottom: "6px", scrollbarWidth: "none" }}>
          {specializations.map((s) => (
            <motion.button key={s} onClick={() => setFilter(s)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{
                whiteSpace: "nowrap", padding: "9px 20px", borderRadius: "12px", flexShrink: 0,
                border: filter === s ? "none" : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer", fontSize: "13px", fontWeight: "600",
                background: filter === s ? "linear-gradient(135deg, #6c3ce1, #00c896)" : "rgba(255,255,255,0.04)",
                color: filter === s ? "#fff" : "rgba(255,255,255,0.5)",
                boxShadow: filter === s ? "0 0 20px rgba(108,60,225,0.3)" : "none",
              }}
            >{s}</motion.button>
          ))}
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.4)" }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✨</motion.div>
            <p>Loading specialists...</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {filtered.map((doc, i) => <DoctorCard key={doc._id} doctor={doc} index={i} onBook={bookDoctor} />)}
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", fontWeight: "600" }}>Clinical Sanctuary © 2024</span>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Emergency Helpline: 0800-SAFE", "Terms of Service", "Privacy Policy", "Medical Disclaimer"].map((t) => (
            <span key={t} style={{ fontSize: "12px", color: t.includes("Emergency") ? "#00c896" : "rgba(255,255,255,0.3)", cursor: "pointer", fontWeight: t.includes("Emergency") ? "600" : "400" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
