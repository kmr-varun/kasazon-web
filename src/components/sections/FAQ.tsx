import { FAQItem } from '../common/FAQItem';

export interface FAQProps {
  className?: string;
}

const faqs = [
  {
    question: 'What services can I book through Kasazon?',
    answer: 'You can book a wide range of home services including cleaning, plumbing, electrical repairs, AC servicing, painting, carpentry, beauty services, and more. We connect you with trusted professionals for both quick services and multi-day projects.',
  },
  {
    question: 'How do I book a service?',
    answer: 'Simply search for the service you need, browse through verified professionals, compare ratings and prices, select your preferred provider, choose a convenient date and time, and confirm your booking. You\'ll receive instant confirmation and can track your service in real-time.',
  },
  {
    question: 'Are the professionals verified?',
    answer: 'Yes, all professionals on Kasazon go through a thorough verification process. We verify their identity, check their credentials, review their past work, and monitor customer ratings to ensure you receive quality service from trusted professionals.',
  },
  {
    question: 'How does payment work?',
    answer: 'Kasazon offers secure payment options including credit/debit cards, digital wallets, and cash on delivery. You can see the price upfront before booking. Payment is processed securely through our platform, and you only pay after the service is completed to your satisfaction.',
  },
];

export function FAQ({ className = '' }: FAQProps) {
  return (
    <section className={`bg-[#f2f3f9] ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        {/* Title */}
        <div className="mb-16 lg:mb-24">
          <h2 className="
            font-roboto-condensed font-normal text-black text-center
            text-4xl sm:text-5xl lg:text-6xl
            leading-tight
          ">
            Everything You Need to Know
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
