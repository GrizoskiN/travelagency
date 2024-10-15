"use client";
import "swiper/css";
import "@/app/globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import Image from "next/image";

// Import Swiper modules
import { EffectCards } from "swiper/modules";
import Link from "next/link";
import HeadingText from "../TextModules/HeadingText";

const SliderDestinations = () => {
  const { uniqueCountries } = useDestinations(); // Fetch unique countries from context

  return (
    <div className="overflow-hidden flex flex-col lg:flex-row items-center justify-between customWidth py-11 my-6 bg-white rounded-xl">
      <div className="lg:w-1/3 mx-auto xl:w-1/2 text-center mb-11">
        <HeadingText heading3="Top Destinations" heading2="Our Featured Destination" />
      </div>
      <Swiper
        effect={"cards"}
        slidesPerView={1}
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        modules={[EffectCards]}
        className="mySwiper w-full lg:w-2/3"
      >
        {uniqueCountries.length > 0 ? (
          uniqueCountries.map((destination, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`/countries/${destination.label}`}
                className="mt-2 bg-white text-black px-3 py-1 rounded-md"
              >
                <div className="relative w-[20rem] lg:w-[30rem] mx-auto">
                  <Image
                    src={destination.image} // Dynamic image from context
                    alt={destination.label} // Alt text from the context
                    className="w-[20rem] h-[25rem] lg:w-[35rem] lg:h-[35rem] object-cover rounded-lg"
                    width={300}
                    height={400}
                  />
                  <div className="flex justify-between absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm bg-opacity-50 text-white p-2 rounded-lg">
                    <h3 className="text-sm flex flex-col font-light">
                      Visit the beautiful{" "}
                      <span className="text-4xl lg:text-5xl">{destination.label}</span>
                    </h3>
                    <div className="hidden lg:flex">
                      <p>View the listings</p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <p>Loading destinations...</p>
        )}
      </Swiper>
    </div>
  );
};

export default SliderDestinations;
