"use client"
import { useEffect } from "react";

export default function KeepAlive() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`https://echo-backend-w51u.onrender.com/api/auth/keep-alive`)
        .then((res) => res.json())
        .then((data) => console.log("Keep-alive:", data))
        .catch((err) => console.error("Keep-alive failed:", err));
    }, 30000); // 30 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return null; // invisible component
}
