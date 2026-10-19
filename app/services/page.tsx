import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from "@/src/components/layout";
import type { ServiceCategory } from "@/src/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// Map category slugs to local images
const categoryImages: Record<string, string> = {
  'electrical': '/images/services/electrician.png',
  'plumbing': '/images/services/plumber.png',
  'carpentry': '/images/services/carpenter.png',
  'ac-servicing': '/images/services/ac-repair.png',
  'painting': '/images/services/painter.png',
  'cleaning': '/images/services/beauty.png',
};

// Display names mapping
const displayNames: Record<string, string> = {
  'electrical': 'Electrician',
  'plumbing': 'Plumber',
  'carpentry': 'Carpenter',
  'ac-servicing': 'AC Repair',
  'painting': 'Painter',
  'cleaning': 'Beauty',
};

async function getCategories(): Promise<ServiceCategory[]> {
  const res = await fetch(`${API_BASE_URL}/services/categories`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
}

function ServiceCard({
  image,
  title,
  href
}: {
  image: string;
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        flex flex-col items-center gap-5
        cursor-pointer
        transition-transform duration-200
        hover:scale-105
        group
      "
    >
      {/* Circular Icon Container */}
      <div className="
        relative
        w-[152px] h-[152px]
        rounded-full
        bg-[rgba(138,153,177,0.08)]
        border-[1.8px] border-[rgba(0,0,0,0.1)]
        flex items-center justify-center
        p-8
        group-hover:border-[#0045af]/30
        transition-colors
      ">
        <div className="relative w-[74px] h-[74px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <p className="
        font-poppins text-xl text-black text-center
        leading-normal
        group-hover:text-[#0045af]
        transition-colors
      ">
        {title}
      </p>
    </Link>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="font-roboto-condensed text-4xl text-black mb-4">
            Unable to Load Services
          </h1>
          <p className="font-poppins text-lg text-[#424655] mb-6">
            {message}
          </p>
          <Link
            href="/"
            className="
              inline-flex items-center gap-2
              font-poppins font-medium text-[#0045af]
              hover:underline
            "
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default async function ServicesPage() {
  let categories: ServiceCategory[] = [];
  let error: string | null = null;

  try {
    categories = await getCategories();
    categories.sort((a, b) => a.displayOrder - b.displayOrder);
  } catch (e) {
    error = e instanceof Error ? e.message : 'An unexpected error occurred';
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-white">
          <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
            {/* Header - Same style as home page */}
            <div className="relative flex items-center justify-center mb-12 lg:mb-14">
              <h1 className="
                font-roboto-condensed font-normal text-black text-center
                text-4xl sm:text-5xl lg:text-6xl
                leading-tight
              ">
                Services
              </h1>
            </div>

            {/* Service Cards Grid - Same layout as home page */}
            {categories.length > 0 ? (
              <div className="
                grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
                gap-6 sm:gap-8 lg:gap-4
              ">
                {categories.map((category) => (
                  <ServiceCard
                    key={category.id}
                    image={categoryImages[category.slug] || '/images/services/electrician.png'}
                    title={displayNames[category.slug] || category.name}
                    href={`/services/${category.slug}`}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-poppins text-lg text-[#424655]">
                  No service categories available at the moment.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
