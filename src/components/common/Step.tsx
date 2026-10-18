export interface StepProps {
  number: string;
  title: string;
  description: string;
  className?: string;
}

export function Step({ number, title, description, className = '' }: StepProps) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Number Circle */}
      <div className="
        flex items-center justify-center
        w-[70px] h-[70px]
        rounded-full
        bg-[#02368c]
      ">
        <span className="font-poppins text-white text-xl leading-normal">
          {number}
        </span>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-1.5 pt-1.5">
        {/* Title */}
        <h3 className="
          font-poppins font-semibold text-[#111] text-lg
          text-center leading-normal
        ">
          {title}
        </h3>

        {/* Description */}
        <p className="
          font-poppins text-[#777] text-sm
          text-center leading-normal
        ">
          {description}
        </p>
      </div>
    </div>
  );
}
