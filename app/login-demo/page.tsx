'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginModal } from '@/components/LoginModal';
import { useAuth } from '@/src/hooks/useAuth';
import Link from 'next/link';

export default function LoginDemoPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    // The login modal will close automatically and auth state will update
    // We can show a success message or redirect
    alert('Login successful! Welcome back!');
  };

  const handleLogout = async () => {
    await logout();
    alert('Logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
        <h1 className="
          font-roboto-condensed font-bold text-3xl sm:text-4xl
          text-[#0f172a]
          text-center
          mb-4
        ">
          Kasazon Login Demo
        </h1>

        <p className="
          font-poppins text-sm sm:text-base text-[#64748b]
          text-center
          mb-6
        ">
          Click the button below to test the login modal with real functionality
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="font-poppins text-sm text-green-800 text-center">
            ✅ <strong>Login is also integrated in the header!</strong><br/>
            Go to any page (e.g., <Link href="/" className="text-[#02368c] underline">Home</Link>) and click the "Login" button in the header.
          </p>
        </div>

        {/* Auth Status Display */}
        {isAuthenticated && user && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="font-poppins text-sm text-green-800 text-center">
              <strong>Logged in as:</strong> {user.fullName || user.phone || user.email || 'User'}
            </p>
            <button
              onClick={handleLogout}
              className="
                w-full mt-3
                bg-red-600
                h-[44px]
                rounded-lg
                font-roboto-condensed font-medium text-base text-white
                hover:bg-red-700 transition-colors
              "
            >
              Logout
            </button>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setShowLogin(true)}
            className="
              w-full
              bg-[#02368c]
              h-[56px]
              rounded-lg
              font-roboto-condensed font-medium text-lg text-white
              hover:bg-[#024189] transition-colors
            "
          >
            {isAuthenticated ? 'Open Login Modal (Already Logged In)' : 'Open Login Modal'}
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-roboto-condensed font-semibold text-lg text-[#0f172a] mb-2">
              Test Features:
            </h3>
            <ul className="font-poppins text-sm text-[#64748b] space-y-2">
              <li>✅ Full name input with validation</li>
              <li>✅ Language selector dropdown (8 languages: English, Spanish, French, German, Chinese, Arabic, Portuguese, Hindi)</li>
              <li>✅ Country code selector (+233, +234, +1, +44, +91)</li>
              <li>✅ Phone number input (numbers only)</li>
              <li>✅ Form validation with error messages</li>
              <li>✅ OTP verification modal (use code: <strong>123456</strong>)</li>
              <li>✅ Social login buttons (Google, Apple, Facebook)</li>
              <li>✅ Terms & Privacy links</li>
              <li>✅ Fully responsive design</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-roboto-condensed font-semibold text-lg text-yellow-900 mb-2">
              🧪 How to Test:
            </h3>
            <ol className="font-poppins text-sm text-yellow-800 space-y-2 list-decimal list-inside">
              <li>Enter any name (e.g., "John Doe")</li>
              <li>Select a language from dropdown</li>
              <li>Select country code (default: +233)</li>
              <li>Enter phone number (e.g., "544123456")</li>
              <li>Click "Login" button</li>
              <li>Enter OTP: <strong>123456</strong> in the popup</li>
              <li>See success message!</li>
            </ol>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
