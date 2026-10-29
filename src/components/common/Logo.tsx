import Image from 'next/image';

export interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = '', width = 120, height = 40 }: LogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <Image
        src="/images/icons/logo.png"
        alt="WallKas Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
