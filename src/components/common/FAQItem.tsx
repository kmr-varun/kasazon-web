'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface FAQItemProps {
  question: string;
  answer: string;
  className?: string;
}

export function FAQItem({ question, answer, className = '' }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`
      bg-white border border-[#cbcbcb]
      rounded-[10px]
      transition-all duration-200
      ${className}
    `}>
      {/* Question - Clickable Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between
          p-5
          text-left
          hover:bg-gray-50
          transition-colors duration-200
        "
      >
        <span className="
          flex-1 font-poppins font-medium text-black text-sm
          leading-normal pr-4
        ">
          {question}
        </span>

        {/* Chevron Icon */}
        <div className={`
          relative w-3 h-2 flex-shrink-0
          transition-transform duration-200
          ${isOpen ? 'rotate-180' : ''}
        `}>
          <Image
            src="/images/icons/chevron-down.svg"
            alt="Toggle"
            fill
            className="object-contain"
          />
        </div>
      </button>

      {/* Answer - Collapsible Content */}
      {isOpen && (
        <div className="px-5 pb-5 pt-0">
          <p className="
            font-poppins text-[#464646] text-sm
            leading-relaxed
          ">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
