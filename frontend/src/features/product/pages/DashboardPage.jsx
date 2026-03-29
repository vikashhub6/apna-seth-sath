import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { motion } from "framer-motion";
import axios from "axios";

const statCards = [
  { label: "Steps Today", value: "8,420", icon: "👟", trend: "+12%", color: "#6c3ce1" },
  { label: "Active Streak", value: "14 days", icon: "🔥", trend: "+2", color: "#ef4444" },
  { label: "Water Intake", value: "2.4L", icon: "💧", trend: "Goal met", color: "#06b6d4" },
  { label: "Sleep Score", value: "87/100", icon: "😴", trend: "+5pts", color: "#8b5cf6" },
];

const upcomingAppts = [
  { id: 1, doctor: "Dr. Alistair Vance", type: "Annual Cardiac Review", date: "Oct 14", mode: "Digital Consultation", icon: "🫀" },
  { id: 2, doctor: "Vitalis Lab", type: "Biannual Bloodwork", date: "Oct 22", mode: "In-Person Visit", icon: "🧪" },
];

const nearbyHospitals = [
  { name: "Mayfair Wellness", dist: "3.0 mi", status: "Open 24h", tags: ["Fast Track", "Diagnostics"], color: "#22c55e" },
  { name: "Kensington Acute", dist: "1.6 mi", status: "Emergency", tags: ["High Load", "Pharmacy"], color: "#ef4444" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((r) => setPosts(r.data.data?.slice(0, 3) || []))
      .catch(() => {});
  }, []);

  const healthScore = user?.healthScore || 84;
  const firstName = user?.name?.split(" ")[0] || "Friend";

  return (
    <div style={{ background: "#f4f6fb", minHeight: "100vh", padding: "0" }}>

      {/* ── HERO BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f0eeff 100%)",
          borderRadius: "24px",
          padding: "48px 48px",
          marginBottom: "28px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(108,60,225,0.08)",
          border: "1px solid rgba(108,60,225,0.1)",
        }}
      >
        {/* BG DNA-like image placeholder */}
        <div style={{
          position: "absolute", right: "0", top: "0", bottom: "0",
          width: "45%",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          borderRadius: "0 24px 24px 0",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "8rem", opacity: 0.9,
        }}>
          🧬
          {/* Health Index Badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: "absolute", top: "24px", right: "24px",
              background: "rgba(255,255,255,0.95)",
              borderRadius: "16px", padding: "10px 16px",
              display: "flex", alignItems: "center", gap: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <span style={{ fontSize: "18px" }}>💚</span>
            <div>
              <div style={{ fontSize: "10px", color: "#666", fontWeight: "600", letterSpacing: "0.5px" }}>HEALTH INDEX</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#111" }}>98.4%</div>
            </div>
          </motion.div>
        </div>

        {/* Left Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: "50%" }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "5px 14px", borderRadius: "50px",
              background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)",
              color: "#16a34a", fontSize: "11px", fontWeight: "700",
              letterSpacing: "0.5px", marginBottom: "20px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
            OFFICIAL HEALTHCARE PARTNER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "3rem", fontWeight: "900", lineHeight: "1.1",
              marginBottom: "16px", letterSpacing: "-1.5px",
              color: "#1a1a2e",
            }}
          >
            Healthcare<br />
            <span style={{ color: "#6c3ce1" }}>Reimagined.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              color: "#64748b", fontSize: "15px", lineHeight: "1.7",
              maxWidth: "380px", marginBottom: "28px",
            }}
          >
            Experience a clinical environment where technology meets ethereal comfort. Guided by science, designed for humanity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <Link to="/doctors">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "13px 28px", borderRadius: "12px", border: "none",
                  cursor: "pointer", fontWeight: "700", fontSize: "14px",
                  background: "#6c3ce1", color: "#fff",
                  boxShadow: "0 4px 20px rgba(108,60,225,0.35)",
                }}
              >
                Start Your Sanctuary
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "13px 28px", borderRadius: "12px",
                cursor: "pointer", fontWeight: "600", fontSize: "14px",
                background: "transparent", color: "#1a1a2e",
                border: "1.5px solid #d1d5db",
              }}
            >
              Explore Services
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* ── CARDS ROW ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "20px",
        marginBottom: "28px",
      }}>
        {/* Member Portal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: "#fff", borderRadius: "20px", padding: "28px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            border: "1px solid #f1f5f9",
          }}
        >
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#6c3ce1", marginBottom: "6px" }}>
            Member Portal
          </h3>
          <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "20px" }}>
            Secure access to your verified medical profile.
          </p>
          <div style={{ marginBottom: "12px" }}>
            <input
              placeholder="Patient ID"
              style={{
                width: "100%", padding: "10px 14px", borderRadius: "10px",
                border: "1px solid #e2e8f0", fontSize: "13px",
                color: "#334155", outline: "none", background: "#f8fafc",
                marginBottom: "8px",
              }}
            />
            <input
              placeholder="Access Code"
              type="password"
              style={{
                width: "100%", padding: "10px 14px", borderRadius: "10px",
                border: "1px solid #e2e8f0", fontSize: "13px",
                color: "#334155", outline: "none", background: "#f8fafc",
              }}
            />
          </div>
          <Link to="/doctors">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%", padding: "12px", borderRadius: "10px",
                border: "none", cursor: "pointer", fontWeight: "700",
                fontSize: "14px", background: "#6c3ce1", color: "#fff",
                boxShadow: "0 4px 16px rgba(108,60,225,0.3)",
              }}
            >
              Sign In
            </motion.button>
          </Link>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
            <span style={{ fontSize: "12px", color: "#94a3b8", cursor: "pointer" }}>Forgot Code?</span>
            <span style={{ fontSize: "12px", color: "#6c3ce1", cursor: "pointer", fontWeight: "600" }}>Request Access</span>
          </div>
        </motion.div>

        {/* Middle Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Live Bio-Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              background: "#fff", borderRadius: "20px", padding: "22px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              border: "1px solid #f1f5f9", flex: 1,
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(108,60,225,0.1)", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "18px", marginBottom: "12px",
            }}>📊</div>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "6px" }}>
              Live Bio-Metrics
            </h3>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "12px", lineHeight: "1.6" }}>
              Real-time clinical monitoring with AI-driven diagnostics for a holistic health view.
            </p>
            <span style={{ fontSize: "12px", color: "#6c3ce1", fontWeight: "600", cursor: "pointer" }}>
              Learn More →
            </span>
          </motion.div>

          {/* Verified Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "#fff", borderRadius: "20px", padding: "22px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              border: "1px solid #f1f5f9", flex: 1,
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(0,200,150,0.1)", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "18px", marginBottom: "12px",
            }}>✅</div>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "6px" }}>
              Verified Care
            </h3>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "12px", lineHeight: "1.6" }}>
              Connect with board-certified professionals specialized in precision medicine.
            </p>
            <span style={{ fontSize: "12px", color: "#6c3ce1", fontWeight: "600", cursor: "pointer" }}>
              View Directory →
            </span>
          </motion.div>
        </div>

        {/* Emergency Sanctuary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            background: "linear-gradient(135deg, #00c896 0%, #00a67e 100%)",
            borderRadius: "20px", padding: "28px",
            boxShadow: "0 4px 24px rgba(0,200,150,0.25)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", right: "-20px", top: "-20px",
            width: "120px", height: "120px", borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}/>
          <div style={{
            position: "absolute", right: "16px", bottom: "16px",
            width: "70px", height: "70px", borderRadius: "50%",
            background: "rgba(0,0,0,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px",
          }}>💗</div>

          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#fff", marginBottom: "8px" }}>
              Emergency Sanctuary
            </h3>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6", marginBottom: "20px" }}>
              Instant 24/7 access to our critical care units and emergency medical helplines.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "12px 20px", borderRadius: "12px",
              border: "none", cursor: "pointer", fontWeight: "700",
              fontSize: "14px", background: "rgba(255,255,255,0.2)",
              color: "#fff", backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", gap: "8px",
              width: "fit-content",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            📞 0800-SAFE
          </motion.button>
        </motion.div>
      </div>

      {/* ── BOTTOM SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: "#fff", borderRadius: "24px", padding: "48px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          border: "1px solid #f1f5f9",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px",
          alignItems: "center",
        }}
      >
        {/* Left - Image Placeholder */}
        <div style={{ position: "relative" }}>
          <div style={{
            background: "linear-gradient(135deg, #e0f7f4 0%, #b2f0e8 100%)",
            borderRadius: "20px", height: "280px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "6rem", position: "relative", overflow: "hidden",
          }}>
            🏥
            {/* Patient Safety Badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: "absolute", bottom: "20px", right: "20px",
                background: "#fff", borderRadius: "16px", padding: "14px 18px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                display: "flex", alignItems: "flex-start", gap: "10px",
                maxWidth: "200px",
              }}
            >
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: "#6c3ce1", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "16px", flexShrink: 0,
              }}>🛡️</div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#1a1a2e" }}>Patient Safety</div>
                <div style={{ fontSize: "10px", color: "#94a3b8", lineHeight: "1.4", marginTop: "2px" }}>
                  ISO-9001 certified facilities with state-of-the-art biological containment protocols.
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right - Content */}
        <div>
          <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "2px", marginBottom: "12px" }}>
            THE SANCTUARY STANDARDS
          </p>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#1a1a2e", lineHeight: "1.2", marginBottom: "16px" }}>
            A Private Haven For Your{" "}
            <span style={{ color: "#6c3ce1" }}>Clinical Needs.</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.8", marginBottom: "24px" }}>
            We have redefined the healthcare journey by removing the anxiety of traditional settings. Our facilities are designed as sanctuaries, ensuring peace of mind while receiving world-class treatment.
          </p>

          {/* Feature List */}
          {[
            { icon: "🌿", text: "Stress-free diagnostic environments" },
            { icon: "🧬", text: "Pioneering gene-therapy suites" },
            { icon: "🔒", text: "Military-grade data privacy" },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontSize: "16px" }}>{f.icon}</span>
              <span style={{ fontSize: "14px", color: "#334155", fontWeight: "500" }}>{f.text}</span>
            </motion.div>
          ))}

          <Link to="/doctors">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                marginTop: "24px", padding: "14px 32px",
                borderRadius: "12px", border: "none",
                cursor: "pointer", fontWeight: "700", fontSize: "14px",
                background: "#6c3ce1", color: "#fff",
                boxShadow: "0 4px 20px rgba(108,60,225,0.3)",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              Book a Consultation →
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* ── STATS ROW ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            whileHover={{ y: -4 }}
            style={{
              background: "#fff", borderRadius: "16px", padding: "20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              border: "1px solid #f1f5f9",
            }}
          >
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px",
              background: `${s.color}18`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", marginBottom: "12px",
            }}>
              {s.icon}
            </div>
            <div style={{ fontSize: "1.4rem", fontWeight: "800", color: "#1a1a2e" }}>{s.value}</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px", fontWeight: "500" }}>{s.label}</div>
            <div style={{ fontSize: "12px", color: s.color, marginTop: "6px", fontWeight: "600" }}>{s.trend}</div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
