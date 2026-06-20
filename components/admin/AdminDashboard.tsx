"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // npm install lucide-react
import InquiriesPanel from "./InquiriesPanel";
import ReportBuilder from "./ReportBuilder";
import ReportsHistory from "./ReportsHistory";

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<"inquiries" | "new-report" | "reports">("new-report");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: "inquiries", label: "Inquiries" },
    { key: "new-report", label: "New Report" },
    { key: "reports", label: "Reports History" },
  ] as const;

  const handleTabClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Close menu on mobile after click
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Neuroflex Admin</h1>

            {/* Desktop Nav - hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleTabClick(item.key)}
                  className={`px-6 py-2.5 rounded-xl font-medium transition ${
                    activeTab === item.key ? "bg-emerald-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={onLogout}
                className="ml-4 text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>

            {/* Hamburger - shown on mobile only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu - slide down when open */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleTabClick(item.key)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition ${
                    activeTab === item.key 
                      ? "bg-emerald-600 text-white" 
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-left px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {activeTab === "inquiries" && <InquiriesPanel />}
        {activeTab === "new-report" && <ReportBuilder />}
        {activeTab === "reports" && <ReportsHistory />}
      </main>
    </div>
  );
}
