"use client";

import * as React from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
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
import { DestinationIcon } from "../Icons/SvgIcons";

type Destination = {
  value: string;
  label: string;
};

type DestinationSelectProps = {
  destinations: Destination[];
  initialCountry: string; // Updated prop name
  onCountryChange: (value: string) => void;
};

const DestinationSelect: React.FC<DestinationSelectProps> = ({
  destinations,
  initialCountry, // Use prop name
  onCountryChange,
}) => {
  const [open, setOpen] = React.useState(false);

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
    <div className="w-full lg:w-40 flex lg:flex-col justify-between items-center lg:items-start bg-white lg:bg-transparent p-1 rounded-full lg:rounded-none">
      <p className="text-gray-500 text-left pl-4 lg:pl-1 text-sm">
        Destinations
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="lg:w-auto w-2/3 h-auto p-1 pr-4 lg:p-none lg:pr-none bg-[#ececec] rounded-full lg:bg-transparent lg:rounded-none flex justify-between lg:justify-start shadow-none border-none text-xl text-black">
            <DestinationIcon />
            {initialCountry && initialCountry !== "all"
              ? destinations.find((dest) => dest.value === initialCountry)
                  ?.label
              : "Select a Country"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 -mt-9 p-0 pl-1 border-none ring-0 shadow-none">
          <Command>
            <CommandInput
              placeholder="Search country..."
              className="h-9 text-lg hidden"
            />
            {/* Scroll Up Button */}
            <div
              className="flex items-center justify-center py-1 cursor-pointer"
              onClick={scrollUp}>
              <ChevronUpIcon className="h-4 w-4 text-gray-600" />
            </div>
            <CommandList
              ref={listRef}
              className="overflow-y-auto scrollbar-hide">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {destinations.map((destination) => (
                  <CommandItem
                    className="my-2 border-b-[1px] border-gray-200"
                    key={destination.value}
                    value={destination.value}
                    onSelect={() => {
                      onCountryChange(destination.value);
                      setOpen(false);
                    }}>
                    {destination.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        initialCountry === destination.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            {/* Scroll Down Button */}
            <div
              className="flex items-center justify-center py-1 cursor-pointer"
              onClick={scrollDown}>
              <ChevronDownIcon className="h-4 w-4 text-gray-600" />
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DestinationSelect;
