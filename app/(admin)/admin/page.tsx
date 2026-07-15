"use client";
import { useEffect, useState } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { validateAdminToken } from "@/lib/actions/admin";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const isValid = await validateAdminToken(token);
        setIsLoggedIn(isValid);

        if (!isValid) {
          localStorage.removeItem("adminToken");
        }
      } catch {
        localStorage.removeItem("adminToken");
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    void checkAuth();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-lg">Verifying session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}
