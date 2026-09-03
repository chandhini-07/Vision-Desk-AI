import {
  Clock3,
  FileImage,
  ShieldCheck,
  TriangleAlert,
  Activity,
} from "lucide-react";

export default function IncidentTimeline({ summary }) {
  const timeline = summary.timeline || [];

  const getStatus = (item) => {
    const violations = item.violations ?? 0;

    if (violations > 3)
      return {
        text: "High Risk",
        color: "text-red-400",
        bg: "bg-red-500/10",
        icon: TriangleAlert,
      };

    if (violations > 0)
      return {
        text: "Warning",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        icon: Activity,
      };

    return {
      text: "Safe",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      icon: ShieldCheck,
    };
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Inspection Timeline
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Recent AI inspection history
          </p>

        </div>

        <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2">

          <span className="text-sm font-semibold text-blue-300">
            {timeline.length} Records
          </span>

        </div>

      </div>

      {timeline.length === 0 ? (
        <div className="flex h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700">

          <Clock3
            size={56}
            className="mb-5 text-slate-600"
          />

          <h3 className="text-xl font-semibold text-white">
            No Inspection History
          </h3>

          <p className="mt-2 text-slate-400">
            Upload an image to start building your inspection timeline.
          </p>

        </div>
      ) : (
        <div className="max-h-[500px] space-y-6 overflow-y-auto pr-2">

          {timeline.map((item, index) => {
            const status = getStatus(item);
            const StatusIcon = status.icon;

            return (
              <div
                key={index}
                className="group relative pl-10"
              >
                {/* Timeline Line */}

                {index !== timeline.length - 1 && (
                  <div className="absolute left-4 top-10 h-full w-px bg-slate-700" />
                )}

                {/* Timeline Dot */}

                <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-600/30">

                  <FileImage
                    size={16}
                    className="text-white"
                  />

                </div>

                {/* Card */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 group-hover:border-blue-500 group-hover:bg-slate-900">

                  <div className="flex flex-wrap items-start justify-between gap-4">

                    <div className="min-w-0">

                      <h3 className="break-all text-lg font-semibold text-white">
                        {item.filename}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">

                        <Clock3 size={15} />

                        {item.time}

                      </div>

                    </div>

                    <div
                      className={`flex items-center gap-2 rounded-full px-3 py-1 ${status.bg}`}
                    >
                      <StatusIcon
                        size={16}
                        className={status.color}
                      />

                      <span className={`text-sm font-semibold ${status.color}`}>
                        {status.text}
                      </span>

                    </div>

                  </div>

                  {item.violations !== undefined && (
                    <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">

                      <div className="rounded-xl bg-slate-800 p-3">

                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Violations
                        </p>

                        <p className="mt-1 text-2xl font-bold text-red-400">
                          {item.violations}
                        </p>

                      </div>

                      {item.workers !== undefined && (
                        <div className="rounded-xl bg-slate-800 p-3">

                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            Workers
                          </p>

                          <p className="mt-1 text-2xl font-bold text-white">
                            {item.workers}
                          </p>

                        </div>
                      )}

                      {item.safety_score !== undefined && (
                        <div className="rounded-xl bg-slate-800 p-3">

                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            Safety Score
                          </p>

                          <p className="mt-1 text-2xl font-bold text-emerald-400">
                            {item.safety_score}%
                          </p>

                        </div>
                      )}

                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}