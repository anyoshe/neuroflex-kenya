"use client";

import { useEffect, useState } from "react";
import { Menu, X, LogOut, Home, FileText, PlusCircle, Users, Receipt, Bell } from "lucide-react";
import Link from "next/link";
import Logo from "../Logo";
import { getReports } from "@/lib/actions/admin";

import InquiriesPanel from "./InquiriesPanel";
import ReportBuilder from "./ReportBuilder";
import ReportsHistory from "./ReportsHistory";
import InvoicesPanel from "./InvoicesPanel";

type Report = {
  id: number;
  report_no: string;
  patient_name: string;
  age: number;
  sex: string;
  reporting_date: string;

  residence: string | null;
  tel: string | null;
  next_of_kin: string | null;

  presenting_history: string | null;
  assessment_findings: string | null;
  intervention: string | null;
  review: string | null;

  created_at: string;

  inquiry_id?: number;

  invoiced: boolean;
  invoice_id: number | null;
};

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "inquiries" | "new-report" | "reports" | "invoices"
  >("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [prefillReport, setPrefillReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleGenerateReportFromInquiry = (inquiry: any) => {
    setPrefillReport({
      inquiry_id: inquiry.id,
      patient_name: inquiry.name,
      age: inquiry.age,
      sex: inquiry.sex,
      residence: inquiry.residence,
      tel: inquiry.phone,
      reporting_date: new Date().toISOString().split("T")[0],
      next_of_kin: "",
      presenting_history: inquiry.conditionCause ?? "",
      assessment_findings: "",
      intervention: "",
      review: "",
    });
    setActiveTab("new-report");
    setIsSidebarOpen(false);
  };

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
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "inquiries", label: "Inquiries", icon: Users },
    { key: "new-report", label: "New Report", icon: PlusCircle },
    { key: "reports", label: "Reports History", icon: FileText },
    { key: "invoices", label: "Invoices", icon: Receipt },
  ] as const;

  const handleTabClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
    if (tab === "new-report") {
      setEditingReport(null);
      setPrefillReport(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-[280px]
shrink-0 bg-white border-r shadow-xl 
        transition-transform duration-300 flex flex-col`}>

        <div className="p-6 border-b flex items-center gap-3">
          <Link href="#" aria-label="Neuroflex Kenya Admin">
            <Logo size="small" />
          </Link>
          <span className="font-semibold text-xl tracking-tight text-brand-navy"></span>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => handleTabClick(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all
                  ${activeTab === item.key
                    ? "bg-brand-navy text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-700"}`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t mt-auto">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl font-medium transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-3 rounded-2xl hover:bg-gray-100"
              >
                {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
              </button>

              <div>

                <h1 className="text-2xl font-bold text-brand-navy">
                  Admin Dashboard
                </h1>

                <p className="text-sm text-gray-500">
                  Neuroflex Kenya Management System
                </p>

              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
                <input
                  type="text"
                  placeholder="Search reports, patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-sm"
                />
              </div>

              {/* Notifications */}
              <button className="p-3 hover:bg-gray-100 rounded-2xl relative">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User */}
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">neuroflex.co.ke</p>
                </div>
                <div className="w-9 h-9 bg-brand-navy text-white rounded-full flex items-center justify-center font-semibold">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        {/* <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 md:px-8 py-8 overflow-auto"> */}
        <main className="flex-1 min-w-0 px-6 lg:px-8 py-8 overflow-y-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Quick Stats Cards */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border">
                  <p className="text-gray-500 text-sm">Total Reports</p>
                  <p className="text-4xl font-semibold mt-2 text-brand-navy">{reports.length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border">
                  <p className="text-gray-500 text-sm">Pending Inquiries</p>
                  <p className="text-4xl font-semibold mt-2 text-amber-600">12</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border">
                  <p className="text-gray-500 text-sm">This Month</p>
                  <p className="text-4xl font-semibold mt-2 text-emerald-600">28</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border">
                  <p className="text-gray-500 text-sm">Avg. Response Time</p>
                  <p className="text-4xl font-semibold mt-2">2.4d</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border">
                <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleTabClick("new-report")}
                    className="p-8 border-2 border-dashed border-gray-200 hover:border-brand-navy rounded-3xl flex flex-col items-center justify-center hover:bg-gray-50 transition-all group"
                  >
                    <PlusCircle size={48} className="text-brand-navy mb-4 group-hover:scale-110 transition-transform" />
                    <p className="font-medium">Create New Report</p>
                  </button>

                  <button
                    onClick={() => handleTabClick("inquiries")}
                    className="p-8 border-2 border-dashed border-gray-200 hover:border-brand-navy rounded-3xl flex flex-col items-center justify-center hover:bg-gray-50 transition-all group"
                  >
                    <Users size={48} className="text-brand-navy mb-4 group-hover:scale-110 transition-transform" />
                    <p className="font-medium">View Inquiries</p>
                  </button>

                  <button
                    onClick={() => handleTabClick("reports")}
                    className="p-8 border-2 border-dashed border-gray-200 hover:border-brand-navy rounded-3xl flex flex-col items-center justify-center hover:bg-gray-50 transition-all group"
                  >
                    <FileText size={48} className="text-brand-navy mb-4 group-hover:scale-110 transition-transform" />
                    <p className="font-medium">Browse Reports</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "inquiries" && (
            <InquiriesPanel onGenerateReport={handleGenerateReportFromInquiry} />
          )}

          {activeTab === "new-report" && (
            <ReportBuilder
              editingReport={editingReport}
              prefillReport={prefillReport}
              onUpdated={() => {
                setEditingReport(null);
                setPrefillReport(null);
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

          {activeTab === "invoices" && <InvoicesPanel />}
        </main>
      </div>
    </div>
  );
}