"use client";

import { useDestinations } from "@/app/contexts/DestinationsContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HeadingText from "../TextModules/HeadingText";

const stars = (
  <svg
    width="67"
    height="74"
    viewBox="0 0 67 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Your SVG Path here */}
  </svg>
);

const TestimonialCarousel = () => {
  const { testimonials } = useDestinations();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
        );
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="customWidth overflow-hidden py-16">
      <HeadingText
        customWidth={true}
        heading2="What our clients said about us"
        heading3="Testimonials"
      />
      <div className="w-11/12 mx-auto">
        {testimonials.length > 0 && (
          <motion.div
            ref={carouselRef}
            className="flex cursor-pointer"
            drag="x"
            dragConstraints={{ right: 0, left: -carouselWidth }}
            initial={{ x: 0 }}
            animate={{ x: [0, -carouselWidth / 4, 0] }}
            transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] p-4 m-4 bg-backgroundColor rounded-lg shadow-sm relative"
                whileHover={{ translateY: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="absolute -top-7 right-7">{stars}</span>
                <div className="flex gap-4 items-center">
                  {testimonial.testimonial_image && (
                    <Image
                      src={testimonial.testimonial_image}
                      alt={testimonial.persons_description}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-xl"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-2xl">
                      {testimonial.testimonial_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.persons_description}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mt-2 max-w-[30rem]">
                  {testimonial.testimonial_text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
