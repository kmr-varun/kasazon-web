'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '../common/Button';

export interface CTABannerProps {
  className?: string;
}

export function CTABanner({ className = '' }: CTABannerProps) {
  const router = useRouter();

  const handleFindService = () => {
    router.push('/services');
  };

  const handleExploreServices = () => {
    router.push('/services');
  };

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        <div className="relative h-[300px] lg:h-[389px] rounded-3xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/cta-banner-bg.png"
              alt="Get things done"
              fill
              className="object-cover object-[80%_80%]"
              priority
            />
          </div>

          {/* Blue Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(2, 54, 140, 0.85) 0%, rgba(2, 54, 140, 0.7) 40%, rgba(2, 54, 140, 0) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center px-6 sm:px-12 lg:px-16">
            <div className="max-w-2xl">
              {/* Title and Description */}
              <div className="flex flex-col gap-3.5 mb-9">
                <h2 className="
                  font-montaga text-white
                  text-3xl sm:text-4xl lg:text-[45px]
                  leading-tight
                ">
                  Ready to Get Things Done?
                </h2>
                <p className="
                  font-poppins text-[#eaeaea]
                  text-base lg:text-lg
                  leading-relaxed
                ">
                  Find a trusted professional and book your service today.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={handleFindService}
                  className="
                    bg-white text-black
                    font-roboto-condensed font-medium uppercase tracking-[0.22em]
                    h-[51px] px-6 rounded-xl
                    hover:opacity-90 transition-opacity duration-200
                    text-[12.8px]
                  "
                >
                  Find a Service
                </button>
                <button
                  onClick={handleExploreServices}
                  className="
                    border-2 border-white text-white
                    font-roboto-condensed font-medium uppercase tracking-[0.22em]
                    h-[51px] px-6 rounded-xl
                    hover:bg-white/10 transition-colors duration-200
                    text-[12.8px]
                  "
                >
                  Explore Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
