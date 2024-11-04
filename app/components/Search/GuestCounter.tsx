"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Minus, Plus } from "lucide-react";

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
    <div className="flex justify-between items-center py-2">
      <div>
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onDecrement}
          disabled={count <= 0}
          className="h-8 w-8 rounded-full border-gray-300 text-gray-700 hover:bg-gray-200">
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-lg font-medium">{count}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={onIncrement}
          className="h-8 w-8 rounded-full border-gray-300 text-gray-700 hover:bg-gray-200">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

type GuestSelectorProps = {
  onGroupSizeChange: (size: number) => void; // Added prop for group size change
};

export function GuestSelector({ onGroupSizeChange }: GuestSelectorProps) {
  const [open, setOpen] = React.useState(false);

  // State for each guest type
  const [adults, setAdults] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [infants, setInfants] = React.useState(0);

  // Calculate total guests excluding infants
  const totalGuests = adults + children;

  // Notify parent component when group size changes
  React.useEffect(() => {
    onGroupSizeChange(totalGuests);
  }, [totalGuests, onGroupSizeChange]);

  return (
    <div className=" ">
      <p className="text-gray-500 text-left text-sm pl-4 "> Group Size </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full border-none px-4">
            <div>
              <h1 className="w-full justify-start text-left font-normal text-xl text-black border-white/20 shadow-none rounded-xl">
                {totalGuests} guests {infants >= 1 && <span>{infants} infants</span>}
              </h1>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          className="w-72 mt-4 p-4 shadow-lg rounded-lg">
          <GuestCounter
            label="Adults"
            description="Ages 13 or above"
            count={adults}
            onIncrement={() => setAdults(adults + 1)}
            onDecrement={() => setAdults(adults - 1)}
          />
          <GuestCounter
            label="Children"
            description="Ages 2 – 12"
            count={children}
            onIncrement={() => setChildren(children + 1)}
            onDecrement={() => setChildren(children - 1)}
          />
          <GuestCounter
            label="Infants"
            description="Under 2"
            count={infants}
            onIncrement={() => setInfants(infants + 1)}
            onDecrement={() => setInfants(infants - 1)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
