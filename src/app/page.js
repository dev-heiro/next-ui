"use client";

import { useState } from "react";

export default function FlaskTestPage() {
  const [hello, setHello] = useState("");
  const [sumResult, setSumResult] = useState(null);
  const [echoResponse, setEchoResponse] = useState(null);

  const backendUrl = "http://13.209.99.25";

  const fetchHello = async () => {
    const res = await fetch(`${backendUrl}:8080/api/deploy/ping`);
    const data = await res.json();
    setHello(data.message);
  };

  const fetchSum = async () => {
    const res = await fetch(`${backendUrl}/api/add?a=5&b=7`);
    const data = await res.json();
    setSumResult(data.result);
  };

  const sendEcho = async () => {
    const res = await fetch(`${backendUrl}/api/echo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: "HEIRO", role: "Test" }),
    });
    const data = await res.json();
    setEchoResponse(data);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🧪 Flask API 테스트</h1>

      <div style={styles.section}>
        <button style={styles.button} onClick={fetchHello}>
          /api/hello 호출
        </button>
        {hello && <p style={styles.result}>응답: {hello}</p>}
      </div>

      <div style={styles.section}>
        <button style={styles.button} onClick={fetchSum}>
          /api/add?a=5&b=7 호출
        </button>
        {sumResult !== null && (
          <p style={styles.result}>합계 결과: {sumResult}</p>
        )}
      </div>

      <div style={styles.section}>
        <button style={styles.button} onClick={sendEcho}>
          /api/echo POST 호출
        </button>
        {echoResponse && (
          <pre style={styles.result}>
            {JSON.stringify(echoResponse, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#111",
    color: "#f5f5f5",
    minHeight: "100vh",
    padding: "60px 20px",
    fontFamily: "Menlo, monospace",
    maxWidth: "700px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "40px",
    borderBottom: "1px solid #444",
    paddingBottom: "10px",
    letterSpacing: "2px",
    textAlign: "center",
  },
  section: {
    marginBottom: "40px",
  },
  button: {
    backgroundColor: "#fff",
    color: "#000",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "0",
    cursor: "pointer",
    fontWeight: "bold",
    letterSpacing: "1px",
    transition: "background-color 0.2s ease",
  },
  output: {
    marginTop: "16px",
    padding: "12px",
    backgroundColor: "#222",
    color: "#0f0",
    fontSize: "14px",
    borderLeft: "4px solid #0f0",
    whiteSpace: "pre-wrap",
  },
};
