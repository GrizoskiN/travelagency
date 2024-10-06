import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useDestinations } from "@/app/contexts/DestinationsContext";

const DestinationSelect: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  const { destinations } = useDestinations();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    onChange(country);

    // Find the cities for the selected country and set them in state
    const selectedDestination = destinations.find((destination) => destination.value === country);

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
    <div className="flex">
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
        <div className="ml-4">
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
