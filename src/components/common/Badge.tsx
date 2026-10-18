import Image from 'next/image';

export interface BadgeProps {
  icon: string;
  text: string;
  className?: string;
}

export function Badge({ icon, text, className = '' }: BadgeProps) {
  // Split text into two lines if it contains a space
  const lines = text.split(' ');
  const hasMultipleLines = lines.length > 1;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon Background */}
      <div className="
        flex items-center justify-center
        w-8 h-8 rounded-lg
        bg-[#eff6ff]
        flex-shrink-0
      ">
        <div className="relative w-4 h-4">
          <Image
            src={icon}
            alt={text}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        {hasMultipleLines ? (
          <>
            <span className="font-poppins text-sm text-white leading-none">
              {lines[0]}
            </span>
            <span className="font-poppins text-sm text-white leading-none">
              {lines[1]}
            </span>
          </>
        ) : (
          <span className="font-poppins text-sm text-white leading-none">
            {text}
          </span>
        )}
      </div>
    </div>
  );
}
