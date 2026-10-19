'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { LoginModal } from '@/components/LoginModal';
import { isAuthenticated } from '@/src/lib/auth';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(true);
  const redirectTo = searchParams.get('redirect') || '/';

  useEffect(() => {
    // If already authenticated, redirect
    if (isAuthenticated()) {
      router.replace(redirectTo);
    }
  }, [router, redirectTo]);

  const handleLoginSuccess = () => {
    setShowModal(false);
    router.replace(redirectTo);
  };

  const handleClose = () => {
    setShowModal(false);
    router.push('/');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Please log in to continue
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access this page.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#02368c] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#024189] transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
      <Footer />

      <LoginModal
        isOpen={showModal}
        onClose={handleClose}
        onLoginSuccess={handleLoginSuccess}
        redirectTo={redirectTo}
      />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
