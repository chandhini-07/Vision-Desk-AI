import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Sparkles,
  FileDown,
  LayoutDashboard,
  Loader2,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

import { uploadImage } from "@/services/uploadService";
import { detectLatest } from "@/services/detectionService";
import { generateReport } from "@/services/reportService";

import DetectionHeader from "@/components/detection/DetectionHeader";
import ImageComparison from "@/components/detection/ImageComparison";
import PPECards from "@/components/detection/PPECards";
import DetectionTable from "@/components/detection/DetectionTable";
import SafetyScore from "@/components/detection/SafetyScore";
import AIRecommendation from "@/components/detection/AIRecommendation";
import AIReport from "@/components/detection/AIReport";

const API_URL = "http://127.0.0.1:8000";

export default function Detection() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSelect(e) {
    const selected = e.target.files[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleUpload() {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);

    try {
      await uploadImage(file);

      const detection = await detectLatest();

      console.log("Detection Response:", detection);

      setResult({
        ...detection,

        workers_count:
          detection.workers_count ??
          detection.workers ??
          0,

        stats: detection.stats ?? {},

        detections: detection.detections ?? [],

        annotated_image:
          detection.annotated_image ?? "",

        ai_report:
          detection.ai_report ?? "",

        violations:
          detection.violations ?? 0,

        safety_score:
          detection.safety_score ?? 0,

        risk:
          detection.risk ?? "LOW",
      });

      window.dispatchEvent(
        new Event("visiondesk-refresh")
      );
    } catch (err) {
      console.error(err);
      alert("Detection failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadReport() {
    try {
      const report = await generateReport();

      window.open(
        `${API_URL}/${report.pdf}`,
        "_blank"
      );
    } catch (err) {
      console.error(err);
      alert("Failed to generate report.");
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">

        <DetectionHeader />

        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-xl">

          <div className="mb-8">

            <h2 className="text-2xl font-bold text-white">
              AI Detection Workspace
            </h2>

            <p className="mt-2 text-slate-400">
              Upload a workplace image to detect PPE compliance.
            </p>

          </div>

          <div className="flex flex-col gap-5 lg:flex-row">

            <label className="flex flex-1 cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800/40 p-6 hover:border-blue-500">

              <Upload
                className="text-blue-400"
                size={28}
              />

              <div>

                <p className="font-semibold text-white">
                  {file
                    ? file.name
                    : "Choose Image"}
                </p>

                <p className="text-sm text-slate-400">
                  PNG / JPG / JPEG
                </p>

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleSelect}
                className="hidden"
              />

            </label>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={20}
                  />
                  Detecting...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Upload & Detect
                </>
              )}
            </button>

            {result && (
              <>
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white hover:bg-emerald-700"
                >
                  <FileDown size={20} />
                  PDF Report
                </button>

                <button
                  onClick={() =>
                    navigate("/dashboard")
                  }
                  className="flex items-center gap-3 rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white hover:bg-violet-700"
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </button>
              </>
            )}

          </div>

          {preview && (

            <div className="mt-8">

              <img
                src={preview}
                alt="Preview"
                className="max-h-96 w-full rounded-2xl bg-black object-contain"
              />

            </div>

          )}

        </div>

        {loading && (

          <div className="rounded-3xl bg-blue-500/10 p-12 text-center">

            <Loader2
              className="mx-auto animate-spin text-blue-400"
              size={60}
            />

            <p className="mt-4 text-white">
              VisionDesk AI is analyzing the image...
            </p>

          </div>

        )}

        {result && (
          <>
            <ImageComparison
              original={preview}
              annotated={`${API_URL}${result.annotated_image}`}
            />

            <PPECards
              stats={result.stats}
              workers={result.workers_count}
              violations={result.violations}
            />

            <SafetyScore
              score={result.safety_score}
              risk={result.risk}
            />

            <AIRecommendation
              workers={result.workers_count}
              violations={result.violations}
              score={result.safety_score}
            />

            <AIReport
              report={result.ai_report}
            />

            <DetectionTable
              detections={result.detections}
            />
          </>
        )}

      </div>
    </DashboardLayout>
  );
}