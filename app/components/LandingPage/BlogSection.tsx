"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FC, useRef, useState, useEffect } from "react";
import BlogPosts from "../Blog/BlogPosts";
import HeadingText from "../TextModules/HeadingText";
import FullButton from "../Buttons/FullButton";

const BlogSection: FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  // Check for reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  // Function to detect if the user is on a mobile device
  const isMobile = () => window.innerWidth <= 768;

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
        );
      }
    };

    updateWidth(); // Run once after initial render
    window.addEventListener("resize", updateWidth); // Recalculate width on resize

    return () => window.removeEventListener("resize", updateWidth); // Cleanup listener
  }, []);

  return (
    <motion.div className="w-[95%] rounded-xl ml-auto bg-backgroundColor py-16 overflow-hidden">
      <div className="w-[95%] mx-auto flex flex-col md:flex-row md:justify-between md:items-end space-y-6">
        <HeadingText
          heading2={"News, tips, guides"}
          heading3={"You’ve read it here first"}
          customWidth={false}
        />
        <FullButton link={"/blog"} text={"View All"} />
      </div>
      <div className="w-[97.2%] mt-6 md:mt-16 ml-auto overflow-hidden relative">
        <motion.div
          ref={carouselRef}
          className="flex gap-7 cursor-pointer w-full"
          drag="x"
          dragConstraints={{ right: 0, left: -carouselWidth }}
          dragElastic={isMobile() ? 0.1 : 0.3} // Reduce drag elasticity on mobile
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }} // Simplify animation if reduced motion is preferred
        >
          <BlogPosts pointer={true} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogSection;
