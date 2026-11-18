'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SearchBar } from '../common/SearchBar';
import { Badge } from '../common/Badge';

export interface HeroProps {
  className?: string;
}

const valueBadges = [
  {
    icon: '/images/icons/badge-verified.svg',
    text: 'Verified Professionals',
  },
  {
    icon: '/images/icons/badge-pricing.svg',
    text: 'Transparent Pricing',
  },
  {
    icon: '/images/icons/badge-payment.svg',
    text: 'Secure Payments',
  },
  {
    icon: '/images/icons/badge-schedule.svg',
    text: 'Flexible Scheduling',
  },
];

export function Hero({ className = '' }: HeroProps) {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className={`relative min-h-[600px] lg:min-h-[807px] bg-[#dfdcd5] ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-background.png"
          alt="Professional service worker"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent lg:w-4/5" />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[600px] lg:min-h-[807px]">
        <div className="w-full px-6 sm:px-12 lg:px-24 py-10">
          <div className="w-full lg:w-1/2">
            {/* Heading */}
            <h1 className="
              font-roboto-condensed font-medium text-white
              text-3xl sm:text-4xl lg:text-5xl xl:text-[56px]
              leading-tight mb-4 lg:mb-6
            ">
              Trusted Services.
              <br />
              Right at Your Doorstep.
            </h1>

            {/* Description */}
            <p className="
              font-poppins text-[#c5c3c3]
              text-sm lg:text-base
              leading-normal mb-6 lg:mb-8
            ">
              Book trusted professionals for cleaning, repairs, maintenance,
              painting, and more—all in one place.
            </p>

            {/* Search Bar */}
            <div className="mb-8 lg:mb-12">
              <SearchBar
                placeholder="Search your service"
                onSearch={handleSearch}
                className="w-full max-w-md"
              />
            </div>

            {/* Value Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {valueBadges.map((badge, index) => (
                <Badge
                  key={index}
                  icon={badge.icon}
                  text={badge.text}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
