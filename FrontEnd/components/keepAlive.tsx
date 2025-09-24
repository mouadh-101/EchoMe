"use client"
import { useEffect } from "react";

export default function KeepAlive() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/keep-alive`)
        .then((res) => res.json())
        .then((data) => console.log("Keep-alive:", data))
        .catch((err) => console.error("Keep-alive failed:", err));
    }, 30000); // 30 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return null; // invisible component
}
