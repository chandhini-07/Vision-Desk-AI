import { motion } from "framer-motion";
import {
  ShieldCheck,
  Brain,
  ScanEye,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-950">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

      {/* Animated Glow */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
        className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: "easeInOut",
        }}
        className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[150px]"
      />

      {/* Left Panel */}
      <div className="relative hidden w-1/2 items-center justify-center px-12 lg:flex">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <div className="mb-8 inline-flex rounded-3xl bg-blue-600 p-6 shadow-2xl shadow-blue-600/40">
            <ShieldCheck className="text-white" size={70} />
          </div>

          <h1 className="text-6xl font-black leading-tight text-white">
            VisionDesk AI
          </h1>

          <p className="mt-5 text-2xl font-semibold text-blue-300">
            AI Powered Workplace Safety Platform
          </p>

          <p className="mt-8 text-lg leading-8 text-slate-300">
            Monitor workplace safety in real time using AI-driven PPE
            detection, automated inspection reports, compliance tracking,
            and intelligent analytics.
          </p>

          {/* Feature Cards */}

          <div className="mt-12 grid gap-4">

            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur">
              <Brain className="text-blue-400" size={24} />
              <div>
                <h3 className="font-semibold text-white">
                  AI Violation Detection
                </h3>
                <p className="text-sm text-slate-400">
                  Detect PPE violations instantly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur">
              <ScanEye className="text-cyan-400" size={24} />
              <div>
                <h3 className="font-semibold text-white">
                  Live Monitoring
                </h3>
                <p className="text-sm text-slate-400">
                  Continuous surveillance powered by AI.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur">
              <BarChart3 className="text-emerald-400" size={24} />
              <div>
                <h3 className="font-semibold text-white">
                  Smart Analytics
                </h3>
                <p className="text-sm text-slate-400">
                  Visual dashboards and safety insights.
                </p>
              </div>
            </div>

          </div>

          {/* Stats */}

          <div className="mt-12 flex gap-10">

            <div>
              <h2 className="text-3xl font-bold text-white">99.4%</h2>
              <p className="text-slate-400">Detection Accuracy</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">24/7</h2>
              <p className="text-slate-400">AI Monitoring</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">100+</h2>
              <p className="text-slate-400">Safety Reports</p>
            </div>

          </div>

          {/* Security Badge */}

          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-emerald-300">
            <CheckCircle2 size={20} />
            Enterprise Grade Security
          </div>

        </motion.div>
      </div>

      {/* Right Panel */}

      <div className="relative flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
        {children}
      </div>

    </div>
  );
}