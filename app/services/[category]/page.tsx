'use client';

import { useParams } from 'next/navigation';
import { Header, Footer } from "@/src/components/layout";
import { ServiceHero, ServiceCategoryNav, FilterSortBar, ServiceListings } from "@/src/components/sections";

// Mock data - will be replaced with API data
const serviceData = {
  'ac-servicing': {
    image: '/images/ac-servicing-hero.png',
    rating: 5,
    reviewCount: 350,
    title: 'AC Servicing',
    description: "Keep your AC running smoothly with certified professionals, transparent fixed pricing, and India's most trusted 30-day cooling assurance.",
    badges: [
      {
        icon: '/images/icons/verified-professionals.svg',
        label: 'Verified Professionals',
      },
      {
        icon: '/images/icons/transparent-pricing.svg',
        label: 'Transparent Pricing',
      },
      {
        icon: '/images/icons/warranty.svg',
        label: '30-Day Warranty',
      },
      {
        icon: '/images/icons/secure-payments.svg',
        label: 'Secure Payments',
      },
    ],
    categories: [
      {
        id: 'ac-service',
        label: 'AC Service',
        icon: '/images/icons/ac-service.svg',
      },
      {
        id: 'repair-gas',
        label: 'Repair & Gas Refill',
        icon: '/images/icons/repair-gas.svg',
      },
      {
        id: 'installation',
        label: 'Installation',
        icon: '/images/icons/installation.svg',
      },
      {
        id: 'uninstallation',
        label: 'Uninstallation',
        icon: '/images/icons/uninstallation.svg',
      },
      {
        id: 'ac-maintenance',
        label: 'AC Maintenance',
        icon: '/images/icons/ac-maintenance.svg',
      },
    ],
  },
};

export default function ServiceCategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const service = serviceData[category as keyof typeof serviceData];

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ServiceHero
          image={service.image}
          rating={service.rating}
          reviewCount={service.reviewCount}
          title={service.title}
          description={service.description}
          badges={service.badges}
        />
        <ServiceCategoryNav
          categories={service.categories}
          defaultActiveId="ac-service"
          onCategoryChange={(categoryId) => {
            console.log('Category changed:', categoryId);
            // TODO: Filter services by category
          }}
        />
        <FilterSortBar
          title="AC Service & Repair"
          serviceCount={12}
          sortBy="recommended"
          onFilterChange={(filters) => {
            console.log('Filters changed:', filters);
            // TODO: Apply filters
          }}
          onSortChange={(sortBy) => {
            console.log('Sort changed:', sortBy);
            // TODO: Apply sorting
          }}
        />
        <ServiceListings
          sectionTitle="Super Saver Packages"
          sectionDescription="Bundled deep cleaning packages tailored for multiple rooms"
          services={[
            {
              id: '1',
              title: 'Foam-Jet — 2 ACs',
              description: 'Split or Window',
              rating: 4.5,
              reviewCount: 890,
              duration: '3–4 hrs',
              price: 40,
              image: '/images/service-placeholder.png',
            },
            {
              id: '2',
              title: 'Foam-Jet — 2 ACs',
              description: 'Split or Window',
              rating: 4.5,
              reviewCount: 890,
              duration: '3–4 hrs',
              price: 40,
              image: '/images/service-placeholder.png',
            },
            {
              id: '3',
              title: 'Foam-Jet — 2 ACs',
              description: 'Split or Window',
              rating: 4.5,
              reviewCount: 890,
              duration: '3–4 hrs',
              price: 40,
              image: '/images/service-placeholder.png',
            },
            {
              id: '4',
              title: 'Foam-Jet — 2 ACs',
              description: 'Split or Window',
              rating: 4.5,
              reviewCount: 890,
              duration: '3–4 hrs',
              price: 40,
              image: '/images/service-placeholder.png',
            },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
