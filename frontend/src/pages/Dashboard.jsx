import { useEffect, useState } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

import KPICard from "@/components/dashboard/cards/KPICard";
import ViolationChart from "@/components/dashboard/charts/ViolationsChart";
import AIRecommendations from "@/components/dashboard/widgets/AIRecommendations";

import { getDashboardSummary } from "@/services/dashboardService";

import {
  ShieldCheck,
  TriangleAlert,
  Camera,
  FileText,
} from "lucide-react";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    workers: 0,
    violations: 0,
    safety_score: 0,
    reports: 0,
    stats: {},
    risk: "LOW",
  });

async function loadDashboard() {
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
  }
}

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(loadDashboard, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function refreshDashboard() {
      loadDashboard();
    }

    window.addEventListener(
      "visiondesk-refresh",
      refreshDashboard
    );

    return () => {
      window.removeEventListener(
        "visiondesk-refresh",
        refreshDashboard
      );
    };
  }, []);

  return (
    <DashboardLayout>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <KPICard
          title="Safety Score"
          value={`${summary.safety_score}%`}
          icon={ShieldCheck}
          color="text-green-500"
        />

        <KPICard
          title="Violations"
          value={summary.violations}
          icon={TriangleAlert}
          color="text-red-500"
        />

        <KPICard
          title="Workers"
          value={summary.workers}
          icon={Camera}
          color="text-blue-500"
        />

        <KPICard
          title="Reports"
          value={summary.reports}
          icon={FileText}
          color="text-yellow-500"
        />
      </div>

      {/* PPE Detection Summary */}
      <div className="mt-8">
        <ViolationChart summary={summary} />
      </div>

      {/* AI Safety Advisor */}
      <div className="mt-8">
        <AIRecommendations summary={summary} />
      </div>

    </DashboardLayout>
  );
}