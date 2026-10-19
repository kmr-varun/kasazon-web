'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceCard } from '../common/ServiceCard';

export interface ServicesProps {
  className?: string;
}

const services = [
  {
    image: '/images/services/electrician.png',
    title: 'Electrician',
    slug: 'electrical',
  },
  {
    image: '/images/services/plumber.png',
    title: 'Plumber',
    slug: 'plumbing',
  },
  {
    image: '/images/services/carpenter.png',
    title: 'Carpenter',
    slug: 'carpentry',
  },
  {
    image: '/images/services/ac-repair.png',
    title: 'AC Repair',
    slug: 'ac-servicing',
  },
  {
    image: '/images/services/painter.png',
    title: 'Painter',
    slug: 'painting',
  },
  {
    image: '/images/services/beauty.png',
    title: 'Beauty',
    slug: 'cleaning',
  },
];

export function Services({ className = '' }: ServicesProps) {
  const router = useRouter();

  const handleServiceClick = (slug: string) => {
    router.push(`/services/${slug}`);
  };

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-12 lg:mb-14">
          {/* Title */}
          <h2 className="
            font-roboto-condensed font-normal text-black text-center
            text-4xl sm:text-5xl lg:text-6xl
            leading-tight
          ">
            Services
          </h2>

          {/* View All Link - Desktop */}
          <Link
            href="/services"
            className="
              absolute right-0 top-1/2 -translate-y-1/2
              hidden lg:flex
              items-center gap-0.5
              group
            "
          >
            <span className="
              font-roboto font-normal uppercase underline
              text-[#0045af] text-base
              tracking-[0.1em]
              group-hover:opacity-80
              transition-opacity
            ">
              View All
            </span>
            <div className="relative w-[18px] h-[18px]">
              <Image
                src="/images/icons/arrow-right.svg"
                alt="Arrow"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Service Cards Grid */}
        <div className="
          grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
          gap-6 sm:gap-8 lg:gap-4
        ">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              image={service.image}
              title={service.title}
              onClick={() => handleServiceClick(service.slug)}
            />
          ))}
        </div>

        {/* View All Link - Mobile */}
        <div className="flex justify-center mt-8 lg:hidden">
          <Link
            href="/services"
            className="
              flex items-center gap-1
              group
            "
          >
            <span className="
              font-roboto font-normal uppercase underline
              text-[#0045af] text-sm
              tracking-[0.1em]
              group-hover:opacity-80
              transition-opacity
            ">
              View All
            </span>
            <div className="relative w-[16px] h-[16px]">
              <Image
                src="/images/icons/arrow-right.svg"
                alt="Arrow"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
