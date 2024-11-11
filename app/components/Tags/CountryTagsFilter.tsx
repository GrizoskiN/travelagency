// CountryTagsFilter.tsx
import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import Image from "next/image";
import AllExperiences from "../Icons/SvgIcons";

interface CountryTagsFilterProps {
  onTagSelect: (selectedTags: string[]) => void;
}

const CountryTagsFilter: FC<CountryTagsFilterProps> = ({ onTagSelect }) => {
  const { tagsDictionary } = useDestinations();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Convert tagsDictionary to an array of tag objects
  const uniqueTags = Object.entries(tagsDictionary).map(([, tagData]) => ({
    ...tagData,
  }));

  const handleTagClick = (tagId: string) => {
    const updatedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((selectedTag) => selectedTag !== tagId)
      : [...selectedTags, tagId];
    setSelectedTags(updatedTags);
    onTagSelect(updatedTags);
  };

  const handleAllExperiencesClick = () => {
    setSelectedTags([]);
    onTagSelect([]);
  };

  return (
    <div className="flex flex-col items-center my-6">
      <h4 className="text-xl mb-3">Select your experience type</h4>
      <Swiper
        slidesPerView={10}
        spaceBetween={10}
        freeMode={true}
        className="w-full flex justify-center px-8">
        <SwiperSlide>
          
          <button
            className={`flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 ${
              selectedTags.length === 0
                ? "text-primary after:absolute after:bg-primary after:h-[2px] after:rounded-full after:w-10 after:bottom-2"
                : "text-gray-700 after:absolute after:bg-gray-400 after:h-[2px] after:rounded-full after:w-10 after:bottom-2"
            }`}
            onClick={handleAllExperiencesClick}>
              <span className={`w-10 h-10 ${  selectedTags.length === 0 ? "opacity-100" : "opacity-60"}`}  ><AllExperiences /></span>
              <span className={`${
                selectedTags.length === 0 ? "text-primary" : "text-gray-400"} text-md  `}>All Experiences</span>
          </button>
        </SwiperSlide>
        {uniqueTags.map((tag) => (
          <SwiperSlide key={tag.id} className="flex justify-center">
            <button
              className={`flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 ${
                selectedTags.includes(tag.id)
                  ? " text-primary after:absolute after:bg-primary after:h-[2px] after:rounded-full after:w-10 after:bottom-2"
                  : " text-gray-700 after:absolute after:bg-gray-400 after:h-[2px] after:rounded-full after:w-10 after:bottom-2"
              }`}
              onClick={() => handleTagClick(tag.id)}>
              <Image
                src={tag.image}
                alt={tag.name}
                width={50}
                height={50} 
                className={`w-10 h-10 ${ selectedTags.includes(tag.id) ? "opacity-100" : "opacity-60"}`}              />
              <span className={`${
                selectedTags.includes(tag.id) ? "text-primary" : "text-gray-400"} text-md  `}>{tag.name}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CountryTagsFilter;
