'use client';

import Image from 'next/image';

export interface ServiceDetailCardProps {
  image: string;
  title: string;
  rating: number;
  reviewCount: number;
  price: string;
  currency?: string;
  onAddClick?: () => void;
  className?: string;
}

export function ServiceDetailCard({
  image,
  title,
  rating,
  reviewCount,
  price,
  currency = '₵',
  onAddClick,
  className = '',
}: ServiceDetailCardProps) {
  const handleAddClick = () => {
    console.log('Add clicked:', title);
    if (onAddClick) {
      onAddClick();
    }
  };

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* Service Image */}
      <div className="relative w-full aspect-[414/470] rounded-2xl overflow-hidden bg-[#f6ecdd]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Service Info */}
      <div className="flex flex-col gap-4">
        {/* Title and Rating */}
        <div className="flex flex-col gap-1">
          {/* Title */}
          <h3 className="font-poppins text-black text-lg leading-[1.5]">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {/* Star and Rating */}
            <div className="flex items-center gap-1">
              <div className="relative w-4 h-4">
                <Image
                  src="/images/icons/star.png"
                  alt="Rating"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-poppins text-[12.5px] text-[rgba(21,58,99,0.8)] leading-[1.5]">
                {Number(rating).toFixed(1)}
              </span>
            </div>

            {/* Review Count */}
            <span className="font-poppins text-xs text-[#6b7280] leading-[1.5]">
              ({reviewCount})
            </span>
          </div>
        </div>

        {/* Price and Add Button */}
        <div className="flex flex-col gap-1.5">
          <span className="font-poppins text-xs text-[#6b7280] leading-[1.5]">
            Starts at
          </span>

          <div className="flex items-center justify-between">
            {/* Price */}
            <span className="font-roboto-condensed font-normal text-[#02368c] text-lg leading-[1.5]">
              {currency}{price}
            </span>

            {/* Add Button */}
            <button
              onClick={handleAddClick}
              className="
                flex items-center justify-center gap-0.5
                bg-[#02368c] hover:opacity-90
                h-[30px] px-6
                rounded
                transition-opacity duration-200
              "
            >
              <div className="relative w-[15px] h-[15px]">
                <Image
                  src="/images/icons/add.svg"
                  alt="Add"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-roboto-condensed font-normal text-white text-xs">
                Add
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
