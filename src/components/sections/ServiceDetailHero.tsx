'use client';

import Image from 'next/image';

export interface ServiceDetailHeroProps {
  image: string;
  rating: number;
  reviewCount: number;
  title: string;
  description: string;
  duration: string;
  warrantyText: string;
  onBookNow: () => void;
  className?: string;
}

export function ServiceDetailHero({
  image,
  rating,
  reviewCount,
  title,
  description,
  duration,
  warrantyText,
  onBookNow,
  className = '',
}: ServiceDetailHeroProps) {
  const handleShare = () => {
    console.log('Share clicked');
    // TODO: Implement share functionality
  };

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        <div className="max-w-[1700px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Image - Left */}
            <div className="relative w-full lg:w-[45%] h-[280px] sm:h-[320px] lg:h-[347px] rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content - Right */}
            <div className="flex-1">
              <div className="flex flex-col gap-8">
                {/* Header */}
                <div>
                  <div className="flex gap-3 justify-between">
                    <div className="flex flex-col gap-2 flex-1">
                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="relative w-[92px] h-[17px]">
                          <Image
                            src="/images/icons/star-rating.svg"
                            alt="Rating"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="font-poppins text-lg text-[#022425]">
                          {rating} ({reviewCount} Reviews)
                        </p>
                      </div>

                      {/* Title */}
                      <h1 className="
                        font-roboto-condensed font-medium
                        text-4xl lg:text-[40px]
                        text-[#0b1c30] leading-[48px] tracking-[-1px]
                      ">
                        {title}
                      </h1>

                      {/* Description */}
                      <p className="
                        font-poppins text-lg text-[#424655]
                        leading-normal max-w-[780px]
                      ">
                        {description}
                      </p>
                    </div>

                    {/* Share Button */}
                    <button
                      onClick={handleShare}
                      className="
                        w-[42px] h-[42px] flex-shrink-0
                        flex items-center justify-center
                        hover:opacity-70 transition-opacity
                      "
                      aria-label="Share"
                    >
                      <div className="relative w-[42px] h-[42px]">
                        <Image
                          src="/images/icons/share.svg"
                          alt="Share"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Info Badges */}
                <div className="flex items-center gap-6 py-1">
                  {/* Duration */}
                  <div className="flex flex-col gap-1">
                    <span className="
                      font-roboto-condensed text-xs text-[#424655] uppercase
                    ">
                      DURATION
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="relative w-[15px] h-[15px]">
                        <Image
                          src="/images/icons/clock-detail.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="
                        font-roboto-condensed font-medium text-sm
                        text-[#0b1c30]
                      ">
                        {duration}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-8 bg-[rgba(194,198,216,0.4)]" />

                  {/* Protection */}
                  <div className="flex flex-col gap-1">
                    <span className="
                      font-roboto-condensed text-xs text-[#424655] uppercase
                    ">
                      PROTECTION
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="relative w-[17px] h-[16px]">
                        <Image
                          src="/images/icons/warranty-shield.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="
                        font-roboto-condensed font-medium text-sm
                        text-[#006c49]
                      ">
                        {warrantyText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-6 py-1">
                  <button
                    onClick={onBookNow}
                    className="
                      bg-[#02368c]
                      h-[51px] w-[222px]
                      rounded-xl
                      font-roboto-condensed font-medium text-xs uppercase tracking-[2.816px]
                      text-white
                      hover:bg-[#024189] transition-colors
                    "
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
