import { motion } from "framer-motion";
import {
  ShieldCheck,
  Activity,
  FileText,
  Bot,
} from "lucide-react";

export default function Stats() {

  const stats = [
    {
      value: "99%",
      label: "Detection Accuracy",
      icon: ShieldCheck,
      color: "text-green-400",
      bg: "from-green-500/10 to-green-500/5",
    },
    {
      value: "24/7",
      label: "Live Monitoring",
      icon: Activity,
      color: "text-blue-400",
      bg: "from-blue-500/10 to-blue-500/5",
    },
    {
      value: "10K+",
      label: "Reports Generated",
      icon: FileText,
      color: "text-yellow-400",
      bg: "from-yellow-500/10 to-yellow-500/5",
    },
    {
      value: "AI",
      label: "Smart Insights",
      icon: Bot,
      color: "text-cyan-400",
      bg: "from-cyan-500/10 to-cyan-500/5",
    },
  ];

  return (
    <section className="py-20">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
        >

          <h2 className="text-center text-4xl font-bold text-white">

            Trusted AI Safety Platform

          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-slate-400">

            VisionDesk AI combines computer vision, artificial intelligence,
            and workplace analytics to improve safety, compliance, and
            operational efficiency.

          </p>

        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: .5,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className={`rounded-3xl border border-slate-800 bg-gradient-to-br ${item.bg} p-8 backdrop-blur transition-all duration-300 hover:border-blue-500/40 hover:shadow-2xl`}
              >

                <div className="flex items-center justify-between">

                  <div
                    className={`rounded-2xl bg-slate-900 p-4 ${item.color}`}
                  >

                    <Icon size={30} />

                  </div>

                  <span className="text-xs uppercase tracking-widest text-slate-500">

                    LIVE

                  </span>

                </div>

                <h3 className={`mt-8 text-5xl font-extrabold ${item.color}`}>

                  {item.value}

                </h3>

                <p className="mt-4 text-lg text-slate-300">

                  {item.label}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );

}