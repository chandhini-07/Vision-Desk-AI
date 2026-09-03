import { useEffect, useState } from "react";
import {
  BarChart3,
  ShieldCheck,
  TriangleAlert,
  Camera,
  Activity,
  PieChart as PieIcon,
  TrendingUp,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getDashboardSummary } from "@/services/dashboardService";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
 YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#F97316",
];

function KPI({ icon: Icon, title, value, color }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl transition hover:-translate-y-1">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className={`mt-3 text-4xl font-black ${color}`}>
            {value}
          </h2>

        </div>

        <div className="rounded-2xl bg-slate-800 p-4">

          <Icon
            size={30}
            className={color}
          />

        </div>

      </div>

    </div>
  );
}

export default function Analytics() {

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboardSummary();
        setSummary({
           ...data.summary,
           stats: data.stats,
           latest: data.latest,
           history: data.history,
           recent_reports: data.recent_reports,
          });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const ppeData = summary?.stats
    ? Object.entries(summary.stats).map(([name, value]) => ({
        name: name.replace(/_/g, " "),
        value,
      }))
    : [];

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">

          <div className="text-center">

            <Activity
              className="mx-auto mb-6 animate-spin text-blue-400"
              size={60}
            />

            <h2 className="text-3xl font-bold text-white">
              Loading Analytics
            </h2>

            <p className="mt-3 text-slate-400">
              Fetching latest inspection statistics...
            </p>

          </div>

        </div>
      </DashboardLayout>
    );

  if (!summary)
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">

          <div className="text-center">

            <BarChart3
              className="mx-auto mb-6 text-slate-600"
              size={70}
            />

            <h2 className="text-3xl font-bold text-white">
              No Analytics Available
            </h2>

            <p className="mt-3 text-slate-400">
              Run an AI inspection to generate analytics.
            </p>

          </div>

        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}

        <div className="flex flex-wrap items-center justify-between gap-6">

          <div>

            <h1 className="text-4xl font-black text-white">
              Analytics Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              AI-powered workplace safety analytics
            </p>

          </div>

          <div className="rounded-full bg-blue-600/10 px-5 py-2">

            <span className="font-semibold text-blue-300">
              Latest Inspection
            </span>

          </div>

        </div>

        {/* KPI */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <KPI
            icon={ShieldCheck}
            title="Safety Score"
            value={`${summary.safety_score}%`}
            color="text-green-400"
          />

          <KPI
            icon={TriangleAlert}
            title="Violations"
            value={summary.violations}
            color="text-red-400"
          />

          <KPI
            icon={Camera}
            title="Workers"
            value={summary.workers}
            color="text-blue-400"
          />

          <KPI
            icon={TrendingUp}
            title="Risk"
            value={summary.risk}
            color={
              summary.risk === "HIGH"
                ? "text-red-400"
                : summary.risk === "MEDIUM"
                ? "text-yellow-400"
                : "text-green-400"
            }
          />

        </div>

        {/* Charts */}

        <div className="grid gap-8 xl:grid-cols-2">

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-6 flex items-center gap-3">

              <BarChart3 className="text-blue-400" />

              <h2 className="text-xl font-bold text-white">
                PPE Detection Breakdown
              </h2>

            </div>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart data={ppeData}>

                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8" }}
                />

                <YAxis
                  tick={{ fill: "#94a3b8" }}
                />

                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                  }}
                />

                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  fill="#3B82F6"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-6 flex items-center gap-3">

              <PieIcon className="text-cyan-400" />

              <h2 className="text-xl font-bold text-white">
                PPE Distribution
              </h2>

            </div>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie
                  data={ppeData}
                  outerRadius={110}
                  dataKey="value"
                  label
                >

                  {ppeData.map((_, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Legend />

                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* AI Assessment */}

        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-8">

          <h2 className="text-2xl font-bold text-white">
            AI Risk Assessment
          </h2>

          <div className="mt-6 flex flex-wrap items-center gap-5">

            <span
              className={`rounded-full px-6 py-3 text-lg font-bold ${
                summary.risk === "HIGH"
                  ? "bg-red-600/20 text-red-400"
                  : summary.risk === "MEDIUM"
                  ? "bg-yellow-600/20 text-yellow-400"
                  : "bg-green-600/20 text-green-400"
              }`}
            >
              {summary.risk}
            </span>

            <p className="max-w-2xl text-slate-300">

              {summary.risk === "HIGH"
                ? "Multiple PPE violations detected. Immediate corrective action is recommended."
                : summary.risk === "MEDIUM"
                ? "Moderate compliance observed. Additional monitoring is advised."
                : "Excellent PPE compliance detected. Continue maintaining current safety standards."}

            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}