import { TestimonialCard } from '../common/TestimonialCard';

export interface TestimonialsProps {
  className?: string;
}

const testimonials = [
  {
    quote: '"Kasazon made booking a home service incredibly easy. I found a professional quickly, knew the price upfront, and the service was excellent."',
    name: 'Ananya Rao',
    location: 'Bengaluru',
    avatar: '/images/testimonials/avatar-1.png',
  },
  {
    quote: '"I needed an urgent plumbing repair and was able to book a reliable professional within minutes. Very smooth experience from start to finish."',
    name: 'Dr. Vikram Sethi',
    location: 'New Delhi',
    avatar: '/images/testimonials/avatar-2.png',
  },
  {
    quote: '"The project tracking feature made my home painting project so much easier to manage. I could see the progress and stay updated throughout."',
    name: 'Meher Kapoor',
    location: 'Mumbai',
    avatar: '/images/testimonials/avatar-3.png',
  },
];

export function Testimonials({ className = '' }: TestimonialsProps) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        {/* Title */}
        <div className="mb-12 lg:mb-14">
          <h2 className="
            font-roboto-condensed font-normal text-black text-center
            text-4xl sm:text-5xl lg:text-6xl
            leading-tight
          ">
            Testimonials
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          gap-6 lg:gap-7
        ">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              location={testimonial.location}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
