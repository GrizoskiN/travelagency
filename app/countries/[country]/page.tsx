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
      (dest) => dest.label.toLowerCase() === selectedCountry
    );
  }


// Function to check if a destination's tags match selected tags in tagsDictionary
const matchesSelectedTags = (destination: Destination) => {

  // Check if the destination has any tag that matches the selected tags using tagsDictionary
  return (
    selectedTags.length === 0 || // If no tags are selected, include all destinations
    selectedTags.some(
      (tagId) => tagsDictionary[tagId] && destination.tags.includes(tagId) // Check if destination's tags include any selected tag
    )
  );
};



  // Filter and prioritize destinations based on specific date range, group size, and tags
  const matchedDestinations: Destination[] = [];

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
      groupSizeStr !== null
        ? group_size && checkGroupSize(group_size, groupSizeStr)
        : true;
  
    // Check if the destination matches any of the selected tags in tagsDictionary
    const isInSelectedTags = matchesSelectedTags(destination);
  
    if (isInDateRange && isInGroupSize && isInSelectedTags) {
      matchedDestinations.push(destination);
    }
  });
  

  // Helper function to check group size
  function checkGroupSize(destinationGroupSize: string, groupSizeStr: string): boolean {
    const groupSize = parseInt(groupSizeStr, 10);

    if (isNaN(groupSize)) return false;

    if (destinationGroupSize.includes("+")) {
      const min = parseInt(destinationGroupSize.replace("+", ""), 10);
      return groupSize >= min;
    }

    if (destinationGroupSize.includes("-")) {
      const [min, max] = destinationGroupSize.split("-").map(Number);
      return groupSize >= min && groupSize <= max;
    }

    return false;
  }

  const handleTagSelect = (selectedTags: string[]) => {
    setSelectedTags(selectedTags);
  };

  return (
    <div className="customWidth mt-24">
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
                {startDateStr ? format(new Date(startDateStr), "MMMM dd, yyyy") : ""} to{" "}
                {endDateStr ? format(new Date(endDateStr), "MMMM dd, yyyy") : ""}
                {groupSizeStr ? ` for ${groupSizeStr} guests` : ""}
              </>
            ) : (
              "All Destinations"
            )}
          </h2>
          <div className="destination-grid grid grid-cols-3 gap-4">
            {matchedDestinations.map((dest) => (
              <Link href={`/destination/${dest.uid}`} key={dest.uid} className="block">
                <div className="block">
                  {dest.image && (
                    <Image
                      src={dest.image}
                      alt=""
                      width={500}
                      height={500}
                      className="rounded-lg my-4"
                    />
                  )}
                  <h2 className="text-2xl font-bold mt-2">
                    {dest.meta_title || "Untitled Destination"}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p>No matching destinations found.</p>
      )}
    </div>
  );
}
