import { useState } from "react";
import {
  Bot,
  Copy,
  Download,
  Check,
  Sparkles,
  FileText,
} from "lucide-react";

export default function AIReport({ report }) {
  const [copied, setCopied] = useState(false);

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  }

  function downloadReport() {
    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "VisionDesk_AI_Report.txt";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-600/20 p-4">

            <Bot
              size={30}
              className="text-blue-400"
            />

          </div>

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-2xl font-bold text-white">
                AI Safety Report
              </h2>

              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                Gemini AI
              </span>

            </div>

            <p className="mt-2 text-slate-400">
              Automatically generated workplace safety assessment.
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={copyReport}
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700"
          >

            {copied ? (
              <>
                <Check size={18} />
                Copied
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy
              </>
            )}

          </button>

          <button
            onClick={downloadReport}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >

            <Download size={18} />
            Download

          </button>

        </div>

      </div>

      {/* Summary */}

      <div className="grid gap-6 border-b border-slate-800 p-6 md:grid-cols-3">

        <div className="rounded-2xl bg-slate-900 p-5">

          <Sparkles
            className="mb-3 text-cyan-400"
            size={24}
          />

          <p className="text-sm text-slate-400">
            Analysis
          </p>

          <h3 className="mt-2 text-xl font-bold text-white">
            AI Generated
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-900 p-5">

          <FileText
            className="mb-3 text-blue-400"
            size={24}
          />

          <p className="text-sm text-slate-400">
            Report Type
          </p>

          <h3 className="mt-2 text-xl font-bold text-white">
            Workplace Safety
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-900 p-5">

          <Bot
            className="mb-3 text-emerald-400"
            size={24}
          />

          <p className="text-sm text-slate-400">
            Model
          </p>

          <h3 className="mt-2 text-xl font-bold text-white">
            Gemini AI
          </h3>

        </div>

      </div>

      {/* Report */}

      <div className="max-h-[550px] overflow-y-auto p-8">

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">

          <pre className="whitespace-pre-wrap font-sans text-[15px] leading-8 text-slate-200">
            {report}
          </pre>

        </div>

      </div>

    </section>
  );
}