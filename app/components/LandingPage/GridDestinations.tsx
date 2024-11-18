"use client";
import { FC, useState, useEffect } from "react";
import DestinationGallery from "../Gallery/DestinationGallery";
import FeaturedCountryCard from "../Gallery/FeaturedCountryCard";
import HeadingText from "../TextModules/HeadingText";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import LastCard from "../Gallery/LastCard";
import GridTagsFilter from "../Tags/GridTagsFilter";

const GridDestinations: FC = () => {
  const { destinations, continentDetails, tagsDictionary } = useDestinations();

  const [filteredDestinations, setFilteredDestinations] =
    useState(destinations);
  const [selectedContinent, setSelectedContinent] = useState("Earth");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const countryDestinationCount = destinations.reduce(
    (acc, destination) => {
      const country = destination.label.trim().toLowerCase();
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const handleContinentChange = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedTags([]);
  };

  const handleTagSelect = (selectedTags: string[]) => {
    setSelectedTags(selectedTags);
  };

  useEffect(() => {
    if (!tagsDictionary) return; // Ensure tagsDictionary is loaded before applying filters

    let filtered = destinations;

    if (selectedContinent !== "Earth") {
      filtered = filtered.filter(
        (destination) => destination.continent === selectedContinent,
      );
    }

  // Filter by selected tags only if tags are selected
if (selectedTags.length > 0) {
  filtered = filtered.filter(
    (destination) =>
      destination.tags &&
      selectedTags.every((tagId) => destination.tags!.includes(tagId))
  );
}


    // Ensure we only display unique countries in the filtered destinations
    const uniqueCountries = new Set<string>();
    const uniqueFilteredDestinations = filtered.filter((destination) => {
      const country = destination.label.trim().toLowerCase();
      if (uniqueCountries.has(country)) return false;
      uniqueCountries.add(country);
      return true;
    });

    setFilteredDestinations(uniqueFilteredDestinations);
  }, [selectedContinent, selectedTags, destinations, tagsDictionary]);

  const matchedContinentDetail = continentDetails.find(
    (detail) => detail.uid.toLowerCase() === selectedContinent.toLowerCase(),
  );

  const limitedDestinations = filteredDestinations.slice(0, 6);

  if (!tagsDictionary) {
    // Display a loader or return null if tagsDictionary is not yet available
    return <div>Loading...</div>;
  }

  return (
    <div className="customWidth my-8">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="bg-backgroundColor lg:w-1/2 text-center py-11 rounded-xl">
          <HeadingText
            heading3="Best Locations"
            heading2="Travel by continent"
            customWidth={false}
          />
        </div>

        <GridTagsFilter key={selectedContinent} onTagSelect={handleTagSelect} />
      </div>

      <div className="destination-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  my-6">
        <FeaturedCountryCard
          featuredCountry={filteredDestinations[0] || destinations[0]}
          continents={Array.from(
            new Set(destinations.map((dest) => dest.continent)),
          )}
          continentDetails={continentDetails}
          onContinentChange={handleContinentChange}
        />

        {limitedDestinations.length > 0 ? (
          limitedDestinations.map((destination, index) => (
            <div key={index} className="relative">
              <DestinationGallery
                destination={destination}
                destinationCount={
                  countryDestinationCount[
                    destination.label.trim().toLowerCase()
                  ] || 0
                }
                tagsDictionary={tagsDictionary} // Pass tagsDictionary here
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No destinations match your selected tags. Please try selecting
            different tags.
          </div>
        )}

        <LastCard lastCardText={matchedContinentDetail?.last_card_text || ""} />
      </div>
    </div>
  );
};

export default GridDestinations;
