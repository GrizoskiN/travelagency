'use client';
import { ImageField } from "@prismicio/types";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

interface ImageGalleryProps {
  gallery: Array<{ imagegallery: ImageField }>;
}

const ImageGallery = ({ gallery }: ImageGalleryProps) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Limit the number of images displayed in the grid to 5
  const limitedGallery = gallery.slice(0, 5);

  // Create an array of slides for the lightbox
  const slides = gallery.map(item => ({
    src: item.imagegallery.url || "", // Provide a default empty string if url is null
    alt: item.imagegallery.alt || "Gallery image",
    width: item.imagegallery.dimensions?.width || 500, // Provide default width if undefined
    height: item.imagegallery.dimensions?.height || 500, // Provide default height if undefined
  }));

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 my-6 lg:grid-rows-2 lg:auto-rows-fr">
      {limitedGallery.map((item, index) => (
        <div
          key={index}
          className={`relative cursor-pointer rounded-xl overflow-hidden ${
            index === 0 ? "col-span-2 row-span-2" : ""
          }`}
          onClick={() => handleImageClick(index)}
        >
          <Image
            src={item.imagegallery.url || ""}
            width={500}
            height={500}
            alt={item.imagegallery.alt || "Gallery image"}
            className="object-cover w-full h-full"
          />
          {index === 4 && (
            <div
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold"
              onClick={() => setOpen(true)}
            >
              Show all photos
            </div>
          )}
        </div>
      ))}

      {/* Lightbox Component */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentIndex}
        on={{ view: ({ index }) => setCurrentIndex(index) }}
      />
    </div>
  );
};

export default ImageGallery;
