'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export interface FilterOption {
  id: string;
  label: string;
}

export interface ServiceFilterSortProps {
  title: string;
  serviceCount: number;
  filters?: {
    serviceType?: FilterOption[];
    acType?: FilterOption[];
    price?: FilterOption[];
  };
  sortOptions?: FilterOption[];
  onFilterChange?: (filterType: string, filterId: string) => void;
  onSortChange?: (sortId: string) => void;
  className?: string;
}

export function ServiceFilterSort({
  title,
  serviceCount,
  filters = {},
  sortOptions = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Rating' },
  ],
  onFilterChange,
  onSortChange,
  className = '',
}: ServiceFilterSortProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [activeSortId, setActiveSortId] = useState(sortOptions[0]?.id || 'recommended');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterClick = (filterType: string) => {
    setShowDropdown(showDropdown === filterType ? null : filterType);
  };

  const handleFilterSelect = (filterType: string, filterId: string) => {
    setActiveFilters((prev) => ({ ...prev, [filterType]: filterId }));
    onFilterChange?.(filterType, filterId);
    setShowDropdown(null);
  };

  const handleSortSelect = (sortId: string) => {
    setActiveSortId(sortId);
    onSortChange?.(sortId);
    setShowDropdown(null);
  };

  const activeSortLabel = sortOptions.find((opt) => opt.id === activeSortId)?.label || 'Recommended';

  return (
    <section className={`bg-white pb-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div ref={containerRef} className="bg-white rounded-xl shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Left side: Title and count */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-poppins font-semibold text-xl text-[#0b1c30] tracking-[-0.2px]">
              {title}
            </h2>
            <div className="bg-[#e5eeff] px-2 py-0.5 rounded-full">
              <span className="font-roboto-condensed text-xs text-[#777]">
                {serviceCount} service{serviceCount !== 1 ? 's' : ''} available
              </span>
            </div>
          </div>

          {/* Right side: Filters and Sort */}
          <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
            {/* Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {filters.serviceType && filters.serviceType.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => handleFilterClick('serviceType')}
                    className="bg-[#eff4ff] px-4 py-1 rounded-lg flex items-center gap-1 hover:bg-[#dde7ff] transition-colors"
                  >
                    <span className="font-roboto-condensed font-medium text-sm text-[#0b1c30] whitespace-nowrap">
                      Service Type
                    </span>
                    <div className="relative w-[9px] h-[5.55px]">
                      <Image
                        src="/images/services/dropdown-arrow.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </button>
                  {showDropdown === 'serviceType' && (
                    <div className="absolute top-full mt-1 left-0 bg-white border border-[#e5e7eb] rounded-lg shadow-lg min-w-[200px] z-50">
                      {filters.serviceType.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleFilterSelect('serviceType', option.id)}
                          className="w-full px-4 py-2 text-left hover:bg-[#f5f5f5] font-poppins text-sm text-[#0b1c30] border-b border-[#f0f0f0] last:border-b-0"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {filters.acType && filters.acType.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => handleFilterClick('acType')}
                    className="bg-[#eff4ff] px-4 py-1 rounded-lg flex items-center gap-1 hover:bg-[#dde7ff] transition-colors"
                  >
                    <span className="font-roboto-condensed font-medium text-sm text-[#0b1c30] whitespace-nowrap">
                      AC Type
                    </span>
                    <div className="relative w-[9px] h-[5.55px]">
                      <Image
                        src="/images/services/dropdown-arrow.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </button>
                  {showDropdown === 'acType' && (
                    <div className="absolute top-full mt-1 left-0 bg-white border border-[#e5e7eb] rounded-lg shadow-lg min-w-[200px] z-50">
                      {filters.acType.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleFilterSelect('acType', option.id)}
                          className="w-full px-4 py-2 text-left hover:bg-[#f5f5f5] font-poppins text-sm text-[#0b1c30] border-b border-[#f0f0f0] last:border-b-0"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {filters.price && filters.price.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => handleFilterClick('price')}
                    className="bg-[#eff4ff] px-4 py-1 rounded-lg flex items-center gap-1 hover:bg-[#dde7ff] transition-colors"
                  >
                    <span className="font-roboto-condensed font-medium text-sm text-[#0b1c30] whitespace-nowrap">
                      Price
                    </span>
                    <div className="relative w-[9px] h-[5.55px]">
                      <Image
                        src="/images/services/dropdown-arrow.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </button>
                  {showDropdown === 'price' && (
                    <div className="absolute top-full mt-1 left-0 bg-white border border-[#e5e7eb] rounded-lg shadow-lg min-w-[200px] z-50">
                      {filters.price.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleFilterSelect('price', option.id)}
                          className="w-full px-4 py-2 text-left hover:bg-[#f5f5f5] font-poppins text-sm text-[#0b1c30] border-b border-[#f0f0f0] last:border-b-0"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            {(filters.serviceType || filters.acType || filters.price) && (
              <div className="hidden sm:block w-px h-6 bg-[#c2c6d8]" />
            )}

            {/* Sort Dropdown */}
            <div className="relative">
              <div className="bg-[#eff4ff] px-4 py-1 rounded-lg flex items-center gap-1">
                <span className="font-poppins text-sm text-[#424655]">
                  Sort by:
                </span>
                <button
                  onClick={() => handleFilterClick('sort')}
                  className="font-roboto-condensed font-medium text-sm text-[#0b1c30] px-1 hover:opacity-80 transition-opacity"
                >
                  {activeSortLabel}
                </button>
              </div>
              {showDropdown === 'sort' && (
                <div className="absolute top-full mt-1 right-0 bg-white border border-[#e5e7eb] rounded-lg shadow-lg min-w-[200px] z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSortSelect(option.id)}
                      className={`w-full px-4 py-2 text-left hover:bg-[#f5f5f5] font-poppins text-sm border-b border-[#f0f0f0] last:border-b-0 ${
                        activeSortId === option.id ? 'text-[#02368c] font-medium' : 'text-[#0b1c30]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
