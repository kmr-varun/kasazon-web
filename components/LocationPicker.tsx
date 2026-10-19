'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface LocationPickerProps {
  onLocationSelect: (location: {
    address: string;
    lat: number;
    lng: number;
    addressComponents: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
  }) => void;
}

export function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 500);
  };

  const performSearch = async (query: string) => {
    setIsSearching(true);

    try {
      // Using OpenStreetMap Nominatim API (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'Kasazon/1.0',
          },
        }
      );

      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (suggestion: any) => {
    const address = suggestion.display_name;
    const addressParts = suggestion.address || {};

    // Parse address components
    const line1 = [
      addressParts.house_number,
      addressParts.road || addressParts.street,
    ].filter(Boolean).join(' ') || addressParts.suburb || addressParts.neighbourhood || '';

    const line2 = addressParts.suburb && addressParts.suburb !== line1
      ? addressParts.suburb
      : addressParts.neighbourhood || '';

    const city = addressParts.city || addressParts.town || addressParts.village || '';
    const state = addressParts.state || addressParts.region || '';
    const country = addressParts.country || '';
    const zipCode = addressParts.postcode || '';

    setSearchQuery(address);
    setShowSuggestions(false);

    onLocationSelect({
      address,
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
      addressComponents: {
        line1,
        line2,
        city,
        state,
        country,
        zipCode,
      },
    });
  };

  const handleUseCurrentLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    // Show loading state
    setIsSearching(true);
    setSearchQuery('Getting your location...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Location obtained:', latitude, longitude);

        try {
          // Reverse geocode
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'Kasazon/1.0',
                'Accept-Language': 'en',
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Reverse geocode result:', data);
          handleSelectLocation(data);
          setIsSearching(false);
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          setIsSearching(false);
          setSearchQuery('');
          alert('Could not find address for your location. Please try searching manually.');
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsSearching(false);
        setSearchQuery('');

        let message = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access denied. Please search for your location manually.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Your location could not be determined. This is common on desktop computers. Please search for your location manually.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out. Please search for your location manually.';
            break;
          default:
            message = 'Could not get your location. Please search manually instead.';
        }
        alert(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* Helpful hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
        <p className="font-rubik text-xs text-blue-800 leading-snug">
          💡 <strong>Tip:</strong> Search for your city or area (e.g., "Accra, Ghana" or "Lagos, Nigeria") for best results
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="
          border border-[#d9d9d9]
          rounded-lg
          px-3
          h-[40px]
          flex items-center gap-2.5
          bg-white
        ">
          <div className="relative w-[11px] h-[11px] flex-shrink-0">
            <Image
              src="/images/icons/search-icon.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for Location"
            className="
              flex-1
              font-rubik text-base
              placeholder:text-[rgba(0,0,0,0.25)]
              text-[#222]
              leading-[24px]
              outline-none
              bg-transparent
              min-w-0
            "
          />
          {isSearching && (
            <div className="relative w-[16px] h-[16px] flex-shrink-0 animate-spin">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#d9d9d9" strokeWidth="4"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="#02368c" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </div>
          )}
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="
            absolute top-full mt-2 left-0 right-0
            bg-white
            border border-[#d9d9d9]
            rounded-lg
            shadow-lg
            max-h-[300px]
            overflow-y-auto
            z-50
          ">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectLocation(suggestion)}
                className="
                  w-full px-4 py-3 text-left
                  hover:bg-[#f5f5f5]
                  border-b border-[#f0f0f0] last:border-b-0
                  flex items-start gap-3
                "
              >
                <div className="relative w-[16px] h-[16px] flex-shrink-0 mt-1">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="#02368c"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-rubik text-sm text-[#222] leading-snug">
                    {suggestion.display_name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Use Current Location Button */}
      <button
        onClick={handleUseCurrentLocation}
        type="button"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="relative w-[21px] h-[21px] flex-shrink-0">
          <Image
            src="/images/icons/location-current.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <span className="
          font-poppins text-sm text-[#02368c]
          leading-normal
        ">
          Use My Current Location
        </span>
      </button>
    </div>
  );
}
