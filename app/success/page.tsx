// @ts-nocheck
"use client";

import Link from "next/link";

export default function SuccessPage() {

  // 🔥 HARDCODED LINKS (NO environment variables, NO alerts)
  const openWhatsApp = () => {
    window.open("https://chat.whatsapp.com/I5ZQSfs2mnpD04jdyqMGkC", "_blank");
  };

  const openInstagram = () => {
    window.open("https://www.instagram.com/delitech.it_?igsh=MnBiOXBucTV4aXo5", "_blank");
  };

  return (
    <div className="cyber-page">
      <div className="cyber-bg-glow">
        <div className="glow-1"></div>
        <div className="glow-2"></div>
      </div>

      <div className="cyber-card" style={{ textAlign: "center" }}>
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <div
            style={{
              width: "112px",
              height: "112px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(180,77,255,0.2))",
              border: "2px solid rgba(0,245,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
              overflow: "hidden",
              boxShadow: "0 0 50px rgba(0,245,255,0.15)",
              animation: "spin3D 10s ease-in-out infinite",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.animationDuration = "2s")}
            onMouseLeave={(e) => (e.currentTarget.style.animationDuration = "10s")}
          >
            <img
              src="/club-logo.png"
              alt="Club Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        <h1 className="cyber-heading" style={{ fontSize: "2.5rem" }}>Welcome Aboard!</h1>
        <p className="cyber-subtitle" style={{ marginBottom: "1.5rem" }}>
          You're now part of the future
        </p>

        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(0,245,255,0.1)",
            borderRadius: "0.75rem",
            padding: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ color: "rgba(0,245,255,0.8)", fontWeight: 600, fontSize: "0.875rem" }}>
            📱 Connect With Us
          </p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
            Join our community & follow us on social media
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <button
            onClick={openWhatsApp}
            className="cyber-btn"
            style={{
              textAlign: "center",
              display: "block",
              textDecoration: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(0, 200, 150, 0.15))",
              borderColor: "rgba(0, 245, 255, 0.3)",
            }}
          >
            📱 Join WhatsApp Group
          </button>

          <button
            onClick={openInstagram}
            style={{
              textAlign: "center",
              display: "block",
              textDecoration: "none",
              cursor: "pointer",
              width: "100%",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, rgba(255, 0, 150, 0.15), rgba(180, 77, 255, 0.15))",
              border: "1px solid rgba(255, 0, 150, 0.25)",
              color: "#ffffff",
              fontSize: "0.875rem",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              fontFamily: "inherit",
              backdropFilter: "blur(4px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 0, 150, 0.3), rgba(180, 77, 255, 0.3))";
              e.currentTarget.style.borderColor = "rgba(255, 0, 150, 0.5)";
              e.currentTarget.style.boxShadow = "0 0 50px rgba(255, 0, 150, 0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 0, 150, 0.15), rgba(180, 77, 255, 0.15))";
              e.currentTarget.style.borderColor = "rgba(255, 0, 150, 0.25)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            📸 Follow on Instagram
          </button>
        </div>

        <Link
          href="/register"
          style={{
            display: "block",
            marginTop: "1.5rem",
            color: "rgba(0,245,255,0.3)",
            fontSize: "0.75rem",
            textDecoration: "none",
          }}
        >
          ← Back to Registration
        </Link>

        <p style={{ color: "rgba(255,255,255,0.1)", fontSize: "0.6rem", marginTop: "1.5rem" }}>
          🔒 Your data is encrypted & secure
        </p>
      </div>
    </div>
  );
}