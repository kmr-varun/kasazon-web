"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface VendorAuthWrapperProps {
  children: React.ReactNode;
}

export function VendorAuthWrapper({ children }: VendorAuthWrapperProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("kasazon_access_token");

      if (!token) {
        setError("Please log in to access the vendor dashboard");
        setIsAuthenticated(false);
        // Redirect to login after a short delay
        setTimeout(() => {
          router.push("/login?redirect=/vendor/dashboard");
        }, 2000);
        return;
      }

      // Check if user data exists and is a professional account
      const userData = localStorage.getItem("kasazon_user");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          if (user.accountType !== "PROFESSIONAL") {
            setError("Access denied. This area is for professional accounts only.");
            setIsAuthenticated(false);
            setTimeout(() => {
              router.push("/");
            }, 2000);
            return;
          }
        } catch {
          // Ignore parse errors
        }
      }

      setIsAuthenticated(true);
    };

    checkAuth();
  }, [router]);

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#02368c] border-t-transparent rounded-full animate-spin" />
          <p className="text-[14px] text-[#64748b]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (!isAuthenticated && error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-8 max-w-md text-center shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#fef2f2] rounded-full flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2
            className="text-[20px] font-medium text-[#0f172a] mb-2"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Access Denied
          </h2>
          <p className="text-[14px] text-[#64748b] mb-4" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
            {error}
          </p>
          <p className="text-[12px] text-[#94a3b8]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
