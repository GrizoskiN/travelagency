"use client";
import { FC, useState, useEffect } from "react";
import TagsFilter from "../Tags/TagsFilter";
import DestinationGallery from "../Gallery/DestinationGallery";
import FeaturedCountryCard from "../Gallery/FeaturedCountryCard";
import HeadingText from "../TextModules/HeadingText";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import LastCard from "../Gallery/LastCard";

const GridDestinations: FC = () => {
  const { destinations, continentDetails } = useDestinations(); // Fetch destinations and continentDetails from context

  // State for filtered destinations, selected continent, and selected tags
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [selectedContinent, setSelectedContinent] = useState("Earth");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Create a frequency map to count the number of destinations for each country
  const countryDestinationCount = destinations.reduce((acc, destination) => {
    const country = destination.label.trim().toLowerCase(); // Normalize the country name
    if (acc[country]) {
      acc[country] += 1;
    } else {
      acc[country] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Handle continent selection and reset selected tags
  const handleContinentChange = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedTags([]); // Reset tags when continent changes
  };

  // Handle tag selection
  const handleTagSelect = (selectedTags: string[]) => {
    setSelectedTags(selectedTags);
  };

  // Effect to filter destinations based on selected continent and tags
  useEffect(() => {
    let filtered = destinations;

    // Filter by selected continent
    if (selectedContinent !== "Earth") {
      filtered = filtered.filter((destination) => destination.continent === selectedContinent);
    }

    // Further filter by selected tags if any tags are selected
    if (selectedTags.length > 0) {
      filtered = filtered.filter((destination) =>
        selectedTags.every((tag) => destination.tags.includes(tag))
      );
    }

    setFilteredDestinations(filtered);
  }, [selectedContinent, selectedTags, destinations]);

  // Find the matched continent detail based on the selected continent
  const matchedContinentDetail = continentDetails.find(
    (detail) => detail.uid.toLowerCase() === selectedContinent.toLowerCase()
  );

  // Limit the number of destinations to show to a maximum of 6
  const limitedDestinations = filteredDestinations.slice(0, 6);

  return (
    <div className="customWidth my-8">
      {/* Heading Section */}
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="bg-white lg:w-1/2 text-center py-11 rounded-xl ">
          <HeadingText heading3="Best Locations" heading2="Travel by continent" />
        </div>

        {/* Tags Filter */}
        <TagsFilter key={selectedContinent} onTagSelect={handleTagSelect} />
      </div>

      <div className="destination-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {/* First Grid Item - Featured Country */}
        <FeaturedCountryCard
          featuredCountry={filteredDestinations[0] || destinations[0]} // Fallback to the first destination if filtered list is empty
          continents={Array.from(new Set(destinations.map((dest) => dest.continent)))}
          continentDetails={continentDetails}
          onContinentChange={handleContinentChange}
        />

        {/* Other Destinations (limited to a max of 6) */}
        {limitedDestinations.length > 0 ? (
          limitedDestinations.map((destination, index) => (
            <div key={index} className="relative">
              <DestinationGallery
                destination={destination}
                destinationCount={countryDestinationCount[destination.label.trim().toLowerCase()] || 0}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No destinations match your selected tags. Please try selecting different tags.
          </div>
        )}

        {/* Last Card Component (always included) */}
        <LastCard lastCardText={matchedContinentDetail?.last_card_text || ""} />
      </div>
    </div>
  );
};

export default GridDestinations;
