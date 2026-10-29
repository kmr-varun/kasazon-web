'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search your service',
  onSearch,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex items-center gap-2
        bg-white border border-[#b2b2b2] rounded-[48px]
        h-[56px] pl-4 pr-1.5 py-1.5
        shadow-[0px_7px_11.25px_rgba(0,0,0,0.07)]
        ${className}
      `}
    >
      {/* Search Icon */}
      <div className="relative w-4 h-4 flex-shrink-0">
        <Image
          src="/images/icons/search.svg"
          alt="Search"
          fill
          className="object-contain"
        />
      </div>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="
          flex-1 min-w-0
          font-poppins text-[13px] text-[#878787]
          placeholder:text-[#878787]
          bg-transparent border-none outline-none
        "
      />

      {/* Search Button */}
      <button
        type="submit"
        className="
          flex items-center justify-center
          w-[44px] h-[44px] rounded-full
          bg-[#02368c] hover:opacity-90
          transition-opacity duration-200
          flex-shrink-0
        "
        aria-label="Search"
      >
        <div className="relative w-6 h-6">
          <Image
            src="/images/icons/search-button.svg"
            alt="Search"
            fill
            className="object-contain"
          />
        </div>
      </button>
    </form>
  );
}
