import Image from 'next/image';

export interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  avatar: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  quote,
  name,
  location,
  avatar,
  rating = 5,
  className = '',
}: TestimonialCardProps) {
  return (
    <div className={`
      bg-[#f2f3f9] border border-[rgba(21,58,99,0.1)]
      rounded-3xl p-8
      flex flex-col
      h-full
      ${className}
    `}>
      {/* Quote Icon */}
      <div className="relative w-[30px] h-[30px] mb-6">
        <Image
          src="/images/icons/quote.svg"
          alt="Quote"
          fill
          className="object-contain"
        />
      </div>

      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-6">
        {Array.from({ length: rating }).map((_, index) => (
          <div key={index} className="relative w-4 h-4">
            <Image
              src="/images/icons/star.png"
              alt="Star"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Quote Text */}
      <p className="
        font-roboto-condensed font-normal text-[#111]
        text-base lg:text-lg
        leading-relaxed
        mb-6
        flex-grow
      ">
        {quote}
      </p>

      {/* Customer Info */}
      <div className="flex items-center gap-3 pt-6 border-t border-[rgba(21,58,99,0.1)]">
        {/* Avatar */}
        <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Name and Location */}
        <div className="flex flex-col">
          <span className="font-poppins text-[#02368c] text-sm leading-normal">
            {name}
          </span>
          <span className="font-poppins text-[#111] text-xs leading-normal">
            {location}
          </span>
        </div>
      </div>
    </div>
  );
}
