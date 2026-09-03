import { useMemo, useState } from "react";
import {
  Search,
  Download,
  CheckCircle2,
  Database,
  Filter,
} from "lucide-react";

export default function DetectionTable({ detections = [] }) {
  const [search, setSearch] = useState("");

  // Always work with an array
  const safeDetections = Array.isArray(detections) ? detections : [];

  const filtered = useMemo(() => {
    return safeDetections.filter((d) =>
      (d.label || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [safeDetections, search]);

  function exportCSV() {
    const rows = [
      ["Label", "Confidence"],
      ...filtered.map((d) => [
        d.label ?? "Unknown",
        `${((d.confidence ?? 0) * 100).toFixed(1)}%`,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "VisionDesk_Detections.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function badgeColor(label = "") {
    switch (label.toLowerCase()) {
      case "person":
        return "bg-blue-600";
      case "helmet":
        return "bg-green-600";
      case "vest":
        return "bg-cyan-600";
      case "gloves":
        return "bg-purple-600";
      case "goggles":
        return "bg-orange-600";
      case "boots":
        return "bg-pink-600";
      default:
        return "bg-slate-600";
    }
  }

  function confidenceColor(value = 0) {
    const percent = value * 100;

    if (percent >= 90) return "bg-emerald-500";
    if (percent >= 75) return "bg-yellow-500";
    return "bg-red-500";
  }

  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-slate-800 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-600/20 p-3">
            <Database size={24} className="text-blue-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Detection Results
            </h2>

            <p className="text-sm text-slate-400">
              {filtered.length} detected objects
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-slate-500"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search detections..."
              className="rounded-xl border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-white outline-none focus:border-blue-500"
            />
          </div>

          <button className="rounded-xl border border-slate-700 bg-slate-800 px-4 transition hover:bg-slate-700">
            <Filter className="text-slate-300" />
          </button>

          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/40">
              <th className="p-5 text-left text-slate-400">#</th>
              <th className="p-5 text-left text-slate-400">Object</th>
              <th className="p-5 text-left text-slate-400">Confidence</th>
              <th className="p-5 text-left text-slate-400">Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-slate-500"
                >
                  No detections yet.
                  <br />
                  Upload an image and run AI detection.
                </td>
              </tr>
            ) : (
              filtered.map((d, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-800 transition hover:bg-slate-800/40"
                >
                  <td className="p-5 font-semibold text-white">
                    {index + 1}
                  </td>

                  <td className="p-5">
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-medium text-white ${badgeColor(
                        d.label
                      )}`}
                    >
                      {d.label ?? "Unknown"}
                    </span>
                  </td>

                  <td className="w-[340px] p-5">
                    <div className="flex items-center gap-4">
                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className={`h-full rounded-full ${confidenceColor(
                            d.confidence ?? 0
                          )}`}
                          style={{
                            width: `${(d.confidence ?? 0) * 100}%`,
                          }}
                        />
                      </div>

                      <span className="min-w-[60px] font-semibold text-white">
                        {((d.confidence ?? 0) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-400"
                      />

                      <span className="text-sm font-medium text-emerald-300">
                        Verified
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}