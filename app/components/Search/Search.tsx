"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import { DatePickerWithRange } from "./DateRangePicker";
import DestinationSelect from "./DestinationSelect";
import SearchButton from "../Buttons/SearchButton";
import { GuestSelector } from "./GuestCounter";

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

const SearchBar: React.FC = () => {
  const { destinations } = useDestinations();
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [groupSize, setGroupSize] = useState<number | undefined>(undefined);

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
    let targetUrl = `/countries/${selectedCountry}`;
  
    const query = new URLSearchParams();
  
    // Add date range if provided
    if (dateRange?.startDate && dateRange.endDate) {
      query.set("startDate", dateRange.startDate.toISOString());
      query.set("endDate", dateRange.endDate.toISOString());
    }
  
    // Add group size if it's greater than 0
    if (groupSize && groupSize > 0) {
      query.set("groupSize", groupSize.toString());
    }
  
    // Construct the full URL
    if (Array.from(query).length > 0) {
      targetUrl += `?${query.toString()}`;
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
  };

  return (
    <div className="w-10/12 md:w-auto flex items-center justify-center mt-10 z-40 bg-background rounded-full pr-2 relative">
      <div className="w-full flex justify-between flex-col md:flex-row md:items-center space-y-3 md:space-y-0 bg-white border-t-white/40 border-t-[1px] text-white rounded-full shadow-lg pl-11 pr-2 py-2 md:space-x-3">
        <DestinationSelect
          destinations={uniqueCountries}
          onCountryChange={handleCountryChange}
        />
        <DatePickerWithRange
          date={
            dateRange
              ? {
                  from: dateRange.startDate ?? undefined,
                  to: dateRange.endDate ?? undefined,
                }
              : undefined
          }
          onChange={(range) =>
            setDateRange(
              range
                ? { startDate: range.from ?? null, endDate: range.to ?? null }
                : undefined
            )
          }
        />
        <GuestSelector onGroupSizeChange={(size) => setGroupSize(size)} />

        {/* Search Button */}
        <SearchButton handleSearch={handleSearch} />
      </div>
    </div>
  );
};

export default SearchBar;
