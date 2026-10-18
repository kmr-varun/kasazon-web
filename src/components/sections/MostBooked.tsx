'use client';

import Image from 'next/image';

interface MostBookedService {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
}

export interface MostBookedProps {
  services: MostBookedService[];
  onAddService: (serviceId: string) => void;
  className?: string;
}

export function MostBooked({
  services,
  onAddService,
  className = '',
}: MostBookedProps) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        <div className="max-w-[1700px] mx-auto">
          {/* Section Title */}
          <div className="flex flex-col items-center mb-14">
            <h2 className="
              font-roboto-condensed font-normal text-5xl lg:text-[64px]
              text-black text-center
              leading-[52.8px]
            ">
              Most Booked
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col gap-5"
              >
                {/* Image */}
                <div className="
                  relative w-full h-[300px] sm:h-[400px] lg:h-[470px]
                  rounded-2xl overflow-hidden
                  bg-[#f6ecdd]
                ">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4">
                  {/* Title & Rating */}
                  <div className="flex flex-col gap-0.5">
                    <h3 className="
                      font-poppins text-[19.2px]
                      text-black leading-[28.8px]
                    ">
                      {service.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="relative w-[16px] h-[16px]">
                          <Image
                            src="/images/icons/star-rating-small.png"
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="
                          font-poppins text-[12.5px]
                          text-[rgba(21,58,99,0.8)]
                          leading-[18.72px]
                        ">
                          {service.rating}
                        </span>
                      </div>
                      <span className="
                        font-poppins text-[11.5px]
                        text-[#6b7280]
                        leading-[17.28px]
                      ">
                        ({service.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Price & Add Button */}
                  <div className="flex flex-col gap-1.5">
                    <span className="
                      font-poppins text-[11.5px]
                      text-[#6b7280]
                      leading-[17.28px]
                    ">
                      Starts at
                    </span>

                    <div className="flex items-center justify-between">
                      <p className="
                        font-roboto-condensed font-normal text-[17.6px]
                        text-[#02368c]
                        leading-[26.4px]
                      ">
                        ₵{service.startingPrice}
                      </p>

                      <button
                        onClick={() => onAddService(service.id)}
                        className="
                          bg-[#02368c]
                          h-[30px] px-6
                          rounded flex items-center justify-center gap-0.5
                          hover:bg-[#024189] transition-colors
                        "
                      >
                        <div className="relative w-[15px] h-[15px]">
                          <Image
                            src="/images/icons/add-button.svg"
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="
                          font-roboto-condensed text-xs text-white
                        ">
                          Add
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
