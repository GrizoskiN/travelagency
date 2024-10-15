"use client";
import { FC, useState } from "react";
import TagsFilter from "../Tags/TagsFilter";
import DestinationGallery from "../Gallery/DestinationGallery";
import FeaturedCountryCard from "../Gallery/FeaturedCountryCard";
import HeadingText from "../TextModules/HeadingText";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import LastCard from "../Gallery/LastCard";

const GridDestinations: FC = () => {
  const { destinations, continentDetails } = useDestinations();

  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [selectedContinent, setSelectedContinent] = useState("Earth");

  const countryDestinationCount = destinations.reduce((acc, destination) => {
    const country = destination.label.trim().toLowerCase();
    acc[country] = acc[country] ? acc[country] + 1 : 1;
    return acc;
  }, {} as Record<string, number>);

  const handleContinentChange = (continent: string) => {
    setSelectedContinent(continent);
    setFilteredDestinations(
      continent === "Earth"
        ? destinations
        : destinations.filter((destination) => destination.continent === continent)
    );
  };

  const handleTagSelect = (selectedTags: string[]) => {
    if (selectedTags.length === 0) {
      setFilteredDestinations(destinations);
    } else {
      const filtered = destinations.filter((destination) =>
        selectedTags.every((tag) => destination.tags.includes(tag))
      );
      setFilteredDestinations(filtered);
    }
  };

  const matchedContinentDetail = continentDetails.find(
    (detail) => detail.uid.toLowerCase() === selectedContinent.toLowerCase()
  );

  const limitedDestinations = filteredDestinations.slice(0, 6);

  return (
    <div className="customWidth my-8">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="bg-white lg:w-1/2 text-center py-11 rounded-xl ">
          <HeadingText heading3="Best Locations" heading2="Travel by continent" />
        </div>
        <TagsFilter onTagSelect={handleTagSelect} />
      </div>

      <div className="destination-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {limitedDestinations.length > 0 ? (
          <>
            <FeaturedCountryCard
              featuredCountry={limitedDestinations[0]}
              continents={Array.from(new Set(destinations.map((dest) => dest.continent)))}
              continentDetails={continentDetails}
              onContinentChange={handleContinentChange}
            />
            {limitedDestinations.map((destination, index) => (
              <div key={index} className="relative">
                <DestinationGallery
                  destination={destination}
                  destinationCount={countryDestinationCount[destination.label.trim().toLowerCase()] || 0}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <FeaturedCountryCard
              featuredCountry={null}
              continents={Array.from(new Set(destinations.map((dest) => dest.continent)))}
              continentDetails={continentDetails}
              onContinentChange={handleContinentChange}
            />
            <LastCard lastCardText={matchedContinentDetail?.last_card_text || ""} />
          </>
        )}
      </div>
    </div>
  );
};

export default GridDestinations;
