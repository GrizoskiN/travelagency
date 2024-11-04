"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Destination = {
  value: string;
  label: string;
};

type DestinationSelectProps = {
  destinations: Destination[];
  onCountryChange: (value: string) => void;
};

const DestinationSelect: React.FC<DestinationSelectProps> = ({
  destinations,
  onCountryChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<string>("");

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    onCountryChange(country);
    setOpen(false);
  };

  // Ref for CommandList to control scrolling
  const listRef = React.useRef<HTMLDivElement>(null);

  // Scroll handlers
  const scrollUp = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ top: -40, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ top: 40, behavior: "smooth" });
    }
  };

  return (
    <div className="">
      <p className="text-gray-500 text-left pl-4 text-sm">Destinations</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-48 justify-between shadow-none border-none text-xl text-black "
          >
            {selectedCountry
              ? destinations.find((dest) => dest.value === selectedCountry)?.label
              : "Select a Country"}
            <CaretSortIcon className="ml-2 h-4 w-4 hidden shrink-0 opacity-50 shadow-none" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 -mt-9 p-0 pl-1  border-none ring-0 shadow-none">
          <Command>
            <CommandInput placeholder="Search country..." className="h-9 text-lg " />
            {/* Scroll Up Button */}
            <div className="flex items-center justify-center py-1 cursor-pointer" onClick={scrollUp}>
              <ChevronUpIcon className="h-4 w-4 text-gray-600" />
            </div>
            <CommandList
              ref={listRef}
              className=" overflow-y-auto  scrollbar-hide"
            >
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {destinations.map((destination) => (
                  <CommandItem className="my-2 border-b-[1px] border-gray-200"
                    key={destination.value}
                    value={destination.value}
                    onSelect={() => handleCountryChange(destination.value)}
                  >
                    {destination.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 hidden",
                        selectedCountry === destination.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            {/* Scroll Down Button */}
            <div className="flex items-center justify-center py-1 cursor-pointer" onClick={scrollDown}>
              <ChevronDownIcon className="h-4 w-4 text-gray-600" />
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DestinationSelect;
