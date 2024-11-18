import { FC, useState } from "react";
import { useDestinations } from "@/app/contexts/DestinationsContext";

interface GridTagsFilterProps {
  onTagSelect: (selectedTags: string[]) => void;
}

const GridTagsFilter: FC<GridTagsFilterProps> = ({ onTagSelect }) => {
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
    <div className="tag-filter lg:px-11 my-6 items-center justify-center lg:w-1/2">
      <h4 className="text-3xl font-light">Select your experience type</h4>
      <div className="flex flex-wrap gap-2 mt-5">
        <button
          className={`px-11 py-2 h-fit rounded-full text-sm capitalize ${
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
         className={`px-11 py-2 h-fit text-sm rounded-full capitalize ${
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

export default GridTagsFilter;
