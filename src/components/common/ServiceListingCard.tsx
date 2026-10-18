'use client';

import Image from 'next/image';

export interface ServiceListingCardProps {
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
  image: string;
  onAdd: () => void;
  className?: string;
}

export function ServiceListingCard({
  title,
  description,
  rating,
  reviewCount,
  duration,
  price,
  image,
  onAdd,
  className = '',
}: ServiceListingCardProps) {
  return (
    <div className={`
      bg-white
      border border-[rgba(0,0,0,0.1)]
      rounded-xl p-4
      shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
      hover:shadow-md transition-shadow
      ${className}
    `}>
      <div className="flex gap-4">
        {/* Content - Left */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col gap-1 pt-1">
            {/* Title */}
            <h3 className="
              font-poppins font-semibold text-lg
              text-[#0b1c30] leading-normal
            ">
              {title}
            </h3>

            {/* Description */}
            <p className="
              font-poppins text-sm text-[#424655]
              leading-normal
            ">
              {description}
            </p>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                <div className="relative w-[10px] h-[10px]">
                  <Image
                    src="/images/icons/star-small.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-roboto-condensed text-xs text-[#777]">
                  {rating}
                </span>
              </div>
              <span className="font-roboto-condensed text-xs text-[#777]">
                • {reviewCount}+ reviews
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1 pt-1">
              <div className="relative w-[13px] h-[13px]">
                <Image
                  src="/images/icons/clock.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-poppins text-base text-[#424655]">
                {duration}
              </span>
            </div>

            {/* Price */}
            <p className="font-poppins font-semibold text-xl text-[#111] pt-1">
              ₵{price}
            </p>
          </div>

          {/* Add Button */}
          <div className="pt-4">
            <button
              onClick={onAdd}
              className="
                bg-[#02368c]
                h-[30px] px-6
                rounded flex items-center justify-center gap-0.5
                hover:bg-[#024189] transition-colors
              "
            >
              <div className="relative w-[15px] h-[15px]">
                <Image
                  src="/images/icons/add-button.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span className="
                font-roboto-condensed text-xs text-white
              ">
                Add
              </span>
            </button>
          </div>
        </div>

        {/* Image - Right */}
        <div className="relative w-[200px] sm:w-[250px] lg:w-[297px] h-[178px] rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
