import Image from 'next/image';

export interface ServiceCardProps {
  image: string;
  title: string;
  onClick?: () => void;
  className?: string;
}

export function ServiceCard({ image, title, onClick, className = '' }: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex flex-col items-center gap-3 lg:gap-5
        cursor-pointer
        transition-transform duration-200
        hover:scale-105
        ${className}
      `}
    >
      {/* Circular Icon Container */}
      <div className="
        relative
        w-full aspect-square max-w-[152px]
        rounded-full
        bg-[rgba(138,153,177,0.08)]
        border-[1.8px] border-[rgba(0,0,0,0.1)]
        flex items-center justify-center
        p-6 lg:p-8
      ">
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-1"
          />
        </div>
      </div>

      {/* Title */}
      <p className="
        font-poppins text-base lg:text-xl text-black text-center
        leading-normal
      ">
        {title}
      </p>
    </div>
  );
}
