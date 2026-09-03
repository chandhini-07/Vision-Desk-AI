import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {
  Menu,
  X,
  ShieldCheck,
  LayoutDashboard,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/detect", label: "Detection" },
  { to: "/upload", label: "Knowledge Base" },
  { to: "/analytics", label: "Analytics" },
  { to: "/reports", label: "Reports" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const pathname = location.pathname;

  const token = localStorage.getItem("token");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-blue-600 p-2">

            <ShieldCheck
              className="text-white"
              size={22}
            />

          </div>

          <div>

            <h1 className="text-xl font-bold text-white">

              VisionDesk AI

            </h1>

            <p className="text-xs text-slate-400">

              Workplace Intelligence

            </p>

          </div>

        </Link>

        <div className="hidden items-center gap-8 lg:flex">

          {NAV_LINKS.map((item) => (

            <Link
              key={item.to}
              to={item.to}
              className={`transition duration-300 hover:text-blue-400 ${
                pathname === item.to
                  ? "font-semibold text-blue-400"
                  : "text-slate-300"
              }`}
            >
              {item.label}
            </Link>

          ))}

        </div>

        <div className="hidden items-center gap-3 lg:flex">

          {token ? (

            <Button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl"
            >
              <LayoutDashboard
                size={18}
                className="mr-2"
              />
              Dashboard
            </Button>

          ) : (

            <>
              <Link to="/login">

                <Button
                  variant="outline"
                  className="rounded-xl"
                >
                  Login
                </Button>

              </Link>

              <Link to="/register">

                <Button className="rounded-xl">

                  <LogIn
                    size={18}
                    className="mr-2"
                  />

                  Get Started

                </Button>

              </Link>
            </>

          )}

        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl p-2 transition hover:bg-slate-800 lg:hidden"
        >
          {open ? (
            <X className="text-white" />
          ) : (
            <Menu className="text-white" />
          )}
        </button>

      </div>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="border-t border-slate-800 bg-slate-950 lg:hidden"
          >

            <div className="space-y-2 p-6">

              {NAV_LINKS.map((item) => (

                <Link
                  key={item.to}
                  to={item.to}
                  className={`block rounded-xl px-4 py-3 transition ${
                    pathname === item.to
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </Link>

              ))}

              {!token && (

                <>
                  <Link to="/login">

                    <Button
                      variant="outline"
                      className="mt-4 w-full"
                    >
                      Login
                    </Button>

                  </Link>

                  <Link to="/register">

                    <Button className="mt-2 w-full">

                      Get Started

                    </Button>

                  </Link>

                </>

              )}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.nav>
  );
}