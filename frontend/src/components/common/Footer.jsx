import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  VisionDesk AI
                </h2>

                <p className="text-sm text-slate-400">
                  Smart Workplace Safety Platform
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-7">
              AI-powered PPE detection, safety monitoring, analytics,
              intelligent reporting, and document assistance for modern
              industries.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Features
            </h3>

            <ul className="space-y-2 text-slate-400">
              <li>AI PPE Detection</li>
              <li>Safety Dashboard</li>
              <li>Incident Reports</li>
              <li>Analytics</li>
              <li>Document Intelligence</li>
              <li>AI Assistant</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>support@visiondesk.ai</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Visakhapatnam, India</span>
              </div>

            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-sm">
            © {year} VisionDesk AI. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-slate-400">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>

            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>

            <span className="hover:text-white cursor-pointer">
              Support
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}