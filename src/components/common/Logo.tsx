import Image from 'next/image';
import { colors } from '@/src/theme';

export interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <div className="relative w-[30px] h-[29px]">
        <Image
          src="/images/icons/logo.svg"
          alt="Kasazon Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col items-center gap-0.5">
          <p
            className="font-against text-[10.5px] tracking-[0.2em] uppercase not-italic"
            style={{ color: colors.text.secondary }}
          >
            Kasazon
          </p>
          <p
            className="font-roboto-condensed font-normal text-[3.3px] tracking-[0.2em] uppercase"
            style={{ color: colors.accent.gold }}
          >
            GLOBAL TRUST
          </p>
        </div>
      )}
    </div>
  );
}
