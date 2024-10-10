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
};

type DestinationSelectProps = {
  destinations: Destination[];
  onCountryChange: (value: string) => void;
  onCityChange: (value: string) => void;
};

const DestinationSelect: React.FC<DestinationSelectProps> = ({
  destinations,
  onCountryChange,
}) => {
  const handleCountryChange = (country: string) => {
    onCountryChange(country);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Country Select */}
      <Select onValueChange={handleCountryChange}>
        <SelectTrigger className="rounded-full text-lg  min-w-32 border-none shadow-none outline-none focus:ring-white">
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

      {/* City Select: Only visible after a country is selected */}
      {/* {selectedCountry && availableCities.length > 0 && (
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
      )} */}
    </div>
  );
};

export default DestinationSelect;
