'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '@/src/components/layout';
import { api } from '@/src/lib/api';
import type { Service } from '@/src/lib/types';

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';

  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const results = await api.services.search(query);
        setServices(results);
      } catch (err) {
        console.error('Error searching services:', err);
        setError(err instanceof Error ? err.message : 'Failed to search services');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleServiceClick = (service: Service) => {
    const categorySlug = service.categoryName.toLowerCase().replace(/\s+/g, '-');
    router.push(`/services/${categorySlug}/${service.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#02368c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-poppins text-lg text-[#64748b]">Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <h2 className="font-roboto-condensed text-2xl text-[#0f172a] mb-4">
            Search Error
          </h2>
          <p className="font-poppins text-base text-[#64748b] mb-6">
            {error}
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-[#02368c] text-white px-6 py-3 rounded-lg hover:bg-[#024189] transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <h2 className="font-roboto-condensed text-2xl text-[#0f172a] mb-4">
            Enter a search query
          </h2>
          <p className="font-poppins text-base text-[#64748b] mb-6">
            Search for services like cleaning, plumbing, electrical, and more
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-[#02368c] text-white px-6 py-3 rounded-lg hover:bg-[#024189] transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="font-roboto-condensed text-4xl text-[#0f172a] mb-2">
            Search Results
          </h1>
          <p className="font-poppins text-lg text-[#64748b]">
            {services.length} {services.length === 1 ? 'result' : 'results'} for "{query}"
          </p>
        </div>

        {/* Results */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-md transition-shadow"
              >
                {/* Service Image */}
                <div className="relative h-48 rounded-lg overflow-hidden mb-4 bg-gray-100">
                  {service.imageUrl ? (
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#777] text-sm">
                      No image
                    </div>
                  )}
                </div>

                {/* Service Info */}
                <div className="space-y-2">
                  <h3 className="font-poppins font-medium text-lg text-[#111]">
                    {service.name}
                  </h3>

                  {service.description && (
                    <p className="font-poppins text-sm text-[#777] line-clamp-2">
                      {service.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/star-filled.png"
                        alt="Rating"
                        width={16}
                        height={16}
                      />
                      <span className="font-poppins text-sm text-[#777]">
                        {Number(service.rating).toFixed(1)}
                      </span>
                    </div>
                    <span className="font-poppins text-sm text-[#777]">
                      ({service.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="font-poppins text-xs text-[#777]">Starts at </span>
                      <span className="font-poppins font-semibold text-lg text-[#111]">
                        ₵{service.basePrice}
                      </span>
                    </div>
                    <span className="font-poppins text-xs text-[#02368c] px-3 py-1 bg-[#eff4ff] rounded-full">
                      {service.categoryName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 opacity-20">
              <Image
                src="/images/icons/search.svg"
                alt="No results"
                width={80}
                height={80}
              />
            </div>
            <h2 className="font-roboto-condensed text-2xl text-[#0f172a] mb-2">
              No results found
            </h2>
            <p className="font-poppins text-base text-[#64748b] mb-6">
              Try searching with different keywords or browse our categories
            </p>
            <Link
              href="/services"
              className="inline-block bg-[#02368c] text-white px-6 py-3 rounded-lg hover:bg-[#024189] transition-colors"
            >
              Browse All Services
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Suspense fallback={
          <div className="flex items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-[#02368c] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
