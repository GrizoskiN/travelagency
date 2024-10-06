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
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // Handle search button click
  const handleSearch = () => {
    let targetUrl = "";

    // Set target URL to specific country page or 'all' if no country is selected
    const country = selectedCountry ? selectedCountry : "all";
    targetUrl = `/countries/${country}`;

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

  return (
    <div className="w-full flex justify-center mt-10 z-40 font-abel">
      <div className="flex items-center bg-white/20 backdrop-blur-sm border-t-white/40 border-t-[1px] text-white py-3 px-11 rounded-xl shadow-lg space-x-3">
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
        <DestinationSelect
          destinations={destinations}
          onChange={(value) => setSelectedCountry(value)}
        />

        {/* Search Button */}
        <button
          className="bg-white px-11 py-[6px] rounded-xl text-gray-700 hover:bg-gray-100 transition-all"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
