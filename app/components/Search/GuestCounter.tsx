"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { GroupIcon } from "../Icons/SvgIcons";

type GuestCounterProps = {
  label: string;
  description: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

function GuestCounter({
  label,
  description,
  count,
  onIncrement,
  onDecrement,
}: GuestCounterProps) {
  return (
    <div className="flex justify-between items-center text-left py-4 border-b bg-white border-gray-200 last:border-b-0 w-full  p-11">
      <div>
        <p className="text-lg font-medium text-black">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onDecrement}
          disabled={count <= 0}
          className="h-8 w-8 rounded-full border-gray-400 text-black hover:bg-gray-100 disabled:opacity-50">
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-lg text-black font-semibold">{count}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={onIncrement}
          className="h-8 w-8 rounded-full border-gray-400 text-black hover:bg-gray-100">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

type GuestSelectorProps = {
  onGroupSizeChange: (size: number) => void;
  resetCounters: (resetFunction: () => void) => void;
};

export function GuestSelector({
  onGroupSizeChange,
  resetCounters,
}: GuestSelectorProps) {
  const [open, setOpen] = React.useState(false);

  // State for each guest type
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);
  const [infants, setInfants] = React.useState(0);

  // Calculate total guests excluding infants
  const totalGuests = adults + children;

  // Function to reset all counters
  const reset = () => {
    setAdults(2);
    setChildren(0);
    setInfants(0);
  };

  React.useEffect(() => {
    resetCounters(() => reset);
  }, [resetCounters]);

  // Notify parent component when group size changes
  React.useEffect(() => {
    onGroupSizeChange(totalGuests);
  }, [totalGuests, onGroupSizeChange]);

  // Close popover when clicking outside
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative min-w-40 lg:max-w-48 w-full lg:w-auto flex lg:flex-col justify-between items-center lg:items-start bg-white lg:pl-6  lg:hover:bg-[#ececec] lg:bg-transparent rounded-full p-1 lg:h-16  ${infants > 0 ? "lg:pr-14" : "lg:pr-0"}`}>
      <p className="text-gray-500 text-left text-sm pl-4 lg:pl-0 mb-1 ">
        Group Size
      </p>
      <div onClick={() => setOpen(!open)} className="w-2/3 cursor-pointer ">
        <button
          className="w-full lg:w-auto h-auto bg-[#ececec] rounded-full lg:bg-transparent lg:rounded-none flex justify-between lg:justify-start items-center shadow-none border-none text-lg text-black p-1 pr-4 lg:pr-0
             hover:bg-[#ececec] focus:bg-[#ececec] active:bg-[#ececec] text-nowrap">
          <GroupIcon />
          <div className="ml-2 lg:ml-0 ">
            <p className="text-lg text-black ">
              {totalGuests > 0 ? `${totalGuests} guests` : "Add guests"}
              {infants >= 1 && <span>, {infants} infants</span>}
            </p>
          </div>
        </button>
      </div>

      {open && (
        <div className="absolute bottom-[3.989rem] lg:bottom-auto lg:top-[3.989rem] right-0 w-full lg:w-[25rem] p-4 shadow-lg bg-white rounded-3xl z-40">
          <GuestCounter
            label="Adults"
            description="Ages 13 or above"
            count={adults}
            onIncrement={() => setAdults(adults + 1)}
            onDecrement={() => setAdults(Math.max(0, adults - 1))}
          />
          <GuestCounter
            label="Children"
            description="Ages 2 – 12"
            count={children}
            onIncrement={() => setChildren(children + 1)}
            onDecrement={() => setChildren(Math.max(0, children - 1))}
          />
          <GuestCounter
            label="Infants"
            description="Under 2"
            count={infants}
            onIncrement={() => setInfants(infants + 1)}
            onDecrement={() => setInfants(Math.max(0, infants - 1))}
          />
        </div>
      )}
    </div>
  );
}
