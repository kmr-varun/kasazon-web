'use client';

import { InfoCard } from '../common/InfoCard';

export interface ServiceTypesProps {
  className?: string;
}

export function ServiceTypes({ className = '' }: ServiceTypesProps) {
  return (
    <section className={`bg-[#f2f3f9] ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Quick Services Card */}
          <InfoCard
            backgroundImage="/images/quick-services-bg.png"
            badge={{
              icon: '/images/lightning.svg',
              text: 'Quick Services',
            }}
            title="Need a Job Done Today?"
            description="Book trusted professionals for everyday services like cleaning, plumbing, electrical repairs, AC servicing, and more."
            buttonText="Explore Quick Services"
          />

          {/* Projects & Contracts Card */}
          <InfoCard
            backgroundImage="/images/projects-bg.png"
            title="Projects & Contracts"
            description="Manage painting, renovation, maintenance, installation, and other multi-day projects with ease."
            buttonText="Explore Projects"
          />
        </div>
      </div>
    </section>
  );
}
