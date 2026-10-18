import Image from 'next/image';

export interface FeatureItemProps {
  icon: string;
  text: string;
  className?: string;
}

export function FeatureItem({ icon, text, className = '' }: FeatureItemProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative w-8 h-8 flex-shrink-0">
        <Image
          src={icon}
          alt={text}
          fill
          className="object-contain"
        />
      </div>

      {/* Text */}
      <p className="
        font-poppins font-semibold text-white uppercase
        text-lg sm:text-xl lg:text-2xl
        tracking-[0.075em]
        whitespace-nowrap
      ">
        {text}
      </p>
    </div>
  );
}
