import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Activity,
} from "lucide-react";

export default function SafetyScore({
  score,
  risk,
}) {
  const radius = 90;
  const stroke = 12;

  const normalizedRadius = radius - stroke * 2;

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (score / 100) * circumference;

  let color = "#22c55e";
  let bg = "bg-green-500/10";
  let border = "border-green-500/30";
  let badge = "text-green-300";
  let title = "Excellent Safety";
  let message =
    "Workers are complying with PPE requirements.";

  if (risk === "MEDIUM") {
    color = "#eab308";
    bg = "bg-yellow-500/10";
    border = "border-yellow-500/30";
    badge = "text-yellow-300";
    title = "Moderate Risk";
    message =
      "Improve PPE compliance to reduce operational risk.";
  }

  if (risk === "HIGH") {
    color = "#ef4444";
    bg = "bg-red-500/10";
    border = "border-red-500/30";
    badge = "text-red-300";
    title = "Critical Risk";
    message =
      "Immediate corrective action is recommended.";
  }

  const confidence = Math.min(
    99,
    Math.max(85, score + 5)
  );

  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-xl">

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Safety Assessment
          </h2>

          <p className="mt-2 text-slate-400">
            AI-generated workplace safety evaluation
          </p>

        </div>

        <div
          className={`rounded-full border ${border} ${bg} px-5 py-2`}
        >
          <span className={`font-semibold ${badge}`}>
            {risk} RISK
          </span>
        </div>

      </div>

      <div className="grid gap-10 lg:grid-cols-2">

        {/* Gauge */}

        <div className="flex justify-center">

          <div className="relative">

            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{ backgroundColor: color }}
            />

            <svg
              height={radius * 2}
              width={radius * 2}
              className="relative"
            >

              <circle
                stroke="#1e293b"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />

              <circle
                stroke={color}
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                style={{
                  strokeDashoffset,
                  transition:
                    "stroke-dashoffset 1s ease",
                }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                transform={`rotate(-90 ${radius} ${radius})`}
              />

            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <h1 className="text-5xl font-black text-white">
                {score}%
              </h1>

              <p className="mt-2 text-slate-400">
                Safety Score
              </p>

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="space-y-6">

          <div
            className={`rounded-3xl border ${border} ${bg} p-6`}
          >

            <div className="flex items-center gap-4">

              {risk === "HIGH" ? (
                <AlertTriangle
                  size={42}
                  color={color}
                />
              ) : (
                <ShieldCheck
                  size={42}
                  color={color}
                />
              )}

              <div>

                <h3 className="text-3xl font-bold text-white">
                  {title}
                </h3>

                <p className="text-slate-400">
                  Current workplace status
                </p>

              </div>

            </div>

            <div className="mt-8">

              <div className="mb-3 flex justify-between">

                <span className="text-slate-400">
                  PPE Compliance
                </span>

                <span className="font-semibold text-white">
                  {score}%
                </span>

              </div>

              <div className="h-4 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${score}%`,
                    backgroundColor: color,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl bg-slate-900 p-5">

              <Activity
                className="mb-3 text-cyan-400"
                size={24}
              />

              <p className="text-sm text-slate-400">
                AI Confidence
              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">
                {confidence}%
              </h3>

            </div>

            <div className="rounded-2xl bg-slate-900 p-5">

              <CheckCircle2
                className="mb-3 text-emerald-400"
                size={24}
              />

              <p className="text-sm text-slate-400">
                Assessment
              </p>

              <h3 className={`mt-2 text-xl font-bold ${badge}`}>
                {risk}
              </h3>

            </div>

          </div>

          <div className="rounded-2xl bg-slate-900 p-6">

            <h3 className="text-lg font-semibold text-white">
              AI Summary
            </h3>

            <p className="mt-3 leading-7 text-slate-300">
              {message}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}