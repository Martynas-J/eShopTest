"use client";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  async function pay() {
    setLoading(true);
    try {
      const res = await fetch("/api/paysera/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 12.99,
          orderId: Date.now().toString(),
          email: "pirkėjas@example.com"
        })
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Klaida: " + (data.error || "Nepavyko gauti nuorodos"));
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      alert("Tinklo klaida");
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Užsakymas</h1>
      <p>Kaina: 12.99 EUR</p>
      <button onClick={pay} disabled={loading} style={{
        padding: "10px 18px",
        background: "#0ea5e9",
        color: "white",
        border: "none",
        borderRadius: 6,
        cursor: "pointer"
      }}>
        {loading ? "Kraunama..." : "Apmokėti per Paysera"}
      </button>
    </div>
  );
}
