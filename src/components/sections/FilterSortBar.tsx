'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface FilterSortBarProps {
  title: string;
  serviceCount: number;
  filters?: {
    serviceType?: string[];
    acType?: string[];
    priceRange?: { min: number; max: number };
  };
  sortBy?: 'recommended' | 'price-low' | 'price-high' | 'rating';
  onFilterChange?: (filters: any) => void;
  onSortChange?: (sortBy: string) => void;
  className?: string;
}

export function FilterSortBar({
  title,
  serviceCount,
  filters,
  sortBy = 'recommended',
  onFilterChange,
  onSortChange,
  className = '',
}: FilterSortBarProps) {
  const [selectedSort, setSelectedSort] = useState(sortBy);

  const handleFilterClick = (filterType: string) => {
    console.log('Filter clicked:', filterType);
    // TODO: Open filter modal/dropdown
  };

  const handleSortClick = () => {
    console.log('Sort clicked');
    // TODO: Open sort dropdown
  };

  const getSortLabel = (sort: string) => {
    const labels: Record<string, string> = {
      'recommended': 'Recommended',
      'price-low': 'Price: Low to High',
      'price-high': 'Price: High to Low',
      'rating': 'Highest Rated',
    };
    return labels[sort] || 'Recommended';
  };

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 pb-10">
        <div className="max-w-[1700px] mx-auto">
          <div className="
            bg-white
            shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
            rounded-xl p-4
            flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
          ">
            {/* Left: Title + Count Badge */}
            <div className="flex items-center gap-2">
              <h2 className="
                font-poppins font-semibold
                text-xl text-[#0b1c30]
                tracking-[-0.2px] leading-[28px]
              ">
                {title}
              </h2>
              <div className="
                bg-[#e5eeff]
                px-2 py-0.5
                rounded-full
              ">
                <span className="
                  font-roboto-condensed text-xs text-[#777]
                ">
                  {serviceCount} services available
                </span>
              </div>
            </div>

            {/* Right: Filters + Sort */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Filter Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleFilterClick('service-type')}
                  className="
                    bg-[#eff4ff]
                    px-4 py-1
                    rounded-lg
                    flex items-center gap-1
                    font-roboto-condensed font-medium text-sm text-[#0b1c30]
                    hover:bg-[#e5eeff] transition-colors
                  "
                >
                  <span>Service Type</span>
                  <div className="relative w-[9px] h-[6px]">
                    <Image
                      src="/images/icons/chevron-down.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>

                <button
                  onClick={() => handleFilterClick('ac-type')}
                  className="
                    bg-[#eff4ff]
                    px-4 py-1
                    rounded-lg
                    flex items-center gap-1
                    font-roboto-condensed font-medium text-sm text-[#0b1c30]
                    hover:bg-[#e5eeff] transition-colors
                  "
                >
                  <span>AC Type</span>
                  <div className="relative w-[9px] h-[6px]">
                    <Image
                      src="/images/icons/chevron-down.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>

                <button
                  onClick={() => handleFilterClick('price')}
                  className="
                    bg-[#eff4ff]
                    px-4 py-1
                    rounded-lg
                    flex items-center gap-1
                    font-roboto-condensed font-medium text-sm text-[#0b1c30]
                    hover:bg-[#e5eeff] transition-colors
                  "
                >
                  <span>Price</span>
                  <div className="relative w-[9px] h-[6px]">
                    <Image
                      src="/images/icons/chevron-down.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-[#c2c6d8]" />

              {/* Sort Dropdown */}
              <button
                onClick={handleSortClick}
                className="
                  bg-[#eff4ff]
                  px-4 py-1
                  rounded-lg
                  flex items-center gap-1
                  hover:bg-[#e5eeff] transition-colors
                "
              >
                <span className="font-poppins text-sm text-[#424655]">
                  Sort by:
                </span>
                <span className="font-roboto-condensed font-medium text-sm text-[#0b1c30]">
                  {getSortLabel(selectedSort)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
