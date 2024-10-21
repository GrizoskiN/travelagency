'use client';

import { useDestinations } from '@/app/contexts/DestinationsContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const TestimonialCarousel = () => {
  const { testimonials } = useDestinations();
  const carousel = useRef<HTMLDivElement>(null);
  const width = testimonials.length * 320; // Assuming each card is about 320px wide

  // Debugging console logs to verify data
  console.log('Testimonials:', testimonials);

  return (
    <div className="w-full overflow-hidden py-16">
      {testimonials.length > 0 && (
        <motion.div
          ref={carousel}
          className="flex cursor-grab"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          initial={{ x: 0 }}
          animate={{ x: [0, -width / 2, 0] }}
          transition={{ ease: 'linear', duration: 200, repeat: Infinity }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="min-w-[300px] p-4 m-4 bg-white rounded-lg shadow-md"
              whileHover={{ translateY: -30 }}
              whileTap={{ y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {testimonial.testimonial_image && (
                <Image
                  src={testimonial.testimonial_image}
                  alt={testimonial.persons_description}
                  width={96} // Providing a width for the Image component
                  height={96} // Providing a height for the Image component
                  className="w-24 h-24 rounded-full mb-4"
                />
              )}
              <h3 className="font-bold text-lg">{testimonial.testimonial_name}</h3>
              <p className="text-sm text-gray-500">{testimonial.persons_description}</p>
              <p className="text-gray-700 mt-2">{testimonial.testimonial_text}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
