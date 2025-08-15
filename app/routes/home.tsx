import { useState, useEffect } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Daily Advice for Free" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) throw new Error("Failed to fetch advice");
      const data = await res.json();
      setAdvice(data.slip?.advice || "No advice found.");
    } catch (err) {
      setError("Error fetching advice.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen font-advice bg-radial-[at_50%_50%] from-blue-400 to-blue-900">
      <div className="flex flex-col justify-center items-center gap-5 text-center md:w-2/3 px-4">
        {error && <p className="text-red-500">{error}</p>}
        {advice && <p className="text-3xl">{advice}</p>}
        <button
          onClick={handleFetch}
          disabled={loading}
          className="btn btn-dash text-black hover:text-gray-700"
        >
          {loading ? "Loading..." : "Update advice"}
        </button>
      </div>
    </div>
  );
}
