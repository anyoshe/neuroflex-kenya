"use client";
import { useState, useEffect } from "react";
import { getInquiries, updateInquiryStatus } from "@/lib/actions/admin";
import { Phone, Mail, Calendar, MessageSquare, RefreshCw } from "lucide-react";

type Inquiry = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  status: string | null;
  createdAt: string | Date | null;   // Changed to accept string from DB
};

export default function InquiriesPanel() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const data = await getInquiries();
      
      // Convert raw DB data to expected format
      const formattedData: Inquiry[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        phone: item.phone || "",
        email: item.email || null,
        message: item.message || "",
        status: item.status || "pending",
        createdAt: item.created_at || item.createdAt,   // Handle both possible field names
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
    const timeoutId = window.setTimeout(() => {
      void loadInquiries();
    }, 100);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    const result = await updateInquiryStatus(id, status);
    if (result.success) {
      loadInquiries();
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "contacted":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Patient Inquiries</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total: <span className="font-semibold">{inquiries.length}</span>
          </p>
        </div>
        <button 
          onClick={loadInquiries} 
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition disabled:opacity-50 w-fit"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : ""}
                  </td>
                  <td className="px-6 py-4 font-medium">{inq.name}</td>
                  <td className="px-6 py-4 text-sm">{inq.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{inq.message}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(inq.status)}`}>
                      {inq.status || "unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {inq.status !== "contacted" && (
                      <button
                        onClick={() => handleStatusChange(inq.id, "contacted")}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      >
                        Mark as Contacted
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {loading && (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            Loading inquiries...
          </div>
        )}
        
        {!loading && inquiries.map((inq) => (
          <div key={inq.id} className="bg-white rounded-xl shadow p-4 space-y-3">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{inq.name}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Calendar size={12} />
                  {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : ""}
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(inq.status)}`}>
                {inq.status || "unknown"}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <a href={`tel:${inq.phone}`} className="flex items-center gap-2 text-gray-700 hover:text-emerald-600">
                <Phone size={14} />
                {inq.phone}
              </a>
              {inq.email && (
                <a href={`mailto:${inq.email}`} className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 break-all">
                  <Mail size={14} />
                  {inq.email}
                </a>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <MessageSquare size={14} className="mt-0.5 flex-shrink-0" />
                <p className="break-words">{inq.message}</p>
              </div>
            </div>

            {inq.status !== "contacted" && (
              <button
                onClick={() => handleStatusChange(inq.id, "contacted")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium text-sm transition"
              >
                Mark as Contacted
              </button>
            )}
          </div>
        ))}
      </div>

      {inquiries.length === 0 && !loading && (
        <div className="bg-white rounded-xl p-12 text-center">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No inquiries yet</p>
          <p className="text-sm text-gray-400 mt-1">New patient inquiries will appear here</p>
        </div>
      )}
    </div>
  );
}