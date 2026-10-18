'use client';

import { useState } from 'react';
import { IssueAccordion } from './IssueAccordion';
import { BookingSummary } from './BookingSummary';

export interface IssuesPageContentProps {
  onContinue: () => void;
  onCheckout: () => void;
  className?: string;
}

export function IssuesPageContent({
  onContinue,
  onCheckout,
  className = '',
}: IssuesPageContentProps) {
  const [expandedItems, setExpandedItems] = useState(['ac-service']);

  const handleToggle = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleChangeStep = (stepIndex: number) => {
    console.log('Change step:', stepIndex);
    // TODO: Navigate to respective step
  };

  const accordionItems = [
    {
      id: 'ac-service',
      title: 'AC Service',
      description: 'A clear description helps your provider prepare the right tools and arrive ready.',
      isExpanded: expandedItems.includes('ac-service'),
      quickSuggestions: [
        { id: '1', label: 'No cooling' },
        { id: '2', label: 'Strange noise' },
        { id: '3', label: 'Water leaking' },
      ],
    },
    {
      id: 'home-cleaning',
      title: 'Home Cleaning',
      isExpanded: expandedItems.includes('home-cleaning'),
    },
  ];

  const service = {
    id: 'foam-jet',
    title: 'Foam-Jet AC Service',
    price: 499,
    duration: '60–90 min service',
  };

  const reviewSteps = [
    {
      icon: '/images/icons/checkmark-circle.svg',
      title: 'Reported Issue',
      value: 'No cooling, water leaking',
    },
    {
      icon: '/images/icons/location-pin.svg',
      title: 'Service Location',
      value: '8-A Light Industrial Area, ITI Rd',
      subtext: 'Jodhpur, RJ · 342003',
    },
    {
      icon: '/images/icons/calendar.svg',
      title: 'Scheduled Slot',
      value: 'Select at Review step',
    },
  ];

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Issue Form */}
            <div className="flex-1 flex flex-col gap-8">
              <IssueAccordion
                items={accordionItems}
                onToggle={handleToggle}
              />

              {/* Continue Button */}
              <button
                onClick={onContinue}
                className="
                  bg-[#02368c]
                  w-full max-w-[512px]
                  px-6 py-4
                  rounded-xl
                  flex items-center justify-center gap-2
                  font-roboto-condensed font-medium text-base
                  text-white text-center
                  leading-[24px]
                  hover:bg-[#024189] transition-colors
                "
              >
                Continue
              </button>
            </div>

            {/* Right Column - Booking Summary (Sticky) */}
            <div className="lg:w-[420px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <BookingSummary
                  service={service}
                  reviewSteps={reviewSteps}
                  platformFee={45}
                  onCheckout={onCheckout}
                  onChangeStep={handleChangeStep}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
