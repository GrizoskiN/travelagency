"use client";
import "swiper/css";
import "@/app/globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import Image from "next/image";

// Import Swiper modules
import {  EffectCoverflow } from "swiper/modules";
import Link from "next/link";
import HeadingText from "../TextModules/HeadingText";

const SliderDestinations = () => {
  const { uniqueCountries } = useDestinations(); // Fetch unique countries from context

  return (
    <div className="overflow-hidden customWidth py-11 my-6 bg-white rounded-xl">
      <div className=" mx-auto  text-center mb-11">
        <HeadingText customWidth
          heading3="Top Destinations"
          heading2="Our Featured Destination"
        />
      </div>
      <Swiper
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={3}
        grabCursor={true}
        loop={true}
        coverflowEffect={{
          rotate: 0,
        
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow]}
        className="w-11/12 mx-auto">
        {uniqueCountries.length > 0 ? (
          uniqueCountries.map((destination, index) => (
            <SwiperSlide key={index}>
              <Link href={`/countries/${destination.label}`} className="">
                <div className="relative w-[19rem] h-[25rem] lg:w-[35rem] lg:h-auto m-auto -ml-24 md:-ml-0">
                  <Image
                    src={destination.image} // Dynamic image from context
                    alt={destination.label} // Alt text from the context
                    className=" w-full lg:w-[35rem] h-full lg:h-[35rem] object-cover rounded-lg"
                    width={300}
                    height={400}
                  />
                  <div className="flex justify-between absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm bg-opacity-50 text-white p-2 rounded-lg">
                    <h3 className="text-sm flex flex-col font-light">
                      Visit the beautiful{" "}
                      <span className="text-4xl lg:text-5xl">
                        {destination.label}
                      </span>
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
