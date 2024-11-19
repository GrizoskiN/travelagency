"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import { format } from "date-fns";
import { Destination } from "@/lib/fetchData";
import Link from "next/link";
import SearchBar from "@/app/components/Search/Search";

import { useState } from "react";
import CountryTagsFilter from "@/app/components/Tags/CountryTagsFilter";
import FullButton from "@/app/components/Buttons/FullButton";
import OutlineButton from "@/app/components/Buttons/OutlineButton";

export default function CountryPage({
  params,
}: {
  params: { country: string };
}) {
  const searchParams = useSearchParams();
  const startDateStr = searchParams.get("startDate");
  const endDateStr = searchParams.get("endDate");
  const groupSizeStr = searchParams.get("groupSize");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { destinations, tagsDictionary } = useDestinations(); // Get tagsDictionary from context

  const selectedCountry = params.country.toLowerCase();
  let filteredDestinations = destinations;

  if (selectedCountry !== "all") {
    filteredDestinations = filteredDestinations.filter(
      (dest) => dest.label.toLowerCase() === selectedCountry,
    );
  }

  const matchesSelectedTags = (destination: Destination) => {
    // Check if the destination has tags and if they match the selected tags
    return (
      selectedTags.length === 0 || // If no tags are selected, include all destinations
      (destination.tags &&
        selectedTags.some(
          (tagId) => tagsDictionary[tagId] && destination.tags!.includes(tagId),
        ))
    );
  };

  // Filter and prioritize destinations based on specific date range, group size, and tags
  const matchedDestinations: Destination[] = [];

  // Filtering logic
  filteredDestinations.forEach((destination) => {
    const { start_date, end_date, group_size } = destination;

    const isInDateRange =
      startDateStr && endDateStr
        ? start_date &&
          end_date &&
          new Date(start_date) <= new Date(endDateStr) &&
          new Date(end_date) >= new Date(startDateStr)
        : true;

    const isInGroupSize =
      group_size && checkGroupSize(group_size, groupSizeStr || "2+");
    const isInSelectedTags = matchesSelectedTags(destination);

    if (isInDateRange && isInGroupSize && isInSelectedTags) {
      matchedDestinations.push(destination);
    }
  });

  // Helper function to check if a destination's group size matches or exceeds the selected group size
  function checkGroupSize(
    destinationGroupSize: string,
    groupSizeStr: string,
  ): boolean {
    const groupSize = parseInt(groupSizeStr, 10);

    // If no group size is selected or if "2+" is selected, show all destinations
    if (!groupSizeStr || groupSizeStr === "2+") {
      return true;
    }

    // Handle cases where "2" should include all destinations with "2+" or higher
    if (groupSize === 2) {
      if (destinationGroupSize.includes("+")) {
        const min = parseInt(destinationGroupSize.replace("+", ""), 10);
        return min >= 2; // Include any destination with a minimum of 2 guests or more
      }
      if (destinationGroupSize.includes("-")) {
        const [min] = destinationGroupSize.split("-").map(Number);
        return min <= 2; // Include any range that starts at 2 or lower
      }
      const exactSize = parseInt(destinationGroupSize, 10);
      return exactSize >= 2; // Include exact sizes that are 2 or more
    }

    // Handle cases like "5+" which mean 5 or more guests
    if (destinationGroupSize.includes("+")) {
      const min = parseInt(destinationGroupSize.replace("+", ""), 10);
      return groupSize >= min; // Check if the selected group size is at least the minimum
    }

    // Handle ranges like "2-4"
    if (destinationGroupSize.includes("-")) {
      const [min, max] = destinationGroupSize.split("-").map(Number);
      return groupSize >= min && groupSize <= max; // Check if the selected group size falls within the range
    }

    // Handle exact numbers like "2", "3", "4", etc.
    const exactSize = parseInt(destinationGroupSize, 10);
    return groupSize === exactSize; // Check if the selected group size matches the exact number
  }

  const handleTagSelect = (selectedTags: string[]) => {
    setSelectedTags(selectedTags);
  };

  return (
    <div className="customWidth w-[1300px] bg-white mx-auto mt-24">
      <SearchBar />

      {/* Tags Filter Component */}
      <CountryTagsFilter onTagSelect={handleTagSelect} />

      {/* Display matched destinations */}
      {matchedDestinations.length > 0 ? (
        <div className="matched-destinations mt-32">
          <h2 className="text-xl font-semibold mb-4">
            {startDateStr || endDateStr || groupSizeStr ? (
              <>
                Destinations from{" "}
                {startDateStr
                  ? format(new Date(startDateStr), "MMMM dd, yyyy")
                  : ""}{" "}
                to{" "}
                {endDateStr
                  ? format(new Date(endDateStr), "MMMM dd, yyyy")
                  : ""}
                {groupSizeStr ? ` for ${groupSizeStr} guests` : ""}
              </>
            ) : (
              "All Destinations"
            )}
          </h2>
          <div className="destination-grid grid md:grid-cols-2 xl:grid-cols-3 gap-4 :gap-7">
            {matchedDestinations.map((dest) => (
              <div key={dest.uid} className="flex flex-col justify-between">
                <Link
                  href={`/destination/${dest.uid}`}
                  className="block md:h-[20rem] xl:h-[25rem] my-4">
                  {dest.destination_image && (
                    <Image
                      src={dest.destination_image}
                      alt=""
                      width={500}
                      height={500}
                      className="object-cover rounded-lg h-full "
                    />
                  )}
                </Link>
                <div className="flex flex-col justify-between lg:min-h-48">
                  <h2 className="text-2xl font-bold mt-2 ">
                    {dest.meta_title || "Untitled Destination"}
                  </h2>
                  <p className="text-md line-clamp-2 leading-5 mt-4 ">
                    {dest.excerpt}
                  </p>
                  <div className="flex  gap-3 mt-5">
                    <FullButton
                      link={`/destination/${dest.uid}`}
                      text="Reserve"
                    />
                    <OutlineButton
                      link={`/destination/${dest.uid}`}
                      text="View the tour"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No matching destinations found.</p>
      )}
    </div>
  );
}
