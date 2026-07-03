"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { getReports } from "@/lib/actions/admin";

import InquiriesPanel from "./InquiriesPanel";
import ReportBuilder from "./ReportBuilder";
import ReportsHistory from "./ReportsHistory";

type Report = {
  id: number;
  report_no: string;
  patient_name: string;
  age: number;
  sex: string;
  reporting_date: string;
  residence: string | null
  tel: string | null;
  next_of_kin: string | null;
  presenting_history: string | null;
  assessment_findings: string | null;
  intervention: string | null;
  review: string | null;
  created_at: string;
};

export default function AdminDashboard({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<
    "inquiries" | "new-report" | "reports"
  >("new-report");

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [reports, setReports] =
    useState<Report[]>([]);

  const [editingReport, setEditingReport] =
    useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadReports() {
    try {
      setLoading(true);

      const data = await getReports();

      setReports(data as Report[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  const navItems = [
    {
      key: "inquiries",
      label: "Inquiries",
    },
    {
      key: "new-report",
      label: "New Report",
    },
    {
      key: "reports",
      label: "Reports History",
    },
  ] as const;

  function handleTabClick(
    tab: typeof activeTab
  ) {
    setActiveTab(tab);
    setIsMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">

          <div className="flex justify-between items-center">

            <h1 className="text-xl md:text-2xl font-bold">
              Neuroflex Admin
            </h1>

            {/* Desktop */}

            <div className="hidden md:flex gap-2 items-center">

              {navItems.map((item) => (

                <button
                  key={item.key}
                  onClick={() =>
                    handleTabClick(item.key)
                  }
                  className={`px-6 py-2.5 rounded-xl font-medium transition ${activeTab === item.key
                      ? "bg-emerald-600 text-white"
                      : "hover:bg-gray-100"
                    }`}
                >
                  {item.label}
                </button>

              ))}

              <button
                onClick={onLogout}
                className="ml-4 text-red-600 hover:text-red-700"
              >
                Logout
              </button>

            </div>

            {/* Mobile */}

            <button
              onClick={() =>
                setIsMenuOpen(!isMenuOpen)
              }
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>

          </div>

          {isMenuOpen && (

            <div className="md:hidden mt-4 border-t pt-4 space-y-2">

              {navItems.map((item) => (

                <button
                  key={item.key}
                  onClick={() =>
                    handleTabClick(item.key)
                  }
                  className={`w-full text-left px-4 py-3 rounded-xl ${activeTab === item.key
                      ? "bg-emerald-600 text-white"
                      : "hover:bg-gray-100"
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
                className="w-full text-left px-4 py-3 text-red-600"
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {activeTab === "inquiries" && (
          <InquiriesPanel />
        )}

        {activeTab === "new-report" && (
          <ReportBuilder
            editingReport={editingReport}
            onUpdated={() => {
              setEditingReport(null);
              loadReports();
            }}
          />
        )}

        {activeTab === "reports" && (
          <ReportsHistory
            reports={reports}
            loading={loading}
            onRefresh={loadReports}
            onEdit={(report) => {
              setEditingReport(report);
              setActiveTab("new-report");
            }}
          />
        )}

      </main>

    </div>
  );
}