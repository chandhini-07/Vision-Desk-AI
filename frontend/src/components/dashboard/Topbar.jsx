import { useEffect, useState } from "react";
import {
  Bell,
  Menu,
  Search,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/detect": "AI Detection",
  "/upload": "Knowledge Base",
  "/chat": "AI Assistant",
  "/analytics": "Analytics",
  "/reports": "Reports",
  "/profile": "My Profile",
};

export default function Topbar({ onMenuClick = () => {} }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">

      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div>

            <h1 className="text-2xl font-bold text-white">
              {PAGE_TITLES[pathname] || "Dashboard"}
            </h1>

            <p className="text-sm text-slate-400">
              Welcome back,
              <span className="ml-1 font-semibold text-blue-400">
                {user.name || "User"}
              </span>
            </p>

          </div>

        </div>

        {/* Center */}

        <div className="hidden xl:flex">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-80 rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none transition focus:border-blue-500"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <div className="hidden text-right lg:block">

            <p className="text-sm text-slate-400">
              {time.toLocaleDateString()}
            </p>

            <p className="font-semibold text-white">
              {time.toLocaleTimeString()}
            </p>

          </div>

          <div className="hidden items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 lg:flex">

            <ShieldCheck
              size={18}
              className="text-emerald-400"
            />

            <span className="text-sm font-medium text-emerald-300">
              System Online
            </span>

          </div>

          <button className="relative rounded-xl p-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">

            <Bell size={21} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

          </button>

          <div className="hidden text-right md:block">

            <p className="font-semibold text-white">
              {user.name || "User"}
            </p>

            <p className="text-xs text-slate-400">
              {user.email || ""}
            </p>

          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 font-bold text-white shadow-lg">

            {(user.name || "U").charAt(0).toUpperCase()}

          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
          >

            <LogOut size={18} />

            <span className="hidden sm:block">
              Logout
            </span>

          </button>

        </div>

      </div>

    </header>
  );
}