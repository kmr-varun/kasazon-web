import Image from 'next/image';
import { Step } from '../common/Step';

export interface HowItWorksProps {
  className?: string;
}

const steps = [
  {
    number: '01',
    title: 'Choose a Service',
    description: 'Find what you need.',
  },
  {
    number: '02',
    title: 'Select a Professional',
    description: 'Compare professionals and choose the right one.',
  },
  {
    number: '03',
    title: 'Schedule Your Service',
    description: 'Pick a convenient date and time.',
  },
  {
    number: '04',
    title: 'Get It Done',
    description: 'Sit back while your professional handles the job.',
  },
];

export function HowItWorks({ className = '' }: HowItWorksProps) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        {/* Title */}
        <div className="mb-12 lg:mb-14">
          <h2 className="
            font-roboto-condensed font-normal text-black text-center
            text-4xl sm:text-5xl lg:text-6xl
            leading-tight
          ">
            How It Works
          </h2>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line - Hidden on mobile */}
          <div className="
            hidden lg:block
            absolute top-[35px] left-[12%] right-[12%]
            h-[2px]
            pointer-events-none
          ">
            <div className="w-full h-full border-t-2 border-dashed border-[#02368c]/30" />
          </div>

          {/* Steps Grid */}
          <div className="
            relative z-10
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            gap-8 lg:gap-6
          ">
            {steps.map((step, index) => (
              <Step
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
