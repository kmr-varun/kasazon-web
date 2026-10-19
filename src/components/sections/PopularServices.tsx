'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceDetailCard } from '../common/ServiceDetailCard';
import { api } from '@/src/lib/api';
import type { Service } from '@/src/lib/types';

export interface PopularServicesProps {
  className?: string;
}

export function PopularServices({ className = '' }: PopularServicesProps) {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularServices = async () => {
      try {
        setIsLoading(true);
        const popularServices = await api.services.getPopular();
        setServices(popularServices.slice(0, 4)); // Show only first 4
      } catch (err) {
        console.error('Error fetching popular services:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularServices();
  }, []);

  const handleServiceClick = (service: Service) => {
    const categorySlug = service.categoryName.toLowerCase().replace(/\s+/g, '-');
    router.push(`/services/${categorySlug}/${service.id}`);
  };

  if (isLoading) {
    return (
      <section className={`bg-white ${className}`}>
        <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
          <div className="mb-12 lg:mb-14">
            <h2 className="
              font-roboto-condensed font-normal text-black text-center
              text-4xl sm:text-5xl lg:text-6xl
              leading-tight
            ">
              Popular Services Near You
            </h2>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-[#02368c] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null; // Don't show section if no popular services
  }

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        {/* Title */}
        <div className="mb-12 lg:mb-14">
          <h2 className="
            font-roboto-condensed font-normal text-black text-center
            text-4xl sm:text-5xl lg:text-6xl
            leading-tight
          ">
            Popular Services Near You
          </h2>
        </div>

        {/* Services Grid */}
        <div className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-6
        ">
          {services.map((service) => (
            <div key={service.id} onClick={() => handleServiceClick(service)} className="cursor-pointer">
              <ServiceDetailCard
                image={service.imageUrl || '/images/service-placeholder.png'}
                title={service.name}
                rating={service.rating}
                reviewCount={service.reviewCount}
                price={service.basePrice.toString()}
                onAddClick={() => handleServiceClick(service)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
