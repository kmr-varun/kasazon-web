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
        flex flex-col items-center gap-5
        cursor-pointer
        transition-transform duration-200
        hover:scale-105
        ${className}
      `}
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
      ">
        {title}
      </p>
    </div>
  );
}
