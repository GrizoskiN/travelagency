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
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.6323 61.8521C5.88832 61.4535 6.47091 61.4535 6.72692 61.8521L8.14937 64.0667C8.23746 64.2038 8.37382 64.3029 8.53147 64.3443L11.0772 65.0128C11.5354 65.1331 11.7155 65.6872 11.4155 66.0538L9.74885 68.091C9.64564 68.2172 9.59355 68.3775 9.6029 68.5402L9.75382 71.168C9.78099 71.6409 9.30966 71.9833 8.86825 71.8114L6.41577 70.8558C6.26389 70.7966 6.09533 70.7966 5.94346 70.8558L3.49097 71.8114C3.04956 71.9833 2.57823 71.6409 2.6054 71.168L2.75633 68.5402C2.76567 68.3775 2.71359 68.2172 2.61037 68.091L0.943726 66.0538C0.643755 65.6872 0.823785 65.1331 1.28198 65.0128L3.82775 64.3443C3.9854 64.3029 4.12177 64.2038 4.20986 64.0667L5.6323 61.8521Z"
      fill="#FDAE37"
    />
    <path
      d="M19.2925 61.8521C19.5485 61.4535 20.1311 61.4535 20.3871 61.8521L21.8096 64.0667C21.8977 64.2038 22.034 64.3029 22.1917 64.3443L24.7375 65.0128C25.1957 65.1331 25.3757 65.6872 25.0757 66.0538L23.4091 68.091C23.3059 68.2172 23.2538 68.3775 23.2631 68.5402L23.414 71.168C23.4412 71.6409 22.9699 71.9833 22.5285 71.8114L20.076 70.8558C19.9241 70.7966 19.7556 70.7966 19.6037 70.8558L17.1512 71.8114C16.7098 71.9833 16.2385 71.6409 16.2656 71.168L16.4165 68.5402C16.4259 68.3775 16.3738 68.2172 16.2706 68.091L14.6039 66.0538C14.304 65.6872 14.484 65.1331 14.9422 65.0128L17.488 64.3443C17.6456 64.3029 17.782 64.2038 17.8701 64.0667L19.2925 61.8521Z"
      fill="#FDAE37"
    />
    <path
      d="M32.9527 61.8521C33.2087 61.4535 33.7913 61.4535 34.0473 61.8521L35.4697 64.0667C35.5578 64.2038 35.6942 64.3029 35.8518 64.3443L38.3976 65.0128C38.8558 65.1331 39.0358 65.6872 38.7359 66.0538L37.0692 68.091C36.966 68.2172 36.9139 68.3775 36.9233 68.5402L37.0742 71.168C37.1014 71.6409 36.63 71.9833 36.1886 71.8114L33.7361 70.8558C33.5843 70.7966 33.4157 70.7966 33.2638 70.8558L30.8113 71.8114C30.3699 71.9833 29.8986 71.6409 29.9258 71.168L30.0767 68.5402C30.086 68.3775 30.034 68.2172 29.9307 68.091L28.2641 66.0538C27.9641 65.6872 28.1442 65.1331 28.6024 65.0128L31.1481 64.3443C31.3058 64.3029 31.4421 64.2038 31.5302 64.0667L32.9527 61.8521Z"
      fill="#FDAE37"
    />
    <path
      d="M46.6129 61.8521C46.8689 61.4535 47.4515 61.4535 47.7075 61.8521L49.13 64.0667C49.218 64.2038 49.3544 64.3029 49.5121 64.3443L52.0578 65.0128C52.516 65.1331 52.6961 65.6872 52.3961 66.0538L50.7294 68.091C50.6262 68.2172 50.5741 68.3775 50.5835 68.5402L50.7344 71.168C50.7616 71.6409 50.2903 71.9833 49.8488 71.8114L47.3964 70.8558C47.2445 70.7966 47.0759 70.7966 46.924 70.8558L44.4716 71.8114C44.0301 71.9833 43.5588 71.6409 43.586 71.168L43.7369 68.5402C43.7463 68.3775 43.6942 68.2172 43.591 68.091L41.9243 66.0538C41.6243 65.6872 41.8044 65.1331 42.2626 65.0128L44.8083 64.3443C44.966 64.3029 45.1024 64.2038 45.1904 64.0667L46.6129 61.8521Z"
      fill="#FDAE37"
    />
    <path
      d="M60.273 61.8521C60.5291 61.4535 61.1117 61.4535 61.3677 61.8521L62.7901 64.0667C62.8782 64.2038 63.0146 64.3029 63.1722 64.3443L65.718 65.0128C66.1762 65.1331 66.3562 65.6872 66.0562 66.0538L64.3896 68.091C64.2864 68.2172 64.2343 68.3775 64.2436 68.5402L64.3946 71.168C64.4217 71.6409 63.9504 71.9833 63.509 71.8114L61.0565 70.8558C60.9046 70.7966 60.7361 70.7966 60.5842 70.8558L58.1317 71.8114C57.6903 71.9833 57.219 71.6409 57.2461 71.168L57.3971 68.5402C57.4064 68.3775 57.3543 68.2172 57.2511 68.091L55.5845 66.0538C55.2845 65.6872 55.4645 65.1331 55.9227 65.0128L58.4685 64.3443C58.6261 64.3029 58.7625 64.2038 58.8506 64.0667L60.273 61.8521Z"
      fill="#FDAE37"
    />
    <path
      d="M11 30.3762C11 28.9926 11.1258 27.5461 11.3773 26.0367C12.7609 16.6031 17.2262 7.92422 24.773 0L28.5465 2.83008C24.0184 7.60977 21.6914 11.8863 21.5656 15.6598C21.6914 17.798 23.2637 19.3074 26.2824 20.1879C27.1629 20.4395 28.1062 20.7539 29.1125 21.1313C34.018 23.3953 36.4707 27.2316 36.4707 32.6402C36.4707 34.6527 36.0305 36.5395 35.15 38.3004C32.8859 43.0801 29.2383 45.4699 24.207 45.4699C22.4461 45.4699 20.8109 45.1555 19.3016 44.5266C13.7672 42.5141 11 37.7973 11 30.3762ZM41.3762 30.3762C41.3762 28.9926 41.502 27.5461 41.7535 26.0367C43.1371 16.6031 47.6023 7.92422 55.1492 0L58.9227 2.83008C54.3945 7.60977 52.0676 11.8863 51.9418 15.6598C52.0676 17.798 53.6398 19.3074 56.6586 20.1879C57.5391 20.4395 58.4824 20.7539 59.4887 21.1313C64.3941 23.3953 66.8469 27.2316 66.8469 32.6402C66.8469 34.6527 66.4066 36.5395 65.5262 38.3004C63.2621 43.0801 59.6145 45.4699 54.5832 45.4699C52.8223 45.4699 51.1871 45.1555 49.6777 44.5266C44.1434 42.5141 41.3762 37.7973 41.3762 30.3762Z"
      fill="#3B4E60"
    />
  </svg>
);

const TestimonialCarousel = () => {
  const { testimonials } = useDestinations();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  // Recalculate the width once the blog posts are loaded and window is resized
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
        );
      }
    };

    updateWidth(); // Run once after initial render
    window.addEventListener("resize", updateWidth); // Recalculate width on resize

    return () => window.removeEventListener("resize", updateWidth); // Cleanup listener
  }, []); // Rerun when blogPosts change

  return (
    <div className="customWidth overflow-hidden py-16 ">
      <HeadingText
        customWidth={true}
        heading2={"What our clients said about us"}
        heading3={"Testimonials"}
      />
      <div className="w-11/12 mx-auto">
        {testimonials.length > 0 && (
          <motion.div
            ref={carouselRef}
            className="flex  cursor-pointer "
            drag="x"
            dragConstraints={{ right: 0, left: -carouselWidth }}
            initial={{ x: 0 }}
            animate={{ x: [0, -carouselWidth / 4, 0] }}
            transition={{ ease: "linear", duration: 200, repeat: Infinity }}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] p-4 m-4 bg-white rounded-lg shadow-sm relative"
                whileHover={{ translateY: -30 }}
                whileTap={{ y: -20 }}
                transition={{ duration: 0.5 }}>
                <span className="absolute -top-7 right-7">{stars}</span>
                <div className="flex gap-9 items-center">
                  {testimonial.testimonial_image && (
                    <Image
                      src={testimonial.testimonial_image}
                      alt={testimonial.persons_description}
                      width={96} // Providing a width for the Image component
                      height={96} // Providing a height for the Image component
                      className="w-24 h-24 rounded-xl mb-4"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-2xl">
                      {testimonial.testimonial_name}
                    </h3>
                    <p className="text-sm text-gray-500 ">
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
