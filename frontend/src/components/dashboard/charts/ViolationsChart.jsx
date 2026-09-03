import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import {
  BarChart3,
  ShieldCheck,
} from "lucide-react";

import { getDashboardSummary } from "@/services/dashboardService";

export default function ViolationsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadChart() {
      try {
        const summary = await getDashboardSummary();

        const stats = summary.stats || {};

        setData([
          {
            name: "Helmet",
            value: stats.helmet || 0,
          },
          {
            name: "Vest",
            value: stats.vest || 0,
          },
          {
            name: "Gloves",
            value: stats.gloves || 0,
          },
          {
            name: "Goggles",
            value: stats.goggles || 0,
          },
          {
            name: "Boots",
            value: stats.boots || 0,
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    }

    loadChart();
  }, []);

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data]
  );

  const colors = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#a855f7",
    "#ef4444",
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-600/20 p-3">

              <BarChart3
                className="text-blue-400"
                size={24}
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                PPE Detection Summary
              </h2>

              <p className="text-sm text-slate-400">
                Equipment compliance overview
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3">

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={18}
              className="text-emerald-400"
            />

            <span className="text-sm text-emerald-300">
              Total: {total}
            </span>

          </div>

        </div>

      </div>

      {/* Chart */}

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{ fill: "#1e293b55" }}
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "14px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              animationDuration={900}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Footer Stats */}

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="rounded-2xl bg-slate-800/60 p-4 text-center"
          >

            <div
              className="mx-auto mb-3 h-3 w-3 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />

            <p className="text-sm text-slate-400">
              {item.name}
            </p>

            <p className="mt-1 text-xl font-bold text-white">
              {item.value}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}