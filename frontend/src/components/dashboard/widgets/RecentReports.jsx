import {
  FileText,
  Eye,
  Download,
  Calendar,
  CheckCircle2,
} from "lucide-react";

const API = "http://127.0.0.1:8000";

export default function RecentReports({ summary }) {
  const reports = summary.recent_reports || [];

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-600/20 p-3">

            <FileText
              className="text-blue-400"
              size={24}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Recent Reports
            </h2>

            <p className="text-sm text-slate-400">
              Latest AI inspection reports
            </p>

          </div>

        </div>

        <div className="rounded-full bg-blue-500/10 px-4 py-2">

          <span className="text-sm font-semibold text-blue-300">
            {reports.length} Reports
          </span>

        </div>

      </div>

      {reports.length === 0 ? (

        <div className="flex h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700">

          <FileText
            size={60}
            className="mb-5 text-slate-600"
          />

          <h3 className="text-xl font-semibold text-white">
            No Reports Available
          </h3>

          <p className="mt-2 text-slate-400">
            Inspection reports will appear here after AI analysis.
          </p>

        </div>

      ) : (

        <div className="max-h-[520px] space-y-5 overflow-y-auto pr-2">

          {reports.map((report, index) => (

            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:border-blue-500 hover:bg-slate-900"
            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="min-w-0">

                  <div className="flex items-center gap-3">

                    <FileText
                      size={20}
                      className="text-blue-400"
                    />

                    <h3 className="break-all text-lg font-semibold text-white">
                      {report.name}
                    </h3>

                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">

                    <div className="flex items-center gap-2">

                      <Calendar size={15} />

                      {report.time}

                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1">

                      <CheckCircle2
                        size={15}
                        className="text-emerald-400"
                      />

                      <span className="text-emerald-300">
                        Generated
                      </span>

                    </div>

                  </div>

                </div>

                <div className="flex flex-wrap gap-3">

                  <a
                    href={`${API}${report.path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                  >

                    <Eye size={18} />

                    View

                  </a>

                  <a
                    href={`${API}${report.path}`}
                    download
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
                  >

                    <Download size={18} />

                    Download

                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}