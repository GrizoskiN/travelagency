import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";


type Destination = {
  value: string;
  label: string;
  cities?: string[];
};

type DestinationSelectProps = {
  destinations: Destination[];
  onChange: (value: string) => void;
};

const DestinationSelect: React.FC<DestinationSelectProps> = ({
  destinations,
  onChange,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    onChange(country);

    // Find the cities for the selected country and set them in state
    const selectedDestination = destinations.find(
      (destination) => destination.value === country
    );

    if (selectedDestination?.cities) {
      setAvailableCities(selectedDestination.cities);
    } else {
      setAvailableCities([]);
    }
  };

  const handleCityChange = (city: string) => {
    console.log(`Selected city: ${city}`);
  };

  return (
    <div className="flex flex-col md:flex-row ">
      {/* Country Select */}
      <Select onValueChange={handleCountryChange}>
        <SelectTrigger className="rounded-full border-none shadow-none outline-none focus:ring-white">
          <SelectValue placeholder="Select a Country" />
        </SelectTrigger>
        <SelectContent>
          {destinations.map((destination) => (
            <SelectItem key={destination.value} value={destination.value}>
              {destination.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* City Select: Only visible after a country is selected and there are cities available */}
      {selectedCountry && availableCities.length > 0 && (
        <div className="">
          <Select onValueChange={handleCityChange}>
            <SelectTrigger className="rounded-full border-none shadow-none outline-none focus:ring-white">
              <SelectValue placeholder="Select a City" />
            </SelectTrigger>
            <SelectContent>
              {availableCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default DestinationSelect;
