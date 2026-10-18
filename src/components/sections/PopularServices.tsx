'use client';

import { ServiceDetailCard } from '../common/ServiceDetailCard';

export interface PopularServicesProps {
  className?: string;
}

const popularServices = [
  {
    image: '/images/services/cleaning-1.jpg',
    title: 'Home Cleaning',
    rating: 4.8,
    reviewCount: 168,
    price: '40',
  },
  {
    image: '/images/services/cleaning-2.jpg',
    title: 'Home Cleaning',
    rating: 4.8,
    reviewCount: 168,
    price: '40',
  },
  {
    image: '/images/services/cleaning-3.jpg',
    title: 'Home Cleaning',
    rating: 4.8,
    reviewCount: 168,
    price: '40',
  },
  {
    image: '/images/services/cleaning-4.jpg',
    title: 'Home Cleaning',
    rating: 4.8,
    reviewCount: 168,
    price: '40',
  },
];

export function PopularServices({ className = '' }: PopularServicesProps) {
  const handleAddService = (title: string) => {
    console.log('Add service:', title);
    // TODO: Add to cart functionality
  };

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
          {popularServices.map((service, index) => (
            <ServiceDetailCard
              key={index}
              image={service.image}
              title={service.title}
              rating={service.rating}
              reviewCount={service.reviewCount}
              price={service.price}
              onAddClick={() => handleAddService(service.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
