"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import { DatePickerWithRange } from "./DateRangePicker";
import DestinationSelect from "./DestinationSelect";
import MobileSearchButton from "./MobileSearchButton";
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
  const [resetCounters, setResetCounters] = useState<() => void>(() => {});
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
    }, new Map<string, { value: string; label: string }>()),
  ).map(([, country]) => country);

  const handleSearch = () => {
    let targetUrl = `/countries/${selectedCountry}`;

    const query = new URLSearchParams();

    if (dateRange?.startDate && dateRange.endDate) {
      query.set("startDate", dateRange.startDate.toISOString());
      query.set("endDate", dateRange.endDate.toISOString());
    }

    if (groupSize && groupSize > 0) {
      query.set("groupSize", groupSize.toString());
    }

    if (Array.from(query).length > 0) {
      targetUrl += `?${query.toString()}`;
    }

    console.log("Navigating to URL:", targetUrl); // Debugging
    try {
      router.push(targetUrl);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleCountryChange = (value: string) => {
    console.log("Country selected:", value); // Debugging
    setSelectedCountry(value);
  };

  // Function to clear all selected parameters
  const clearAll = () => {
    setSelectedCountry("all");
    setDateRange(undefined);
    resetCounters();
   
  };

  return (
    <div className="lg:hidden w-12/13 mx-auto flex flex-col items-center justify-center mt-10 z-40  rounded-lg  relative">
      <div className="w-full flex justify-between flex-col lg:flex-row md:items-center space-y-2  border-t-white/40 border-t-[1px] text-white rounded-lg  ">
        <DestinationSelect
          destinations={uniqueCountries}
          initialCountry={selectedCountry} // Use the new prop name
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
                : undefined,
            )
          }
        />
        <GuestSelector
          onGroupSizeChange={(size) => setGroupSize(size)}
          resetCounters={setResetCounters}
        />
      </div>
      <MobileSearchButton handleSearch={handleSearch} clearAll={clearAll} />
    </div>
  );
};

export default SearchBar;
