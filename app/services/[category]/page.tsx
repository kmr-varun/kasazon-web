'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header, Footer } from "@/src/components/layout";
import { ServiceHero, ServiceCategoryNav, FilterSortBar, ServiceListings, ServiceCategoryPills, ServiceFilterSort } from "@/src/components/sections";
import { api } from '@/src/lib/api';
import type { Service, ServiceCategory } from '@/src/lib/types';

export default function ServiceCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;

  const [categoryData, setCategoryData] = useState<ServiceCategory | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and sort state
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({ price: 'all' });
  const [activeSortId, setActiveSortId] = useState<string>('recommended');

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
        setFilteredServices(servicesData);
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

  // Filter and sort services
  useEffect(() => {
    let result = [...services];

    // Filter by subcategory from pills
    if (activeSubCategory && activeSubCategory !== 'all') {
      const categoryLower = activeSubCategory.toLowerCase();
      result = result.filter(service => {
        const nameLower = service.name.toLowerCase();

        // More specific matching for each category type
        if (categoryLower === 'repair') {
          return nameLower.includes('repair') && !nameLower.includes('installation') && !nameLower.includes('uninstall');
        }
        if (categoryLower === 'installation') {
          return (nameLower.includes('installation') || nameLower.includes('install')) && !nameLower.includes('uninstall');
        }
        if (categoryLower === 'uninstallation') {
          return nameLower.includes('uninstall');
        }
        if (categoryLower === 'maintenance') {
          return (nameLower.includes('maintenance') || nameLower.includes('servicing')) && !nameLower.includes('repair') && !nameLower.includes('install');
        }
        if (categoryLower === 'cleaning') {
          return nameLower.includes('cleaning') || nameLower.includes('clean');
        }

        // Default: check if category name is in service name
        return nameLower.includes(categoryLower);
      });
    }

    // Filter by service type
    if (activeFilters.serviceType && activeFilters.serviceType !== 'all') {
      const filterLower = activeFilters.serviceType.toLowerCase();
      result = result.filter(service => {
        const nameLower = service.name.toLowerCase();
        return nameLower.includes(filterLower);
      });
    }

    // Filter by AC type
    if (activeFilters.acType && activeFilters.acType !== 'all') {
      const filterLower = activeFilters.acType.toLowerCase();
      result = result.filter(service => {
        const nameLower = service.name.toLowerCase();
        const descLower = (service.description || '').toLowerCase();
        return nameLower.includes(filterLower) || descLower.includes(filterLower);
      });
    }

    // Filter by price
    if (activeFilters.price && activeFilters.price !== 'all') {
      result = result.filter(service => {
        const price = service.basePrice;
        if (activeFilters.price === 'low') return price < 50;
        if (activeFilters.price === 'medium') return price >= 50 && price <= 100;
        if (activeFilters.price === 'high') return price > 100;
        return true;
      });
    }

    // Sort services
    if (activeSortId === 'price-low') {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (activeSortId === 'price-high') {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else if (activeSortId === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    // 'recommended' keeps the original order

    setFilteredServices(result);
  }, [services, activeSubCategory, activeFilters, activeSortId]);

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

  // Service categories for pills navigation - ALWAYS show all options
  const serviceCategories = [
    { id: 'all', label: 'All Services', icon: '/images/services/ac-service-icon.svg' },
    { id: 'repair', label: 'Repair & Gas Refill', icon: '/images/services/repair-icon.svg' },
    { id: 'installation', label: 'Installation', icon: '/images/services/installation-icon.svg' },
    { id: 'uninstallation', label: 'Uninstallation', icon: '/images/services/uninstallation-icon.svg' },
    { id: 'maintenance', label: 'AC Maintenance', icon: '/images/services/maintenance-icon.svg' },
  ];

  // Filters for the filter/sort bar - ALWAYS show all options
  const filters = {
    serviceType: [
      { id: 'all', label: 'All Services' },
      { id: 'cleaning', label: 'Cleaning' },
      { id: 'repair', label: 'Repair' },
      { id: 'installation', label: 'Installation' },
    ],
    acType: [
      { id: 'all', label: 'All AC Types' },
      { id: 'split', label: 'Split AC' },
      { id: 'window', label: 'Window AC' },
      { id: 'central', label: 'Central AC' },
    ],
    price: [
      { id: 'all', label: 'All Prices' },
      { id: 'low', label: 'Under $50' },
      { id: 'medium', label: '$50 - $100' },
      { id: 'high', label: 'Above $100' },
    ],
  };

  // Handlers
  const handleCategoryChange = (categoryId: string) => {
    console.log('Category changed to:', categoryId);
    setActiveSubCategory(categoryId);
  };

  const handleFilterChange = (filterType: string, filterId: string) => {
    console.log('Filter changed:', filterType, '=', filterId);
    setActiveFilters(prev => {
      const newFilters = { ...prev, [filterType]: filterId };
      console.log('New filters state:', newFilters);
      return newFilters;
    });
  };

  const handleSortChange = (sortId: string) => {
    console.log('Sort changed to:', sortId);
    setActiveSortId(sortId);
  };

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

        {/* Service Category Pills */}
        <ServiceCategoryPills
          categories={serviceCategories}
          activeCategory={activeSubCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Filter and Sort Bar */}
        <ServiceFilterSort
          title={categoryData.name}
          serviceCount={filteredServices.length}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />

        {/* Service Listings Section */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            {filteredServices.length > 0 ? (
              <ServiceListings
                sectionTitle="Super Saver Packages"
                sectionDescription="Bundled deep cleaning packages tailored for multiple rooms"
                categorySlug={category}
                services={filteredServices.map(service => ({
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
            ) : services.length > 0 ? (
              <div className="text-center py-12">
                <h3 className="font-roboto-condensed text-2xl text-[#0b1c30] mb-4">
                  No services found
                </h3>
                <p className="font-poppins text-base text-[#64748b] mb-6">
                  No services match your current filters. Try adjusting your filters or browse all services.
                </p>
                <button
                  onClick={() => {
                    setActiveSubCategory('all');
                    setActiveFilters({});
                    setActiveSortId('recommended');
                  }}
                  className="bg-[#02368c] text-white px-6 py-3 rounded-lg hover:bg-[#024189] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
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
