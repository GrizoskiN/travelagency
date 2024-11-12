"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import { DatePickerWithRange } from "./DateRangePicker";
import DestinationSelect from "./DestinationSelect";
import SearchButton from "./SearchButton";
import MobileSearchButton from "./MobileSearchButton";
import { GuestSelector } from "./GuestCounter";
import { motion, AnimatePresence } from "framer-motion";
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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
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
    setMenuOpen(false);

    try {
      router.push(targetUrl);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const clearAll = () => {
    setSelectedCountry("all");
    setDateRange(undefined);
    resetCounters();
  };

  return (
    <div className="w-full max-w-[800px] mx-auto mt-10 z-40 relative ">
      {/* Desktop Version */}
      <div className="hidden lg:flex items-center justify-center bg-background rounded-full pr-2 ">
        <div className="w-full flex justify-between items-center bg-white  text-white rounded-full shadow-lg p-2">
          <DestinationSelect
            destinations={uniqueCountries}
            initialCountry={selectedCountry}
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
        <SearchButton handleSearch={handleSearch} clearAll={clearAll} />
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden w-11/12 mx-auto mt-10 relative">
        {/* Top part visible by default */}
        <div
          onClick={() => setMenuOpen(true)}
          className="cursor-pointer bg-white rounded-full p-3">
          <div className="flex justify-between px-3">
            <span>Any Location</span>
            |
            <span>Any Date</span>
            |
            <span>Group Size</span>
          </div>
        </div>

        {/* Full-screen search menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 bg-[#ececec] z-50 flex flex-col pt-48 px-4"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3 }}>
              <span
                onClick={() => setMenuOpen(false)}
                className="text-2xl text-black absolute top-5 right-5">
                Close
              </span>
              <div className="flex flex-col justify-center  space-y-4 ">
                <DestinationSelect
                  destinations={uniqueCountries}
                  initialCountry={selectedCountry}
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
                        ? {
                            startDate: range.from ?? null,
                            endDate: range.to ?? null,
                          }
                        : undefined,
                    )
                  }
                />
                <GuestSelector
                  onGroupSizeChange={(size) => setGroupSize(size)}
                  resetCounters={setResetCounters}
                />
              </div>

              {/* Clear All and Search Button */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.3 }}
                className="flex justify-between mt-8">
                <MobileSearchButton
                  handleSearch={handleSearch}
                  clearAll={clearAll}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;
