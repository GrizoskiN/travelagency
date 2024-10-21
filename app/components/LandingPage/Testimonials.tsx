'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Testimonials data (simplified)
const testimonials = [
  {
    name: 'Michael R.',
    location: 'Traveller, Santorini, Greece',
    text: 'The team at GlobeQuest was amazing! I was nervous about planning a honeymoon in Greece, but they made the entire process stress-free and fun.',
  },
  {
    name: 'Sarah W.',
    location: 'Traveller, Paris, France',
    text: 'TravelSphere made my dream trip to Europe a reality! From booking the perfect hotels to planning unforgettable sightseeing tours.',
  },
  {
    name: 'Emily L.',
    location: 'Traveller, Rome, Italy',
    text: 'Our family trip to Europe was extraordinary thanks to TravelSphere. They tailored every part of our vacation, making sure we had activities for all ages.',
  },
  {
    name: 'James D.',
    location: 'Traveller, London, UK',
    text: 'The perfect European vacation! Everything was handled smoothly, from hotel bookings to city tours.',
  },
  {
    name: 'Laura K.',
    location: 'Traveller, Barcelona, Spain',
    text: 'Absolutely loved my trip to Spain! The personalized recommendations and planning made everything seamless and enjoyable.',
  },
  {
    name: 'Tom H.',
    location: 'Traveller, Berlin, Germany',
    text: 'Berlin was incredible! The planning was perfect, and we got to see all the best spots without any stress.',
  },
  {
    name: 'Anna P.',
    location: 'Traveller, Vienna, Austria',
    text: 'Vienna was beautiful, and TravelSphere made sure our experience was nothing short of magical.',
  },
];

const TestimonialCarousel = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(
        carousel.current.scrollWidth - carousel.current.offsetWidth + 200 // Add some padding to ensure the smooth loop
      );
    }
  }, []);

  return (
    <div className="w-full overflow-hidden py-16">
      <motion.div
        ref={carousel}
        className="flex cursor-grab"
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        initial={{ x: 0 }}
        animate={{ x: [0, -width / 2, 0] }}
        transition={{ ease: "linear", duration: 200, repeat: Infinity }}
      >
        {testimonials.concat(testimonials).map((testimonial, index) => (
          <motion.div
            key={index}
            className="min-w-[300px] p-4 m-4 bg-white rounded-lg shadow-md"
            whileHover={{ translateY: -30 }}
            whileTap={{ y:-20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-bold text-lg">{testimonial.name}</h3>
            <p className="text-sm text-gray-500">{testimonial.location}</p>
            <p className="text-gray-700 mt-2">{testimonial.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialCarousel;
