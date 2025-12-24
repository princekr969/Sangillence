import React from "react";

export default function Quiz({ data, index, total, onAns }) {
  const progress = ((index + 1) / total) * 100;

  return (
    <div className="glass-card min-w-2xl max-w-4xl">
      {/* 1. SMALL LOGO INSIDE CARD */}
      <img
        src="https://res.cloudinary.com/dstbd40ud/image/upload/v1766321457/Untitled_design_5_zq2tz9.png"
        alt="Sangillence"
        style={{
          height: "50px",
          marginBottom: "20px",
          filter: "drop-shadow(0 0 8px rgba(99,102,241,0.6))",
        }}
      />

      {/* Progress Tracker */}
      <div className="progress-container">
        <div className="progress-text">
          Question {index + 1} of {total}
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* 2. WHITE TEXT FOR QUESTION */}
      
      <h2
        className="font-bold text-[1.5rem] mb-[30px] text-white">
        {data.text}
      </h2>

      {/* 3. ENLARGED BUTTON NUMBERING */}
      <div className="scale-grid">
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            className="scale-btn"
            onClick={() => onAns(data.id, v)}
            style={{ fontSize: "1.8rem", fontFamily: "Outfit, sans-serif" }} // Larger Font
          >
            {v}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.8rem",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        <span>Never</span>
        <span>Always</span>
      </div>
    </div>
  );
}
