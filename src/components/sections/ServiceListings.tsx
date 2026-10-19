'use client';

import { useRouter } from 'next/navigation';
import { ServiceListingCard } from '../common/ServiceListingCard';
import { BookingCart } from '../common/BookingCart';

export interface Service {
  id: string;
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
  image: string;
}

export interface ServiceListingsProps {
  sectionTitle: string;
  sectionDescription: string;
  services: Service[];
  categorySlug: string;
  className?: string;
}

export function ServiceListings({
  sectionTitle,
  sectionDescription,
  services,
  categorySlug,
  className = '',
}: ServiceListingsProps) {
  const router = useRouter();

  const handleAddService = (serviceId: string) => {
    // Navigate to service detail page to see packages and start booking
    router.push(`/services/${categorySlug}/${serviceId}`);
  };

  const handleCheckout = () => {
    // This shouldn't be used in this context - booking starts from service detail
    router.push(`/services/${categorySlug}`);
  };

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 pb-16 lg:pb-24">
        <div className="max-w-[1700px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left: Service Listings */}
            <div className="flex-1">
              {/* Section Header */}
              <div className="mb-4">
                <h2 className="
                  font-roboto-condensed font-medium text-3xl
                  text-[#0b1c30] tracking-[-0.7px] leading-[36.4px]
                  mb-2
                ">
                  {sectionTitle}
                </h2>
                <p className="
                  font-inter text-sm text-[#424655]
                  leading-[21px]
                ">
                  {sectionDescription}
                </p>
              </div>

              {/* Service Cards */}
              <div className="flex flex-col gap-4">
                {services.map((service) => (
                  <ServiceListingCard
                    key={service.id}
                    title={service.title}
                    description={service.description}
                    rating={service.rating}
                    reviewCount={service.reviewCount}
                    duration={service.duration}
                    price={service.price}
                    image={service.image}
                    onAdd={() => handleAddService(service.id)}
                  />
                ))}
              </div>
            </div>

            {/* Right: Booking Cart - Sticky on larger screens */}
            <div className="lg:w-[460px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <BookingCart
                  itemCount={0}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
