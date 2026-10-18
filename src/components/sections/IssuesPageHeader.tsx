export interface IssuesPageHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function IssuesPageHeader({
  title,
  description,
  className = '',
}: IssuesPageHeaderProps) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 pt-16 lg:pt-24 pb-12 lg:pb-16">
        <div className="max-w-[1700px] mx-auto">
          <div className="flex flex-col gap-2">
            <h1 className="
              font-roboto-condensed font-medium
              text-4xl lg:text-[40px]
              text-[#0b1c30] tracking-[-1px] leading-[48px]
            ">
              {title}
            </h1>
            <p className="
              font-poppins text-lg text-[#424655]
              leading-normal max-w-[780px]
            ">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
