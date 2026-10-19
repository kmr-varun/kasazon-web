import Image from 'next/image';

export interface FeatureItemProps {
  icon: string;
  text: string;
  className?: string;
}

export function FeatureItem({ icon, text, className = '' }: FeatureItemProps) {
  return (
    <div className={`flex items-center justify-center gap-2.5 ${className}`}>
      {/* Icon */}
      <div className="relative w-6 h-6 flex-shrink-0">
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
        text-sm sm:text-base lg:text-lg
        tracking-[0.05em]
        whitespace-nowrap
      ">
        {text}
      </p>
    </div>
  );
}
