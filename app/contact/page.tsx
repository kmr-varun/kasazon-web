'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { Button } from '@/src/components/common/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Implement form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Contact Form Section */}
        <section className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-[100px] bg-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Left Side - Form */}
            <div className="w-full lg:w-auto flex flex-col gap-10 lg:max-w-[621px]">
              <h1 className="font-roboto-condensed font-normal text-[#02368c] text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.5]">
                Got any Questions? Get in Touch
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-[10px]">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name*"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#f8f8f8] rounded-lg px-4 py-4 font-poppins text-sm text-[#9c9c9c] placeholder:text-[#9c9c9c] focus:outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone no."
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#f8f8f8] rounded-lg px-4 py-4 font-poppins text-sm text-[#9c9c9c] placeholder:text-[#9c9c9c] focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#f8f8f8] rounded-lg px-4 py-4 font-poppins text-sm text-[#9c9c9c] placeholder:text-[#9c9c9c] focus:outline-none transition-colors"
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#f8f8f8] rounded-lg px-4 py-4 font-poppins text-sm text-[#9c9c9c] placeholder:text-[#9c9c9c] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-[222px]"
                >
                  Submit
                </Button>
              </form>
            </div>

            {/* Right Side - Image */}
            <div className="relative w-full lg:w-[838px] h-[400px] lg:h-[522px] rounded-[18px] overflow-hidden flex-shrink-0">
              <Image
                src="/images/contact/contact-hero.png"
                alt="Happy customers using home services"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-[100px] bg-[#f2f3f9]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Address Card */}
            <div className="bg-white rounded-[14px] p-8 flex flex-col items-center gap-7">
              <div className="relative w-8 h-10">
                <Image
                  src="/images/contact/location-icon.svg"
                  alt="Location"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-poppins text-[18px] text-[#616161] text-center leading-[1.4]">
                8-A light industrial area, Opposite CAZRY, ITI Road, JODHPUR
              </p>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-[14px] p-8 flex flex-col items-center gap-7">
              <div className="relative w-[52px] h-10">
                <Image
                  src="/images/contact/email-icon.svg"
                  alt="Email"
                  fill
                  className="object-contain"
                />
              </div>
              <a
                href="mailto:care@kasazon.in"
                className="font-poppins text-[18px] text-[#616161] text-center leading-[1.4] hover:text-[#02368c] transition-colors"
              >
                care@kasazon.in
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-[14px] p-8 flex flex-col items-center gap-7">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/contact/phone-icon.svg"
                  alt="Phone"
                  fill
                  className="object-contain"
                />
              </div>
              <a
                href="tel:+919876543210"
                className="font-poppins text-[18px] text-[#616161] text-center leading-[1.4] hover:text-[#02368c] transition-colors"
              >
                +91 98765 43210
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
