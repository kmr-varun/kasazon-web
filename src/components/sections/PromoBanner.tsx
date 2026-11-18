'use client';

import Image from 'next/image';
import { Button } from '../common/Button';

export interface PromoBannerProps {
  title: React.ReactNode;
  description: string;
  buttonText: string;
  backgroundImage: string;
  onButtonClick?: () => void;
  className?: string;
}

export function PromoBanner({
  title,
  description,
  buttonText,
  backgroundImage,
  onButtonClick,
  className = '',
}: PromoBannerProps) {
  const handleClick = () => {
    console.log('Promo button clicked');
    if (onButtonClick) {
      onButtonClick();
    }
    // TODO: Navigate to relevant service page
  };

  return (
    <section className={`relative min-h-[400px] lg:min-h-[481px] bg-gray-400 ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImage}
          alt="Promo banner"
          fill
          className="object-cover object-top mix-blend-multiply"
          priority
        />
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[400px] lg:min-h-[481px]">
        <div className="w-full px-6 sm:px-12 lg:px-24 py-10">
          <div className="max-w-2xl">
            {/* Title */}
            <h2 className="
              font-montaga text-white
              text-3xl sm:text-4xl lg:text-6xl
              leading-tight lg:leading-[1.25]
              mb-6 lg:mb-8
            ">
              {title}
            </h2>

            {/* Description */}
            <p className="
              font-poppins text-white
              text-base lg:text-xl
              font-[300]
              leading-relaxed lg:leading-[1.3]
              mb-8 lg:mb-11
            ">
              {description}
            </p>

            {/* Button */}
            <Button
              variant="primary"
              size="md"
              onClick={handleClick}
              className="w-full sm:w-auto min-w-[222px]"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
