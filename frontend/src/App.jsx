import React, { useState, useEffect } from 'react';

// ✅ I pasted your actual AWS URL here:
const API_URL = "https://rz5jmhfggtdlfrmvtfwnf2ffcu0lsoxe.lambda-url.eu-north-1.on.aws/";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        console.log("Response from AWS:", json);
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Connection Failed:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: 50, fontFamily: "sans-serif" }}>
      <h1>🚀 Hackathon Connectivity Test</h1>

      <div style={{
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 8,
        maxWidth: 500,
        margin: "20px auto",
        backgroundColor: "#f0fdf4" // Light green background
      }}>
        <h2>Status: {loading ? "Connecting..." : (error ? "FAILED ❌" : "SUCCESS ✅")}</h2>

        {data && (
          <div style={{ textAlign: 'left', marginTop: 20 }}>
            <p><strong>Message:</strong> {data.message}</p>
            <p><strong>Score:</strong> {data.score_test}</p>
            <p style={{ fontSize: 12, color: "#888" }}>Served from: AWS Lambda</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;