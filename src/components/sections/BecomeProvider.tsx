'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '../common/Button';

export interface BecomeProviderProps {
  className?: string;
}

const benefits = [
  'Get More Customers',
  'Manage Bookings Easily',
  'Grow Your Business',
  'Secure & Reliable Payments',
];

export function BecomeProvider({ className = '' }: BecomeProviderProps) {
  const router = useRouter();

  const handleBecomeProvider = () => {
    router.push('/register/complete/professional');
  };

  const handleLearnMore = () => {
    // For now, navigate to the professional registration page
    // Later this can be changed to a dedicated info page
    router.push('/register/complete/professional');
  };

  return (
    <section className={`bg-[#f2f3f9] relative overflow-hidden ${className}`}>
      <div className="flex flex-col lg:flex-row min-h-[600px] lg:min-h-[800px]">
        {/* Left Content - Half Width with Padding */}
        <div className="w-full lg:w-1/2 flex items-center px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
          <div className="flex flex-col gap-10 lg:gap-11 max-w-2xl">
            {/* Title */}
            <h2 className="
              font-roboto-condensed font-semibold text-black
              text-4xl sm:text-5xl lg:text-6xl
              leading-tight lg:leading-[1.25]
            ">
              Turn Your Skills Into Opportunities
            </h2>

            {/* Description */}
            <p className="
              font-poppins text-[#777]
              text-lg lg:text-xl
              leading-relaxed
            ">
              Grow your business by connecting with customers who are looking for trusted professionals. Whether you offer cleaning, repairs, beauty services, painting, or specialized home services, WallKas gives you the tools to manage bookings, showcase your skills, and get paid securely.
            </p>

            {/* Benefits Section */}
            <div className="flex flex-col gap-6">
              <h3 className="
                font-roboto-condensed font-normal text-[#111]
                text-2xl lg:text-3xl
                leading-tight
              ">
                Benefits:
              </h3>

              {/* Benefits List */}
              <ul className="flex flex-col gap-2">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="
                      font-poppins font-normal text-[#464646]
                      text-base lg:text-lg
                      leading-loose
                      flex items-start gap-3
                    "
                  >
                    <span className="text-[#464646] font-bold text-xl mt-0.5">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                variant="primary"
                size="md"
                onClick={handleBecomeProvider}
                className="w-full sm:w-auto min-w-[222px] normal-case"
              >
                Become a Provider
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleLearnMore}
                className="w-full sm:w-auto min-w-[222px] normal-case"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Right Image - Half Width, Full Height, No Padding */}
        <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto">
          <Image
            src="/images/providers-bg.png"
            alt="Service Providers"
            fill
            className="object-cover object-[70%_center]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
