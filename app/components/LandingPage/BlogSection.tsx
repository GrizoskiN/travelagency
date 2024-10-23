"use client";

import { motion } from "framer-motion";
import { FC, useRef, useState, useEffect } from "react";
import BlogPosts from "../Blog/BlogPosts";
import HeadingText from "../TextModules/HeadingText";
import FullButton from "../Buttons/FullButton";

const BlogSection: FC = () => {
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
    <motion.div className="w-[95%] rounded-xl ml-auto bg-white py-16 overflow-hidden">
      <div className="w-[95%] mx-auto flex justify-between items-end">
        <HeadingText
          heading2={"News, tips, guides"}
          heading3={"You’ve read it here first"}
          customWidth={false}
        />
        <FullButton link={"/blog"} text={"View All"} />
      </div>
      <div className="w-[97.2%] mt-16 ml-auto overflow-hidden relative">
        <motion.div
          ref={carouselRef}
          className="flex gap-7 cursor-pointer w-full "
          drag="x"
          dragConstraints={{ right: 0, left: -carouselWidth }}>
          <BlogPosts pointer={true} />
        </motion.div>
        <div className="h-[110%] w-16 absolute -right-9 -top-5 bg-white rounded-full blur-sm"></div>
      </div>
    </motion.div>
  );
};

export default BlogSection;
