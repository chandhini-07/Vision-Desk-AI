import {
  LayoutDashboard,
  Camera,
  BookOpen,
  Bot,
  BarChart3,
  FileText,
  User,
  ShieldCheck,
  X,
  Activity,
  ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, title: "Dashboard", path: "/dashboard" },
  { icon: Camera, title: "AI Detection", path: "/detect" },
  { icon: BookOpen, title: "Knowledge Base", path: "/upload" },
  { icon: Bot, title: "AI Assistant", path: "/chat" },
  { icon: BarChart3, title: "Analytics", path: "/analytics" },
  { icon: FileText, title: "Reports", path: "/reports" },
  { icon: User, title: "My Profile", path: "/profile" },
];

export default function Sidebar({ open = false, onClose = () => {} }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[18rem] max-w-[88vw] flex-col border-r border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-black transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}

        <div className="border-b border-slate-800 p-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3 shadow-lg shadow-blue-600/40">

                <ShieldCheck className="text-white" size={28} />

              </div>

              <div>

                <h1 className="text-2xl font-black text-white">
                  VisionDesk
                </h1>

                <p className="text-sm text-blue-400">
                  AI Platform
                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            >
              <X size={20} />
            </button>

          </div>

        </div>

        {/* User Card */}

        <div className="m-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-bold text-white">

              {(user.name || "U").charAt(0).toUpperCase()}

            </div>

            <div className="min-w-0">

              <p className="truncate font-semibold text-white">
                {user.name || "User"}
              </p>

              <p className="truncate text-sm text-slate-400">
                {user.email || ""}
              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 px-4">

          {menuItems.map(({ icon: Icon, title, path }) => (

            <NavLink
              key={title}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <div className="flex items-center gap-3">

                <Icon size={20} />

                <span>{title}</span>

              </div>

              <ChevronRight
                size={18}
                className="opacity-0 transition group-hover:opacity-100"
              />

            </NavLink>

          ))}

        </nav>

        {/* Bottom */}

        <div className="border-t border-slate-800 p-5">

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">

            <div className="flex items-center gap-3">

              <Activity
                size={20}
                className="text-emerald-400"
              />

              <div>

                <h3 className="font-semibold text-white">
                  System Status
                </h3>

                <p className="text-sm text-emerald-300">
                  All services online
                </p>

              </div>

            </div>

          </div>

          <div className="mt-4 rounded-2xl bg-slate-800 p-4">

            <p className="text-sm text-slate-400">
              VisionDesk AI
            </p>

            <p className="mt-1 font-bold text-white">
              Enterprise Edition
            </p>

            <p className="mt-2 text-xs text-slate-500">
              AI Powered Workplace Safety Platform
            </p>

          </div>

        </div>

      </aside>
    </>
  );
}