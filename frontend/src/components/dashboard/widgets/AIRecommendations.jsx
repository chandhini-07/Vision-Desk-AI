import {
  Bot,
  ShieldCheck,
  TriangleAlert,
  Users,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Shield,
} from "lucide-react";

export default function AIRecommendations({ summary }) {
  const score = summary.safety_score || 0;
  const workers = summary.workers || 0;
  const violations = summary.violations || 0;
  const stats = summary.stats || {};

  const recommendations = [];

  if (score < 50) {
    recommendations.push({
      level: "critical",
      text: "Immediate workplace inspection is required.",
    });
  } else if (score < 80) {
    recommendations.push({
      level: "warning",
      text: "Improve PPE compliance to reduce workplace risks.",
    });
  } else {
    recommendations.push({
      level: "safe",
      text: "Maintain current PPE compliance and continue routine inspections.",
    });
  }

  if ((stats.helmet || 0) < workers) {
    recommendations.push({
      level: "warning",
      text: "Ensure every worker wears a certified safety helmet.",
    });
  }

  if ((stats.vest || 0) < workers) {
    recommendations.push({
      level: "warning",
      text: "High-visibility safety vests should be mandatory.",
    });
  }

  if ((stats.gloves || 0) < workers) {
    recommendations.push({
      level: "warning",
      text: "Workers should wear protective gloves while handling equipment.",
    });
  }

  if ((stats.boots || 0) < workers) {
    recommendations.push({
      level: "warning",
      text: "Provide certified safety boots for all workers.",
    });
  }

  if ((stats.goggles || 0) < workers) {
    recommendations.push({
      level: "warning",
      text: "Eye protection should be worn in hazardous work areas.",
    });
  }

  const scoreColor =
    score >= 80
      ? "text-emerald-400"
      : score >= 50
      ? "text-yellow-400"
      : "text-red-400";

  const scoreBadge =
    score >= 80
      ? "bg-emerald-500/10 text-emerald-300"
      : score >= 50
      ? "bg-yellow-500/10 text-yellow-300"
      : "bg-red-500/10 text-red-300";

  const getIcon = (level) => {
    switch (level) {
      case "critical":
        return <TriangleAlert size={18} className="text-red-400" />;
      case "warning":
        return <AlertTriangle size={18} className="text-yellow-400" />;
      default:
        return <CheckCircle2 size={18} className="text-emerald-400" />;
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-600/20 p-3">

            <Bot
              size={26}
              className="text-blue-400"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              AI Safety Advisor
            </h2>

            <p className="text-sm text-slate-400">
              Intelligent workplace recommendations
            </p>

          </div>

        </div>

        <div className={`rounded-full px-4 py-2 text-sm font-semibold ${scoreBadge}`}>
          {score}% Safe
        </div>

      </div>

      {/* Metrics */}

      <div className="grid grid-cols-3 gap-4">

        <div className="rounded-2xl bg-slate-800/70 p-4 text-center">

          <Users className="mx-auto mb-2 text-blue-400" />

          <p className="text-xs uppercase tracking-wide text-slate-400">
            Workers
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {workers}
          </p>

        </div>

        <div className="rounded-2xl bg-slate-800/70 p-4 text-center">

          <ShieldCheck className={`mx-auto mb-2 ${scoreColor}`} />

          <p className="text-xs uppercase tracking-wide text-slate-400">
            Safety
          </p>

          <p className={`mt-2 text-3xl font-bold ${scoreColor}`}>
            {score}%
          </p>

        </div>

        <div className="rounded-2xl bg-slate-800/70 p-4 text-center">

          <TriangleAlert className="mx-auto mb-2 text-red-400" />

          <p className="text-xs uppercase tracking-wide text-slate-400">
            Violations
          </p>

          <p className="mt-2 text-3xl font-bold text-red-400">
            {violations}
          </p>

        </div>

      </div>

      {/* AI Recommendation Panel */}

      <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">

        <div className="mb-5 flex items-center gap-3">

          <Sparkles
            className="text-cyan-400"
            size={22}
          />

          <h3 className="text-lg font-semibold text-white">
            AI Recommended Actions
          </h3>

        </div>

        <div className="space-y-3">

          {recommendations.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-blue-500"
            >

              {getIcon(item.level)}

              <p className="text-sm leading-6 text-slate-300">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* AI Confidence */}

      <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

        <div className="flex items-center gap-3">

          <Shield
            className="text-emerald-400"
            size={22}
          />

          <div>

            <h3 className="font-semibold text-white">
              AI Confidence
            </h3>

            <p className="text-sm text-emerald-300">
              Recommendations generated from the latest inspection data and PPE detection results.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}