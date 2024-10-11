"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import { DatePickerWithRange } from "./DateRangePicker";
import DestinationSelect from "./DestinationSelect";

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

const SearchBar: React.FC = () => {
  const { destinations } = useDestinations();
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>(""); // Added city state
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // Extract unique countries for the dropdown
  const uniqueCountries = Array.from(
    destinations.reduce((acc, destination) => {
      const normalizedCountry = destination.label.trim().toLowerCase();
      if (!acc.has(normalizedCountry)) {
        acc.set(normalizedCountry, {
          value: normalizedCountry,
          label: destination.label.trim(),
        });
      }
      return acc;
    }, new Map<string, { value: string; label: string }>())
  ).map(([, country]) => country);
  

  // Handle search button click
  const handleSearch = () => {
    let targetUrl = "";

    // If city is selected, include it in the target URL
    if (selectedCountry && selectedCity) {
      targetUrl = `/countries/${selectedCountry}/cities/${selectedCity}`;
    } else if (selectedCountry) {
      targetUrl = `/countries/${selectedCountry}`;
    } else {
      targetUrl = "/countries/all";
    }

    // Add the date range as query parameters if both startDate and endDate are set
    if (dateRange?.startDate && dateRange.endDate) {
      const startDate = dateRange.startDate.toISOString();
      const endDate = dateRange.endDate.toISOString();
      const query = new URLSearchParams({
        startDate,
        endDate,
      }).toString();

      targetUrl += `?${query}`;
    }

    // Navigate to the constructed URL
    try {
      router.push(targetUrl);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedCity(""); // Reset the city when a new country is selected
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };

  return (
    <div className="w-10/12 md:w-auto flex items-center justify-center mt-10 z-40 font-abel">
      <div className="w-full flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 bg-white/10 md:px-11 backdrop-blur-sm border-t-white/40 border-t-[1px] text-white text- p-3 rounded-xl shadow-lg md:space-x-3">
        <DatePickerWithRange
          date={
            dateRange
              ? {
                  from: dateRange.startDate ?? undefined,
                  to: dateRange.endDate ?? undefined,
                }
              : undefined
          }
          onChange={(range) => {
            setDateRange(
              range
                ? { startDate: range.from ?? null, endDate: range.to ?? null }
                : undefined
            );
          }}
        />
        {/* Pass unique countries to DestinationSelect */}
        <DestinationSelect
          destinations={uniqueCountries}
          onCountryChange={handleCountryChange}
          onCityChange={handleCityChange} // Add city change handler
        />

        {/* Search Button */}
        <button
          className="bg-[#ef4444] px-11 py-[5px] rounded-xl text-lg lg:text-xl text-white hover:bg-[#da4040] transition-all"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
