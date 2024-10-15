import { FC, useState } from "react";
import { useDestinations } from "@/app/contexts/DestinationsContext";

interface TagsFilterProps {
  onTagSelect: (selectedTags: string[]) => void;
}

const TagsFilter: FC<TagsFilterProps> = ({ onTagSelect }) => {
  const { destinations } = useDestinations();

  const uniqueTags = Array.from(
    new Set(destinations.flatMap((destination) => destination.tags))
  );

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    onTagSelect(updatedTags);
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
        {uniqueTags.map((tag, index) => (
          <button
            key={index}
            className={`px-11 py-2 h-fit rounded-full capitalize ${
              selectedTags.includes(tag)
                ? "bg-primary-foreground text-white"
                : "bg-none border-[1px] border-gray-400 text-gray-700"
            }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      {selectedTags.length > 0 &&
        destinations.filter((destination) =>
          selectedTags.every((tag) => destination.tags.includes(tag))
        ).length === 0 && (
          <div className="mt-4 text-gray-600">
            No destinations match your selected tags. Please try selecting different tags.
          </div>
        )}
    </div>
  );
};

export default TagsFilter;
