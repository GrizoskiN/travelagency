"use client";
import { FC, useState } from "react";
import TagsFilter from "../Tags/TagsFilter";
import DestinationGallery from "../Gallery/DestinationGallery";
import FeaturedCountryCard from "../Gallery/FeaturedCountryCard";
import HeadingText from "../TextModules/HeadingText";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import LastCard from "../Gallery/LastCard";

const GridDestinations: FC = () => {
  const { destinations, continentDetails } = useDestinations(); // Fetch destinations and continentDetails from context

  // State for filtered destinations and selected continent
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [selectedContinent, setSelectedContinent] = useState("Earth");

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

  // Handle continent selection and update featured destination
  const handleContinentChange = (continent: string) => {
    setSelectedContinent(continent);
    if (continent === "Earth") {
      setFilteredDestinations(destinations); // Show all destinations
    } else {
      const filtered = destinations.filter(
        (destination) => destination.continent === continent
      );
      setFilteredDestinations(filtered);
    }
  };

  // Handle tag selection
  const handleTagSelect = (selectedTags: string[]) => {
    if (selectedTags.length === 0) {
      setFilteredDestinations(destinations); // Show all destinations if no tags are selected
    } else {
      const filtered = destinations.filter(
        (destination) =>
          selectedTags.every((tag) => destination.tags.includes(tag)) // Match destinations with all selected tags
      );
      setFilteredDestinations(filtered);
    }
  };

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
        <TagsFilter onTagSelect={handleTagSelect} />
      </div>

      <div className="destination-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {/* First Grid Item - Featured Country */}
        <FeaturedCountryCard
          featuredCountry={filteredDestinations[0]}
          continents={Array.from(new Set(destinations.map((dest) => dest.continent)))}
          continentDetails={continentDetails}
          onContinentChange={handleContinentChange}
        />

        {/* Other Destinations (limited to a max of 6) */}
        {limitedDestinations.map((destination, index) => (
          <div key={index} className="relative">
            <DestinationGallery
              destination={destination}
              destinationCount={countryDestinationCount[destination.label.trim().toLowerCase()] || 0}
            />
          </div>
        ))}

        {/* Last Card Component (always included) */}
        <LastCard lastCardText={matchedContinentDetail?.last_card_text || ""} />
      </div>
    </div>
  );
};

export default GridDestinations;
