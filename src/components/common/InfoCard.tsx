'use client';

import Image from 'next/image';
import { Button } from './Button';

export interface InfoCardProps {
  backgroundImage: string;
  badge?: {
    icon: string;
    text: string;
  };
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
  className?: string;
}

export function InfoCard({
  backgroundImage,
  badge,
  title,
  description,
  buttonText,
  onButtonClick,
  className = '',
}: InfoCardProps) {
  const handleClick = () => {
    console.log('Info card button clicked:', title);
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <div className={`relative h-[439px] rounded-2xl overflow-hidden bg-white ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.4) 17%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-12">
        {/* Badge */}
        {badge && (
          <div className="absolute top-8 left-12">
            <div className="flex items-center gap-2 bg-[rgba(246,252,255,0.8)] rounded-xl px-3 py-1.5">
              <div className="relative w-4 h-4">
                <Image
                  src={badge.icon}
                  alt={badge.text}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-poppins text-xs text-[#02368c] leading-normal">
                {badge.text}
              </span>
            </div>
          </div>
        )}

        {/* Text Content */}
        <div className="flex flex-col gap-6 max-w-[535px]">
          {/* Title */}
          <h3 className="
            font-roboto-condensed font-normal text-white
            text-3xl lg:text-4xl
            leading-tight
          ">
            {title}
          </h3>

          {/* Description */}
          <p className="
            font-poppins text-white/80
            text-base
            leading-normal
          ">
            {description}
          </p>

          {/* Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={handleClick}
            className="w-full sm:w-auto sm:max-w-[250px] px-4"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
