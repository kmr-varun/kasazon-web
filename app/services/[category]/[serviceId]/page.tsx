'use client';

import { useParams } from 'next/navigation';
import { Header, Footer } from "@/src/components/layout";
import { ServiceDetailHero, ServiceDetailsContent, MostBooked, ServiceTestimonials } from "@/src/components/sections";

// Mock data - will be replaced with API data
const serviceDetails: Record<string, any> = {
  'foam-jet-2-acs': {
    image: '/images/ac-servicing-hero.png',
    rating: 5,
    reviewCount: 350,
    title: 'Foam-Jet AC Service',
    description: "Keep your AC running smoothly with certified professionals, transparent fixed pricing, and India's most trusted 30-day cooling assurance.",
    duration: 'Approx. 1–2 hrs',
    warrantyText: '30-Day Kasazon Warranty',
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const { category, serviceId } = params;

  const service = serviceDetails[serviceId as string];

  // Handle unknown service
  if (!service) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-roboto-condensed text-4xl text-black mb-4">
              Service Not Found
            </h1>
            <p className="font-poppins text-lg text-[#424655]">
              The service you're looking for doesn't exist.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleBookNow = () => {
    console.log('Book Now clicked');
    // TODO: Navigate to booking flow
  };

  const handleAddToCart = () => {
    console.log('Add to Cart clicked');
    // TODO: Add to cart
  };

  const handleCheckout = () => {
    console.log('Checkout clicked');
    // TODO: Navigate to checkout
  };

  const handleAddMostBookedService = (serviceId: string) => {
    console.log('Add most booked service:', serviceId);
    // TODO: Add to cart
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ServiceDetailHero
          image={service.image}
          rating={service.rating}
          reviewCount={service.reviewCount}
          title={service.title}
          description={service.description}
          duration={service.duration}
          warrantyText={service.warrantyText}
          onBookNow={handleBookNow}
          onAddToCart={handleAddToCart}
        />
        <ServiceDetailsContent
          packages={[
            {
              id: '1-ac',
              title: '1 AC',
              price: 499,
              description: 'Single unit deep foam cleaning',
              duration: '1–2 hours',
            },
            {
              id: '2-ac',
              title: '2 AC',
              price: 899,
              description: 'Best for 2BHK apartments',
              duration: '2–3 hours',
            },
            {
              id: '3-ac',
              title: '3 AC',
              price: 1299,
              description: 'Complete home cooling package',
              duration: '3–4 hours',
            },
          ]}
          includes={[
            'Filter cleaning',
            'Coil cleaning (indoor & outdoor)',
            'Vent & panel cleaning',
            'Function test',
            'Before/after photo documentation',
          ]}
          processSteps={[
            {
              number: '01',
              title: 'Pre-Service Check',
              description: 'Technician checks the AC condition and identifies any issues before starting.',
            },
            {
              number: '02',
              title: 'Deep Cleaning',
              description: 'The indoor unit, filters and coils are cleaned using professional foam-jet equipment.',
            },
            {
              number: '03',
              title: 'Final Inspection',
              description: 'The technician checks airflow, cooling and overall operation before completing the service.',
            },
          ]}
          onCheckout={handleCheckout}
        />
        <MostBooked
          services={[
            {
              id: 'home-cleaning-1',
              title: 'Home Cleaning',
              image: '/images/most-booked-1.png',
              rating: 4.8,
              reviewCount: 168,
              startingPrice: 40,
            },
            {
              id: 'home-cleaning-2',
              title: 'Home Cleaning',
              image: '/images/most-booked-2.png',
              rating: 4.8,
              reviewCount: 168,
              startingPrice: 40,
            },
            {
              id: 'home-cleaning-3',
              title: 'Home Cleaning',
              image: '/images/most-booked-3.png',
              rating: 4.8,
              reviewCount: 168,
              startingPrice: 40,
            },
            {
              id: 'home-cleaning-4',
              title: 'Home Cleaning',
              image: '/images/most-booked-4.png',
              rating: 4.8,
              reviewCount: 168,
              startingPrice: 40,
            },
          ]}
          onAddService={handleAddMostBookedService}
        />
        <ServiceTestimonials
          testimonials={[
            {
              id: '1',
              quote: '"Kasazon made booking a home service incredibly easy. I found a professional quickly, knew the price upfront, and the service was excellent."',
              name: 'Ananya Rao',
              location: 'Bengaluru',
              avatar: '/images/testimonial-avatar-1.png',
              rating: 5,
            },
            {
              id: '2',
              quote: '"I needed an urgent plumbing repair and was able to book a reliable professional within minutes. Very smooth experience from start to finish."',
              name: 'Dr. Vikram Sethi',
              location: 'New Delhi',
              avatar: '/images/testimonial-avatar-2.png',
              rating: 5,
            },
            {
              id: '3',
              quote: '"The project tracking feature made my home painting project so much easier to manage. I could see the progress and stay updated throughout."',
              name: 'Meher Kapoor',
              location: 'Mumbai',
              avatar: '/images/testimonial-avatar-3.png',
              rating: 5,
            },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
