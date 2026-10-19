'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface FooterProps {
  className?: string;
}

const quickLinks = ['Home', 'Services', 'About', 'Offers', 'Contact'];
const professionalLinks = ['Become a Provider', 'Provider Login', 'Provider Benefits', 'How It Works'];
const policyLinks = ['Help Center', 'Privacy', 'Terms', 'FAQs'];

const socialLinks = [
  { icon: '/images/icons/instagram.svg', href: '#', label: 'Instagram' },
  { icon: '/images/icons/facebook.svg', href: '#', label: 'Facebook' },
  { icon: '/images/icons/twitter.svg', href: '#', label: 'Twitter' },
  { icon: '/images/icons/linkedin.svg', href: '#', label: 'LinkedIn' },
];

export function Footer({ className = '' }: FooterProps) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
    // TODO: Implement newsletter subscription
  };

  return (
    <footer className={`bg-[#02368c] text-white ${className}`}>
      {/* Newsletter Section - Top */}
      <div className="w-full px-6 sm:px-12 lg:px-24 pt-12 lg:pt-16 pb-8 lg:pb-10">
        <div className="max-w-7xl">
          <h2 className="
            font-roboto-condensed font-normal text-white
            text-3xl sm:text-4xl lg:text-[46px]
            leading-tight mb-5
          ">
            Trusted services, made simple.
          </h2>
          <p className="
            font-poppins text-[rgba(255,248,240,0.6)]
            text-base mb-8 lg:mb-10
          ">
            Book trusted professionals for cleaning, repairs, maintenance, beauty, painting, and more—all in one place.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-3 max-w-2xl">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="
                flex-1 h-14 rounded-full
                bg-[rgba(255,248,240,0.06)] border border-[rgba(255,248,240,0.2)]
                px-6
                text-white placeholder:text-[rgba(255,248,240,0.4)]
                font-poppins text-base
                focus:outline-none focus:border-[rgba(255,248,240,0.4)]
                transition-colors duration-200
              "
            />
            <button
              type="submit"
              className="
                bg-white text-[#02368c]
                font-roboto-condensed font-medium uppercase tracking-[0.22em]
                h-14 px-8 rounded-xl
                hover:opacity-90 transition-opacity duration-200
                text-sm flex-shrink-0
              "
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-6 sm:px-12 lg:px-24 py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
          {/* Company Info - Left Side */}
          <div className="lg:max-w-sm flex-shrink-0">
            <div className="relative w-[180px] h-[60px] mb-4">
              <Image
                src="/images/footer-logo.png"
                alt="Kasazon"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="w-20 h-px bg-[rgba(255,248,240,0.2)] my-4" />
            <p className="
              font-poppins text-xs text-white
              leading-normal mb-4
            ">
              Trusted professionals. Quality service.
            </p>
            <p className="
              font-poppins text-sm text-[rgba(245,245,245,0.62)]
              leading-relaxed mb-6
            ">
              From quick repairs to complete home projects, Kasazon connects you with trusted professionals for reliable service at your doorstep.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="relative w-4 h-4 mt-0.5 flex-shrink-0">
                  <Image
                    src="/images/icons/location.svg"
                    alt="Location"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="
                  font-poppins text-xs text-[rgba(255,248,240,0.7)]
                  leading-relaxed
                ">
                  8-A light industrial area, Opposite CAZRY, ITI Road, JODHPUR
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-4 h-4 flex-shrink-0">
                  <Image
                    src="/images/icons/email.svg"
                    alt="Email"
                    fill
                    className="object-contain"
                  />
                </div>
                <a
                  href="mailto:care@kasazon.in"
                  className="
                    font-poppins text-xs text-[rgba(255,248,240,0.7)]
                    hover:text-white transition-colors
                  "
                >
                  care@kasazon.in
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-4 h-4 flex-shrink-0">
                  <Image
                    src="/images/icons/phone.svg"
                    alt="Phone"
                    fill
                    className="object-contain"
                  />
                </div>
                <a
                  href="tel:+919876543210"
                  className="
                    font-poppins text-xs text-[rgba(255,248,240,0.7)]
                    hover:text-white transition-colors
                  "
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Columns - Right Side */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="
                font-roboto-condensed font-medium uppercase tracking-[0.18em]
                text-sm text-white mb-4
              ">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase()}`}
                      className="
                        font-poppins text-sm text-[rgba(255,248,240,0.7)]
                        hover:text-white transition-colors leading-normal
                      "
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Professionals */}
            <div>
              <h3 className="
                font-roboto-condensed font-medium uppercase tracking-[0.18em]
                text-sm text-white mb-4
              ">
                For Professionals
              </h3>
              <ul className="flex flex-col gap-3">
                {professionalLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="
                        font-poppins text-sm text-[rgba(255,248,240,0.7)]
                        hover:text-white transition-colors leading-normal
                      "
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="
                font-roboto-condensed font-medium uppercase tracking-[0.18em]
                text-sm text-white mb-4
              ">
                Policies
              </h3>
              <ul className="flex flex-col gap-3">
                {policyLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="
                        font-poppins text-sm text-[rgba(255,248,240,0.7)]
                        hover:text-white transition-colors leading-normal
                      "
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(255,248,240,0.1)]">
        <div className="w-full px-6 sm:px-12 lg:px-24 py-6 lg:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="
              font-poppins text-sm text-[#fff8f0]
              text-center sm:text-left
            ">
              © 2026 Kasazon. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="
                    w-10 h-10 rounded-full
                    border border-[#fff8f0]
                    flex items-center justify-center
                    hover:bg-white/10 transition-colors duration-200
                  "
                >
                  <div className="relative w-4 h-4">
                    <Image
                      src={social.icon}
                      alt={social.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
