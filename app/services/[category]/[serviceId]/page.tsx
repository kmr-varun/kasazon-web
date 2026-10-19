'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header, Footer } from "@/src/components/layout";
import { ServiceDetailHero, ServiceDetailsContent, MostBooked, ServiceTestimonials } from "@/src/components/sections";
import { api } from '@/src/lib/api';
import { useBooking } from '@/src/lib/booking-context';
import type { Service } from '@/src/lib/types';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { category, serviceId } = params;
  const { setService: setBookingService } = useBooking();

  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await api.services.getById(serviceId as string);
        setService(data);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError(err instanceof Error ? err.message : 'Failed to load service');
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const handleBookNow = () => {
    if (!service) return;

    // Use the first package as default (usually base price)
    const packages = service.packages || [];
    if (packages.length === 0) {
      alert('No packages available for this service');
      return;
    }

    const selectedPkg = packages[0];

    setBookingService(service, {
      id: selectedPkg.id,
      units: 1,
      price: Number(selectedPkg.price),
      label: selectedPkg.name,
    });

    // Navigate to time slots page
    router.push(`/time-slots?serviceId=${service.id}`);
  };

  const handleCheckout = (packageId: string) => {
    if (!service) {
      alert('Service not found');
      return;
    }

    const selectedPkg = service.packages?.find(p => p.id === packageId);
    if (!selectedPkg) {
      alert('Please select a package first');
      return;
    }

    setBookingService(service, {
      id: selectedPkg.id,
      units: selectedPkg.units || 1,
      price: Number(selectedPkg.price),
      label: selectedPkg.name,
    });

    // Navigate to time slots page
    router.push(`/time-slots?serviceId=${service.id}`);
  };

  const handleAddMostBookedService = (serviceId: string) => {
    router.push(`/services/${category}/${serviceId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#02368c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-poppins text-lg text-[#64748b]">Loading service details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !service) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-roboto-condensed text-4xl text-[#0f172a] mb-4">
              Service Not Found
            </h1>
            <p className="font-poppins text-lg text-[#64748b] mb-6">
              {error || 'The service you\'re looking for doesn\'t exist.'}
            </p>
            <button
              onClick={() => router.push('/services')}
              className="bg-[#02368c] text-white px-6 py-3 rounded-lg hover:bg-[#024189] transition-colors"
            >
              Browse All Services
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Map service packages for the component
  const mappedPackages = (service.packages || []).map(pkg => ({
    id: pkg.id,
    title: pkg.name,
    price: Number(pkg.price),
    description: pkg.description || '',
    duration: pkg.durationEstimate || `${service.duration} minutes`,
  }));

  // Prepare includes list
  const includes = service.includes || [];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ServiceDetailHero
          image={service.imageUrl || '/images/service-placeholder.png'}
          rating={service.rating}
          reviewCount={service.reviewCount}
          title={service.name}
          description={service.description}
          duration={`Approx. ${Math.floor(service.duration / 60)} hr${service.duration >= 120 ? 's' : ''}`}
          warrantyText="30-Day Kasazon Warranty"
          onBookNow={handleBookNow}
        />
        <ServiceDetailsContent
          packages={mappedPackages}
          includes={includes}
          processSteps={[
            {
              number: '01',
              title: 'Pre-Service Check',
              description: 'Technician checks the condition and identifies any issues before starting.',
            },
            {
              number: '02',
              title: 'Service Execution',
              description: 'Professional service using industry-standard equipment and procedures.',
            },
            {
              number: '03',
              title: 'Final Inspection',
              description: 'Technician verifies quality and ensures everything works perfectly.',
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
