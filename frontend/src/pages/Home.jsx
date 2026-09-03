import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/common/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import Footer from "@/components/common/Footer";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "VisionDesk AI | Intelligent Workplace Safety";

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />

      <Hero />

      <Stats />

      <Features />

      <Footer />
    </main>
  );
}