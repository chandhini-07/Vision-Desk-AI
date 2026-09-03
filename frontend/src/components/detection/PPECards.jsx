import {
  HardHat,
  Shield,
  Glasses,
  Hand,
  Footprints,
  Users,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

function PPECard({
  title,
  value,
  workers,
  icon,
  color,
}) {
  const notVisible = value === -1;

  const percentage =
    workers > 0 && !notVisible
      ? Math.min(100, Math.round((value / workers) * 100))
      : 0;

  const status =
    notVisible
      ? "Not Visible"
      : percentage >= 90
      ? "Excellent"
      : percentage >= 70
      ? "Good"
      : "Needs Attention";

  return (
    <div className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-wide text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-black text-white">
            {notVisible ? "--" : value}
          </h2>

        </div>

        <div className={`rounded-2xl p-4 ${color}`}>
          {icon}
        </div>

      </div>

      <div className="mt-6">

        {notVisible ? (
          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-300">
            Not Visible
          </span>
        ) : (
          <>
            <div className="mb-2 flex justify-between">

              <span className="text-sm text-slate-400">
                Compliance
              </span>

              <span className="font-semibold text-white">
                {percentage}%
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

            <div className="mt-4 flex items-center gap-2">

              <CheckCircle2
                size={16}
                className={
                  percentage >= 80
                    ? "text-emerald-400"
                    : "text-yellow-400"
                }
              />

              <span className="text-xs text-slate-400">
                {status}
              </span>

            </div>

          </>
        )}

      </div>

    </div>
  );
}

export default function PPECards({
  stats,
  workers,
  violations,
}) {
  const cards = [
    {
      title: "Workers",
      value: workers,
      icon: <Users size={32} className="text-blue-400" />,
      color: "bg-blue-600/20",
    },
    {
      title: "Helmet",
      value: stats.helmet,
      icon: <HardHat size={32} className="text-green-400" />,
      color: "bg-green-600/20",
    },
    {
      title: "Vest",
      value: stats.vest,
      icon: <Shield size={32} className="text-cyan-400" />,
      color: "bg-cyan-600/20",
    },
    {
      title: "Gloves",
      value: stats.gloves,
      icon: <Hand size={32} className="text-purple-400" />,
      color: "bg-purple-600/20",
    },
    {
      title: "Goggles",
      value: stats.goggles,
      icon: <Glasses size={32} className="text-orange-400" />,
      color: "bg-orange-600/20",
    },
    {
      title: "Boots",
      value: stats.boots,
      icon: <Footprints size={32} className="text-pink-400" />,
      color: "bg-pink-600/20",
    },
  ];

  return (
    <section className="mt-10">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            PPE Compliance Summary
          </h2>

          <p className="mt-2 text-slate-400">
            AI-detected personal protective equipment statistics.
          </p>

        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-red-400" />

            <div>

              <p className="text-xs uppercase text-red-300">
                Violations
              </p>

              <p className="text-2xl font-bold text-red-400">
                {violations}
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

        {cards.map((card) => (
          <PPECard
            key={card.title}
            title={card.title}
            value={card.value}
            workers={workers}
            icon={card.icon}
            color={card.color}
          />
        ))}

      </div>

    </section>
  );
}