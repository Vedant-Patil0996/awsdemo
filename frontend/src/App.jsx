import React, { useState, useEffect } from 'react';

// 🔴 PASTE YOUR LAMBDA FUNCTION URL HERE 🔴
// Make sure to REMOVE the trailing slash at the end if it exists.
const API_URL = "https://<YOUR-ID>.lambda-url.<REGION>.on.aws";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Test the connection immediately on load
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

  // --- UI RENDER ---
  return (
    <div style={styles.container}>
      <h1>☁️ AWS Connectivity Test</h1>
      
      <div style={styles.card}>
        <h2>Status: {loading ? "Connecting..." : (error ? "FAILED ❌" : "SUCCESS ✅")}</h2>
        
        {error && <p style={{color: 'red'}}>Error: {error}</p>}
        
        {data && (
          <div style={{textAlign: 'left'}}>
            <p><strong>Message:</strong> {data.message}</p>
            <p><strong>Ethical Score Test:</strong> {data.score_test}</p>
            <p><strong>Backend Status:</strong> {data.status}</p>
          </div>
        )}
      </div>

      <p style={{marginTop: 20, fontSize: 12, color: '#666'}}>
        Backend URL: {API_URL}
      </p>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: 50, fontFamily: "sans-serif" },
  card: { 
    border: "1px solid #ddd", 
    padding: 20, 
    borderRadius: 8, 
    maxWidth: 400, 
    margin: "20px auto",
    backgroundColor: "#f9f9f9"
  }
};

export default App;