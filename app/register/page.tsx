// @ts-nocheck
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // --- ADDED: Toast Notification State ---
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };
  // ---------------------------------------

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    semester: 1,
    domain_interest: [],
    suggestions: "",
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const arr = form.domain_interest;
      if (checked) {
        setForm({ ...form, domain_interest: [...arr, value] });
      } else {
        setForm({
          ...form,
          domain_interest: arr.filter((v) => v !== value),
        });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFileError("");

    if (selectedFile) {
      const maxSize = 1 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        setFileError("❌ File is too large. Please upload a photo under 1 MB.");
        e.target.value = "";
        setFile(null);
        return;
      }
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      showToast("Please select a photo.", "error"); // CHANGED: alert to toast
      setLoading(false);
      return;
    }

    let photo_url = "";
    let photo_path = "";

    try {
      const ext = file.name.split(".").pop();
      const path = `public/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("student-photos")
        .upload(path, file);

      if (uploadError) {
        showToast("Photo upload failed: " + uploadError.message, "error"); // CHANGED: alert to toast
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("student-photos")
        .getPublicUrl(path);

      photo_url = urlData.publicUrl;
      photo_path = path;
    } catch (err) {
      showToast("Photo upload error: " + err.message, "error"); // CHANGED: alert to toast
      setLoading(false);
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      department: form.department,
      semester: Number(form.semester),
      domain_interest: form.domain_interest,
      suggestions: form.suggestions,
      photo_url,
      photo_path,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/success");
      } else {
        const errorData = await res.json();
        showToast(errorData.error, "error"); // CHANGED: alert to toast
      }
    } catch (err) {
      showToast("Network error: " + err.message, "error"); // CHANGED: alert to toast
    }
    setLoading(false);
  };

  return (
    <>
      {/* --- ADDED: Toast Notification Rendered Here --- */}
      {toast.show && (
        <div
          className="toast-container"
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 99999,
            padding: "14px 28px",
            borderRadius: "10px",
            background: "rgba(10, 10, 20, 0.95)",
            backdropFilter: "blur(8px)",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: "500",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
            animation:
              "slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
            border:
              toast.type === "error"
                ? "1px solid #ef4444"
                : "1px solid #00f5ff",
            boxShadow:
              toast.type === "error"
                ? "0 0 25px rgba(239, 68, 68, 0.3)"
                : "0 0 25px rgba(0, 245, 255, 0.3)",
          }}
        >
          {toast.message}
        </div>
      )}
      {/* ---------------------------------------------------- */}

      <div
        className="cyber-page"
        style={{ minHeight: "100vh", minHeight: "-webkit-fill-available" }}
      >
        <div className="cyber-bg-glow">
          <div className="glow-1"></div>
          <div className="glow-2"></div>
        </div>

        <div className="cyber-card">
          {/* Logo - Centered at Top */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: "112px",
                height: "112px",
                borderRadius: "9999px",
                background:
                  "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(180,77,255,0.2))",
                border: "2px solid rgba(0,245,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
                overflow: "hidden",
                boxShadow: "0 0 50px rgba(0,245,255,0.15)",
                animation: "spin3D 10s ease-in-out infinite",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.animationDuration = "2s")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.animationDuration = "10s")
              }
            >
              <img
                src="/club-logo.png"
                alt="Club Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <h2 className="cyber-heading">⚡ Join</h2>
          <h1 className="cyber-heading"> DELITECH </h1>
          <p className="cyber-subtitle" style={{ marginBottom: "1.5rem" }}>
            CHANGE IS CONSTANT, DELITECH KEEPS YOU AHEAD
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="cyber-input"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              onChange={handleChange}
              className="cyber-input"
              required
            />
            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="cyber-input"
              required
            />

            {/* DEPARTMENT RADIO BUTTONS */}
            <div style={{ marginTop: "0.25rem" }}>
              <span className="cyber-label">Select Department</span>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                {["BCA", "BBA", "BCOM", "BA"].map((dept) => (
                  <label
                    key={dept}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border:
                        form.department === dept
                          ? "2px solid rgba(0,245,255,0.8)"
                          : "1px solid rgba(255,255,255,0.2)",
                      background:
                        form.department === dept
                          ? "rgba(0,245,255,0.15)"
                          : "rgba(255,255,255,0.05)",
                      color: form.department === dept ? "#00f5ff" : "#ffffff",
                      transition: "all 0.2s",
                    }}
                  >
                    <input
                      type="radio"
                      name="department"
                      value={dept}
                      checked={form.department === dept}
                      onChange={handleChange}
                      style={{ accentColor: "#00f5ff", cursor: "pointer" }}
                      required
                    />
                    {dept}
                  </label>
                ))}
              </div>
            </div>

            <input
              name="semester"
              type="number"
              placeholder="Your Current Semester"
              onChange={handleChange}
              className="cyber-input"
              required
            />

            <span className="cyber-label">Select Interests</span>
            <div className="cyber-checkbox-group">
              {["Web Dev", "AI/ML", "Cybersecurity", "Cloud", "App Dev"].map(
                (d) => (
                  <label key={d} className="cyber-checkbox-label">
                    <input type="checkbox" value={d} onChange={handleChange} />{" "}
                    {d}
                  </label>
                ),
              )}
            </div>

            {/* File Input with Validation */}
            <div style={{ marginTop: "0.5rem" }}>
              <label
                className="cyber-label"
                style={{ marginBottom: "0.25rem" }}
              >
                📸 Upload Photo (max 1 MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cyber-file"
                required
              />
              {!file && !fileError && (
                <p
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.7rem",
                    marginTop: "0.25rem",
                  }}
                >
                  Please upload a photo under 1 MB (recommended ~500 KB)
                </p>
              )}
              {file && !fileError && (
                <p
                  style={{
                    color: "rgba(0,245,255,0.6)",
                    fontSize: "0.7rem",
                    marginTop: "0.25rem",
                  }}
                >
                  ✅ {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
              {fileError && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {fileError}
                </p>
              )}
            </div>

            <textarea
              name="suggestions"
              placeholder="Your intention to join this club?"
              onChange={handleChange}
              className="cyber-input textarea"
            />

            <button type="submit" className="cyber-btn" disabled={loading}>
              {loading ? "Registering..." : "🚀 Register & Join"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
