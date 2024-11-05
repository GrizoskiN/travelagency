/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import { useDestinations } from "@/app/contexts/DestinationsContext";

interface TagsFilterProps {
  onTagSelect: (selectedTags: string[]) => void;
}

const TagsFilter: FC<TagsFilterProps> = ({ onTagSelect }) => {
  const { tagsDictionary } = useDestinations();

  // Convert tagsDictionary to an array of tag objects
  const uniqueTags = Object.entries(tagsDictionary).map(([id, tagData]) => ({
    
    ...tagData,
  }));

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tagId: string) => {
    const updatedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((selectedTag) => selectedTag !== tagId)
      : [...selectedTags, tagId];
    setSelectedTags(updatedTags);
    onTagSelect(updatedTags);
    
    console.log("Selected Tags after click:", updatedTags); // Debug: Log selected tags after click
  };

  const handleAllExperiencesClick = () => {
    setSelectedTags([]);
    onTagSelect([]);
  };

  return (
    <div className="lg:px-11 my-6 items-center justify-center lg:w-1/2">
      <div className="flex justify-between mb-5">
        <h4 className="text-3xl">Select your experience type</h4>
        <h4>*You can select multiple tags</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-11 py-2 h-fit rounded-full capitalize ${
            selectedTags.length === 0
              ? "bg-primary text-white"
              : "bg-none border-[1px] border-gray-400 text-gray-700"
          }`}
          onClick={handleAllExperiencesClick}
        >
          All Experiences
        </button>
        {uniqueTags.map((tag) => (
          <button
            key={tag.id}
            className={`px-11 py-2 h-fit rounded-full capitalize ${
              selectedTags.includes(tag.id)
                ? "bg-primary-foreground text-white"
                : "bg-none border-[1px] border-gray-400 text-gray-700"
            }`}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagsFilter;
