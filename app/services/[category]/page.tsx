'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header, Footer } from "@/src/components/layout";
import { ServiceHero, ServiceCategoryNav, FilterSortBar, ServiceListings } from "@/src/components/sections";
import { api } from '@/src/lib/api';
import type { Service, ServiceCategory } from '@/src/lib/types';

export default function ServiceCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;

  const [categoryData, setCategoryData] = useState<ServiceCategory | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const categoryDetails = await api.services.getCategory(category);

        // Extract category info
        setCategoryData({
          id: categoryDetails.id,
          name: categoryDetails.name,
          slug: categoryDetails.slug,
          description: categoryDetails.description ?? null,
          iconUrl: categoryDetails.iconUrl ?? null,
          imageUrl: categoryDetails.imageUrl ?? null,
          displayOrder: categoryDetails.displayOrder,
          isActive: true,
        } as ServiceCategory);

        // Extract services from the response
        const servicesData = (categoryDetails as any).services || [];
        setServices(servicesData);
      } catch (err) {
        console.error('Error fetching category:', err);
        setError(err instanceof Error ? err.message : 'Failed to load category');
      } finally {
        setIsLoading(false);
      }
    };

    if (category) {
      fetchCategoryData();
    }
  }, [category]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#02368c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-poppins text-lg text-[#64748b]">Loading category...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-roboto-condensed text-4xl text-black mb-4">
              Category Not Found
            </h1>
            <p className="font-poppins text-lg text-[#424655] mb-6">
              {error || 'The category you\'re looking for doesn\'t exist.'}
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

  const badges = [
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
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ServiceHero
          image={categoryData.imageUrl || '/images/ac-servicing-hero.png'}
          rating={4.8}
          reviewCount={350}
          title={categoryData.name}
          description={categoryData.description || `Professional ${categoryData.name.toLowerCase()} services at your doorstep`}
          badges={badges}
        />

        {/* Service Listings Section */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            {services.length > 0 ? (
              <ServiceListings
                sectionTitle={`${categoryData.name} Services`}
                sectionDescription={`Browse all available ${categoryData.name.toLowerCase()} services`}
                categorySlug={category}
                services={services.map(service => ({
                  id: service.id,
                  title: service.name,
                  description: service.description || '',
                  rating: service.rating,
                  reviewCount: service.reviewCount,
                  duration: `${Math.floor(service.duration / 60)} hrs`,
                  price: service.basePrice,
                  image: service.imageUrl || '/images/service-placeholder.png',
                }))}
              />
            ) : (
              <div className="text-center py-12">
                <h3 className="font-roboto-condensed text-2xl text-[#0b1c30] mb-4">
                  {categoryData.name} Services
                </h3>
                <p className="font-poppins text-base text-[#64748b] mb-6">
                  Services in this category are coming soon. Check back later!
                </p>
                <button
                  onClick={() => router.push('/services')}
                  className="bg-[#02368c] text-white px-6 py-3 rounded-lg hover:bg-[#024189] transition-colors"
                >
                  Browse All Categories
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
