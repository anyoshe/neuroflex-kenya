"use client";

import { useState, useEffect } from "react";
import { getInquiries, updateInquiryStatus } from "@/lib/actions/admin";
import {
  Phone, Mail, Calendar, Clock, User, MapPin, Stethoscope,
  MessageSquare, RefreshCw, CheckCircle
} from "lucide-react";

type Inquiry = {
  id: number;
  name: string;
  age?: number | null;
  sex?: string | null;
  phone: string;
  residence?: string | null;
  email?: string | null;
  service?: string | null;
  conditionCause?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  message?: string | null;
  status: string;
  createdAt: string | Date | null;
  reportNo?: string | null;
  reportedAt?: string | null;
};


type Props = {
  onGenerateReport: (inquiry: Inquiry) => void;
};

export default function InquiriesPanel({
  onGenerateReport,
}: Props) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const data = await getInquiries();
      const formattedData: Inquiry[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        age: item.age,
        sex: item.sex,
        phone: item.phone || "",
        residence: item.residence,
        email: item.email,
        service: item.service,
        conditionCause: item.condition_cause || item.conditionCause,
        preferredDate: item.preferred_date || item.preferredDate,
        preferredTime: item.preferred_time || item.preferredTime,
        message: item.message,
        status: item.status || "pending",
        createdAt: item.createdAt || item.created_at,
      }));

      setInquiries(formattedData);
    } catch (error) {
      console.error("Failed to load inquiries:", error);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    const result = await updateInquiryStatus(id, status);
    if (result.success) {
      loadInquiries();
    }
  };

  function handleGenerateReport(inquiry: Inquiry) {
    onGenerateReport(inquiry);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";

      case "contacted":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";

      case "reported":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "completed":
        return "bg-purple-100 text-purple-700 border-purple-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl shadow-xl p-6 md:p-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">
            Patient Inquiries & Bookings
          </h2>
          <p className="text-brand-green mt-1">
            Total Inquiries: <span className="font-semibold text-brand-navy">{inquiries.length}</span>
          </p>
        </div>

        <button
          onClick={loadInquiries}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-brand-teal text-brand-teal hover:bg-brand-teal/5 rounded-2xl font-medium transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-navy text-white">
              <tr>
                <th className="px-6 py-5 text-left font-semibold">Date</th>
                <th className="px-6 py-5 text-left font-semibold">Patient</th>
                <th className="px-6 py-5 text-left font-semibold">Contact</th>
                <th className="px-6 py-5 text-left font-semibold">Service</th>
                <th className="px-6 py-5 text-left font-semibold">Preferred</th>
                <th className="px-6 py-5 text-left font-semibold">Condition</th>
                <th className="px-6 py-5 text-left font-semibold">Status</th>
                <th className="px-6 py-5 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-brand-teal/5 transition-colors">
                  <td className="px-6 py-5 text-sm whitespace-nowrap text-gray-600">
                    {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-semibold text-gray-900">{inq.name}</div>
                    {inq.age && (
                      <div className="text-sm text-gray-500">
                        {inq.age} years • {inq.sex}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <a href={`tel:${inq.phone}`} className="hover:text-brand-teal font-medium">
                      {inq.phone}
                    </a>
                    {inq.email && <div className="text-xs text-gray-500 truncate mt-1">{inq.email}</div>}
                  </td>
                  <td className="px-6 py-5 font-medium text-brand-navy">{inq.service || "—"}</td>
                  <td className="px-6 py-5 text-sm">
                    {inq.preferredDate && (
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-brand-teal" />
                        {new Date(inq.preferredDate).toLocaleDateString()}
                      </div>
                    )}
                    {inq.preferredTime && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                        <Clock size={16} />
                        {inq.preferredTime}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 max-w-md line-clamp-2">
                    {inq.conditionCause || "—"}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-block px-4 py-1 rounded-full text-xs font-medium border ${getStatusColor(inq.status)}`}>
                      {inq.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    {inq.status === "pending" ? (
                      <button
                        onClick={() => handleStatusChange(inq.id, "contacted")}
                        className="flex items-center gap-2 mx-auto text-emerald-600 hover:text-emerald-700 font-medium px-5 py-2 rounded-2xl hover:bg-emerald-50"
                      >
                        <CheckCircle size={18} />
                        Mark Contacted
                      </button>
                    ) : inq.status === "contacted" ? (
                      <button
                        onClick={() => onGenerateReport(inq)}
                        className="mx-auto px-5 py-2 rounded-2xl bg-brand-navy text-white hover:bg-brand-navy/90"
                      >
                        Generate Report
                      </button>
                    ) : (
                      <span className="text-blue-600 font-semibold">
                        ✓ Report Generated
                      </span>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {inquiries.length === 0 && !loading && (
          <div className="p-16 text-center">
            <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-400">No inquiries yet</p>
          </div>
        )}
      </div>

      {/* Mobile Cards - Beautiful & Clean */}
      <div className="md:hidden space-y-5">
        {inquiries.map((inq) => (
          <div key={inq.id} className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="font-bold text-xl text-gray-900">{inq.name}</h3>
                {inq.age && (
                  <p className="text-sm text-gray-500">
                    {inq.age} years • {inq.sex} • {inq.residence || "N/A"}
                  </p>
                )}
              </div>
              <span className={`px-4 py-1.5 rounded-2xl text-xs font-semibold border ${getStatusColor(inq.status)}`}>
                {inq.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-brand-teal/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-brand-teal" />
                </div>
                <a href={`tel:${inq.phone}`} className="font-medium hover:text-brand-teal">{inq.phone}</a>
              </div>

              {inq.email && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-brand-teal/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-brand-teal" />
                  </div>
                  <a href={`mailto:${inq.email}`} className="hover:text-brand-teal break-all">{inq.email}</a>
                </div>
              )}

              {inq.service && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-brand-teal/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Stethoscope size={18} className="text-brand-teal" />
                  </div>
                  <span><strong>Service:</strong> {inq.service}</span>
                </div>
              )}

              {(inq.preferredDate || inq.preferredTime) && (
                <div className="flex items-center gap-3 bg-emerald-50 p-4 rounded-2xl">
                  <Calendar size={20} className="text-emerald-600" />
                  <div>
                    {inq.preferredDate && new Date(inq.preferredDate).toLocaleDateString()}
                    {inq.preferredTime && ` • ${inq.preferredTime}`}
                  </div>
                </div>
              )}

              {inq.conditionCause && (
                <div className="text-sm bg-gray-50 p-4 rounded-2xl border-l-4 border-brand-teal">
                  <strong>Condition:</strong> {inq.conditionCause}
                </div>
              )}

              {inq.message && (
                <div className="bg-gray-50 p-5 rounded-2xl text-sm leading-relaxed border-l-4 border-gray-300">
                  <MessageSquare size={18} className="inline mr-2 text-gray-400" />
                  {inq.message}
                </div>
              )}
            </div>

            {inq.status === "pending" ? (
              <button
                onClick={() => handleStatusChange(inq.id, "contacted")}
                className="flex items-center gap-2 mx-auto text-emerald-600 hover:text-emerald-700 font-medium px-5 py-2 rounded-2xl hover:bg-emerald-50"
              >
                <CheckCircle size={18} />
                Mark Contacted
              </button>
            ) : inq.status === "contacted" ? (
              <button
                onClick={() => onGenerateReport(inq)}
                className="mx-auto px-5 py-2 rounded-2xl bg-brand-navy text-white hover:bg-brand-navy/90"
              >
                Generate Report
              </button>
            ) : (
              <span className="text-blue-600 font-semibold">
                ✓ Report Generated
              </span>
            )}
          </div>
        ))}

        {inquiries.length === 0 && !loading && (
          <div className="bg-white rounded-3xl p-16 text-center shadow">
            <MessageSquare size={72} className="mx-auto text-gray-200 mb-6" />
            <p className="text-gray-400 text-lg">No patient inquiries yet</p>
          </div>
        )}
      </div>
    </div>
  );
}