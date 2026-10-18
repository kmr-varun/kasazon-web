'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface ServiceCategory {
  id: string;
  label: string;
  icon: string;
}

export interface ServiceCategoryNavProps {
  categories: ServiceCategory[];
  defaultActiveId?: string;
  onCategoryChange?: (categoryId: string) => void;
  className?: string;
}

export function ServiceCategoryNav({
  categories,
  defaultActiveId,
  onCategoryChange,
  className = '',
}: ServiceCategoryNavProps) {
  const [activeId, setActiveId] = useState(defaultActiveId || categories[0]?.id);

  const handleCategoryClick = (categoryId: string) => {
    setActiveId(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 pb-6">
        <div className="max-w-[1700px] mx-auto">
          {/* Horizontal scrollable container */}
          <div className="overflow-x-auto pb-1 -mx-1">
            <div className="flex gap-4 px-1 min-w-max">
              {categories.map((category) => {
                const isActive = category.id === activeId;

                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`
                      flex items-center gap-2
                      h-[47px] px-6 py-2
                      rounded-full
                      font-poppins text-base
                      transition-all duration-200
                      flex-shrink-0
                      ${
                        isActive
                          ? 'bg-[#02368c] text-white shadow-[0px_4px_6px_-1px_rgba(0,87,205,0.2),0px_2px_4px_-2px_rgba(0,87,205,0.2)]'
                          : 'bg-white text-[#111] border border-[rgba(0,0,0,0.1)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="relative w-[17px] h-[17px] flex-shrink-0">
                      <Image
                        src={category.icon}
                        alt=""
                        fill
                        className={`object-contain transition-all duration-200 ${
                          isActive ? 'brightness-0 invert' : ''
                        }`}
                      />
                    </div>
                    <span className="whitespace-nowrap">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
