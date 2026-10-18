import { TestimonialCard } from '../common/TestimonialCard';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
}

export interface ServiceTestimonialsProps {
  testimonials: Testimonial[];
  className?: string;
}

export function ServiceTestimonials({
  testimonials,
  className = '',
}: ServiceTestimonialsProps) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        <div className="max-w-[1700px] mx-auto">
          {/* Section Title */}
          <div className="flex flex-col items-center mb-14">
            <h2 className="
              font-roboto-condensed font-normal text-5xl lg:text-[64px]
              text-black text-center
              leading-[52.8px]
            ">
              Testimonials
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                name={testimonial.name}
                location={testimonial.location}
                avatar={testimonial.avatar}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
