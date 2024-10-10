import { FC, useState } from 'react';

interface FeaturedCountryCardProps {
  featuredCountry: {
    label: string;
    image: string;
    continent: string; // Add continent to the featured country
  };
  continents: string[]; // Dynamic continents list passed as a prop
  onContinentChange: (continent: string) => void; // Callback to handle continent selection
}

const FeaturedCountryCard: FC<FeaturedCountryCardProps> = ({ featuredCountry, continents, onContinentChange }) => {
  const [selectedContinent, setSelectedContinent] = useState('Earth'); // Default to 'Earth'

  // Handle change when the user selects a continent
  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const continent = e.target.value;
    setSelectedContinent(continent);
    onContinentChange(continent); // Pass selected continent to parent component
  };

  return (
    <div className="relative w-full mx-auto p-2 xl:p-6  ">
      {/* Continent/Earth Dropdown */}
      <div className="flex justify-between items-center mb-6 border-[1px] border-primary rounded-full w-fit pl-5 pr-1">
        <div className="flex items-center space-x-4">
          <label htmlFor="continent-select" className="text-sm xl:text-lg text-nowrap">Select a continent</label>
          <select
            id="continent-select"
            value={selectedContinent}
            onChange={handleContinentChange}
            className="px-11 my-1 py-2 text-primary rounded-full bg-[#D9D9D9] focus:outline-none "
          >
            {['Earth', ...continents].map((continent, index) => (
              <option key={index} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>
      </div>

     

      {/* Travel description */}
      <p className="mt-4 text-gray-700">
        Explore the beauty and unique experiences that {featuredCountry.label} has to offer. From adventures to luxury escapes, discover your perfect destination today.
      </p>
    </div>
  );
};

export default FeaturedCountryCard;