"use client";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type Destination = {
  value: string;
  label: string;
};

type DestinationSelectProps = {
  destinations: Destination[];
  onChange: (value: string) => void;
};

const DestinationSelect: React.FC<DestinationSelectProps> = ({ destinations, onChange }) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="rounded-xl border-none shadow-none outline-none focus:ring-white">
        <SelectValue placeholder="Select a Destination" />
      </SelectTrigger>
      <SelectContent>
        {destinations.map((destination) => (
          <SelectItem key={destination.value} value={destination.value}>
            {destination.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DestinationSelect;
