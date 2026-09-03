import { motion } from "framer-motion";
import {
  Camera,
  Brain,
  FileText,
  BarChart3,
  ShieldCheck,
  Bot,
} from "lucide-react";

const FEATURES = [
  {
    icon: Camera,
    title: "AI PPE Detection",
    description:
      "Detect helmets, safety vests, gloves, goggles and boots in real time using advanced computer vision.",
    color: "text-blue-400",
    bg: "from-blue-500/10 to-blue-500/5",
  },
  {
    icon: Brain,
    title: "Intelligent AI Assistant",
    description:
      "Ask workplace safety questions and receive AI-powered guidance, summaries and recommendations.",
    color: "text-cyan-400",
    bg: "from-cyan-500/10 to-cyan-500/5",
  },
  {
    icon: FileText,
    title: "Smart Report Generation",
    description:
      "Automatically generate detailed inspection reports with risk analysis and compliance summaries.",
    color: "text-yellow-400",
    bg: "from-yellow-500/10 to-yellow-500/5",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Monitor violations, compliance trends, worker statistics and workplace performance from one dashboard.",
    color: "text-green-400",
    bg: "from-green-500/10 to-green-500/5",
  },
  {
    icon: ShieldCheck,
    title: "Safety Compliance",
    description:
      "Track PPE compliance across the workplace and identify high-risk areas before incidents occur.",
    color: "text-emerald-400",
    bg: "from-emerald-500/10 to-emerald-500/5",
  },
  {
    icon: Bot,
    title: "VisionDesk AI",
    description:
      "Combine computer vision, AI analysis and workplace intelligence into a single safety platform.",
    color: "text-violet-400",
    bg: "from-violet-500/10 to-violet-500/5",
  },
];

export default function Features() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">

            Everything You Need

          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">

            Powerful Features for Workplace Safety

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">

            VisionDesk AI combines artificial intelligence, computer vision,
            analytics and reporting into a unified platform that helps
            organizations improve workplace safety and compliance.

          </p>

        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {FEATURES.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className={`rounded-3xl border border-slate-800 bg-gradient-to-br ${feature.bg} p-8 transition-all duration-300 hover:border-blue-500/40 hover:shadow-2xl`}
              >

                <div
                  className={`mb-6 inline-flex rounded-2xl bg-slate-900 p-4 ${feature.color}`}
                >

                  <Icon size={32} />

                </div>

                <h3 className="text-2xl font-bold text-white">

                  {feature.title}

                </h3>

                <p className="mt-5 leading-7 text-slate-400">

                  {feature.description}

                </p>

                <div className="mt-8 h-1 w-16 rounded-full bg-blue-500" />

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}