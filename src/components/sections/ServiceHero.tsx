'use client';

import Image from 'next/image';

export interface ServiceHeroProps {
  image: string;
  rating: number;
  reviewCount: number;
  title: string;
  description: string;
  badges: Array<{
    icon: string;
    label: string;
  }>;
  className?: string;
}

export function ServiceHero({
  image,
  rating,
  reviewCount,
  title,
  description,
  badges,
  className = '',
}: ServiceHeroProps) {
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
                      font-roboto-condensed font-normal
                      text-4xl lg:text-[40px]
                      text-black leading-[1.5]
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

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="
                      bg-[#f2f3f9] border border-[rgba(0,0,0,0.1)]
                      rounded-lg px-4 py-2
                      flex items-center gap-2
                      h-[50px]
                      shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                    "
                  >
                    <div className="relative w-[18px] h-[18px] flex-shrink-0">
                      <Image
                        src={badge.icon}
                        alt={badge.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="
                      font-roboto-condensed font-medium text-sm
                      text-[#0b1c30]
                    ">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
