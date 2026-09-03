import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Bot,
  Activity,
  TriangleAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">

      {/* Background Blur */}

      <div className="absolute inset-0">

        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-20 lg:flex-row lg:py-28">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="flex-1"
        >

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">

            <Bot size={18} className="text-blue-400" />

            <span className="text-sm text-blue-300">

              AI Powered Workplace Safety Platform

            </span>

          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">

            Smart PPE Detection

            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Powered by AI

            </span>

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">

            VisionDesk AI continuously monitors workplace safety,
            detects PPE violations in real time, generates intelligent
            reports, and helps organizations improve compliance using
            computer vision and artificial intelligence.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link to="/detect">

              <Button
                size="lg"
                className="rounded-xl px-8"
              >
                Start Detection
              </Button>

            </Link>

            <Link to="/dashboard">

              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8"
              >
                Live Dashboard
              </Button>

            </Link>

          </div>

          <div className="mt-12 flex flex-wrap gap-8">

            <div>

              <h2 className="text-3xl font-bold text-white">

                99%

              </h2>

              <p className="text-slate-400">

                Detection Accuracy

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-white">

                24/7

              </h2>

              <p className="text-slate-400">

                Continuous Monitoring

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-white">

                AI

              </h2>

              <p className="text-slate-400">

                Instant Reports

              </p>

            </div>

          </div>

        </motion.div>

        {/* Right Dashboard Preview */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="flex-1"
        >

          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur">

            <div className="mb-8 flex items-center justify-between">

              <h2 className="text-xl font-bold text-white">

                Live Safety Dashboard

              </h2>

              <Activity className="text-green-400" />

            </div>

            <div className="space-y-5">

              <div className="rounded-2xl bg-slate-800 p-5">

                <div className="flex justify-between">

                  <span className="text-slate-400">

                    Safety Score

                  </span>

                  <ShieldCheck className="text-green-400" />

                </div>

                <h3 className="mt-4 text-4xl font-bold text-green-400">

                  94%

                </h3>

              </div>

              <div className="rounded-2xl bg-slate-800 p-5">

                <div className="flex justify-between">

                  <span className="text-slate-400">

                    Active Workers

                  </span>

                  <Bot className="text-blue-400" />

                </div>

                <h3 className="mt-4 text-4xl font-bold text-white">

                  28

                </h3>

              </div>

              <div className="rounded-2xl bg-slate-800 p-5">

                <div className="flex justify-between">

                  <span className="text-slate-400">

                    PPE Violations

                  </span>

                  <TriangleAlert className="text-red-400" />

                </div>

                <h3 className="mt-4 text-4xl font-bold text-red-400">

                  3

                </h3>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}