import { FeatureItem } from '../common/FeatureItem';

export interface FeaturesBarProps {
  className?: string;
}

const features = [
  {
    icon: '/images/icons/feature-trusted.svg',
    text: 'Trusted Professionals',
  },
  {
    icon: '/images/icons/feature-secure.svg',
    text: 'Secure Payments',
  },
  {
    icon: '/images/icons/feature-booking.svg',
    text: 'Easy Booking',
  },
  {
    icon: '/images/icons/feature-pricing.svg',
    text: 'Transparent Pricing',
  },
];

export function FeaturesBar({ className = '' }: FeaturesBarProps) {
  return (
    <section className={`bg-[#CF9D00] border-t border-[rgba(21,58,99,0.1)] ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-8">
        <div className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-8 lg:gap-12
          items-center justify-items-center
        ">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              text={feature.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
