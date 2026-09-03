import {
  Bot,
  Users,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Info,
} from "lucide-react";

export default function AIRecommendation({
  workers,
  violations,
  score,
}) {
  let title = "";
  let recommendation = "";
  let color = "";
  let icon = null;

  if (score >= 90) {
    title = "Excellent Safety Compliance";
    recommendation =
      "Workers are following PPE guidelines correctly. Continue routine inspections and maintain current safety standards.";
    color = "emerald";
    icon = <CheckCircle2 size={26} className="text-emerald-400" />;
  } else if (score >= 70) {
    title = "Moderate Safety Risk";
    recommendation =
      "Some workers are missing required PPE. Correct these violations and perform another inspection to improve compliance.";
    color = "yellow";
    icon = <Info size={26} className="text-yellow-400" />;
  } else {
    title = "Critical Safety Risk";
    recommendation =
      "Multiple PPE violations detected. Immediate corrective action is recommended before work continues.";
    color = "red";
    icon = <AlertTriangle size={26} className="text-red-400" />;
  }

  const cardStyle = {
    emerald: "border-emerald-500/30 bg-emerald-500/10",
    yellow: "border-yellow-500/30 bg-yellow-500/10",
    red: "border-red-500/30 bg-red-500/10",
  };

  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-xl">

      <div className="mb-8 flex items-center gap-4">

        <div className="rounded-2xl bg-blue-600/20 p-4">
          <Bot className="text-blue-400" size={30} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white">
            AI Safety Recommendation
          </h2>
          <p className="mt-1 text-slate-400">
            Generated automatically from the latest inspection.
          </p>
        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-2xl bg-slate-900 p-6">

          <Users className="mb-4 text-blue-400" size={28} />

          <p className="text-sm text-slate-400">
            Workers Detected
          </p>

          <h3 className="mt-2 text-4xl font-bold text-white">
            {workers}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <AlertTriangle className="mb-4 text-red-400" size={28} />

          <p className="text-sm text-slate-400">
            PPE Violations
          </p>

          <h3 className="mt-2 text-4xl font-bold text-red-400">
            {violations}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <ShieldCheck className="mb-4 text-green-400" size={28} />

          <p className="text-sm text-slate-400">
            Safety Score
          </p>

          <h3 className="mt-2 text-4xl font-bold text-green-400">
            {score}%
          </h3>

        </div>

      </div>

      <div
        className={`mt-8 rounded-3xl border p-6 ${cardStyle[color]}`}
      >

        <div className="flex items-center gap-3">

          {icon}

          <h3 className="text-2xl font-bold text-white">
            {title}
          </h3>

        </div>

        <p className="mt-5 leading-8 text-slate-300">
          {recommendation}
        </p>

      </div>

    </section>
  );
}