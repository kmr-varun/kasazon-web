'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '../common/Logo';
import { NavLink } from '../common/NavLink';
import { Button } from '../common/Button';
import { LoginModal } from '@/components/LoginModal';
import { useAuth } from '@/src/hooks/useAuth';

export interface HeaderProps {
  className?: string;
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Offers', href: '/offers' },
  { label: 'Contact', href: '/contact' },
];

export function Header({ className = '' }: HeaderProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLoginSuccess = () => {
    console.log('User logged in successfully');
    // Modal will close automatically, user state will update via useAuth
  };

  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout();
    router.push('/');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.fullName) return '?';
    const names = user.fullName.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  return (
    <header className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-5">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-16 mx-8">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth Section - Desktop */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {isLoading ? (
              <div className="w-[100px] h-[44px] bg-gray-100 rounded-lg animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 rounded-full bg-[#02368c] flex items-center justify-center text-white font-roboto-condensed font-semibold text-sm">
                    {getUserInitials()}
                  </div>
                  <span className="font-poppins text-sm text-[#0f172a] max-w-[120px] truncate">
                    {user.fullName || 'User'}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <a
                        href="/account"
                        className="block px-4 py-2 text-sm text-[#0f172a] hover:bg-gray-50 font-poppins"
                      >
                        My Profile
                      </a>
                      <a
                        href="/bookings"
                        className="block px-4 py-2 text-sm text-[#0f172a] hover:bg-gray-50 font-poppins"
                      >
                        My Bookings
                      </a>
                      <a
                        href="/settings"
                        className="block px-4 py-2 text-sm text-[#0f172a] hover:bg-gray-50 font-poppins"
                      >
                        Settings
                      </a>
                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-poppins"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => router.push('/register')}
                >
                  Register
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4 mt-4">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-6">
              {isLoading ? (
                <div className="w-full h-[44px] bg-gray-100 rounded-lg animate-pulse" />
              ) : isAuthenticated && user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-10 h-10 rounded-full bg-[#02368c] flex items-center justify-center text-white font-roboto-condensed font-semibold text-sm">
                      {getUserInitials()}
                    </div>
                    <span className="font-poppins text-sm text-[#0f172a]">
                      {user.fullName || 'User'}
                    </span>
                  </div>
                  <a
                    href="/account"
                    className="block px-4 py-2 text-sm text-[#0f172a] hover:bg-gray-50 font-poppins rounded-lg"
                  >
                    My Profile
                  </a>
                  <a
                    href="/bookings"
                    className="block px-4 py-2 text-sm text-[#0f172a] hover:bg-gray-50 font-poppins rounded-lg"
                  >
                    My Bookings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-poppins rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    onClick={() => {
                      router.push('/register');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Register
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
}
