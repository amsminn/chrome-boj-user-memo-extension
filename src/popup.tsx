import { useState } from "react";

function IndexPopup() {
  const [data, setData] = useState("");

  const handleSync = () => {
    // 동기화 로직을 이곳에 구현
    alert("동기화 진행 중...");
  };

  return (
    <div
      style={{
        width: "80vw",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
        padding: 32,
        borderRadius: 16,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <h1 style={{ fontSize: "2.0rem", marginBottom: "1rem", color: "#333" }}>
        BOJ User Notes Extension
      </h1>
      <input
        onChange={(e) => setData(e.target.value)}
        value={data}
        placeholder="Enter your note here..."
        style={{
          padding: "12px 16px",
          width: "80%",
          fontSize: "1rem",
          border: "2px solid #ddd",
          borderRadius: 8,
          marginBottom: "1.5rem",
          outline: "none",
          transition: "border 0.2s",
        }}
        onFocus={(e) => (e.currentTarget.style.border = "2px solid #0070f3")}
        onBlur={(e) => (e.currentTarget.style.border = "2px solid #ddd")}
      />
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <button
          onClick={handleSync}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Update
        </button>
        <a
          href="https://your-guide-link.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Guide
        </a>
      </div>
    </div>
  );
}

export default IndexPopup;