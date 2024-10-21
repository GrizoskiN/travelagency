'use client'
import { createContext, ReactNode, useContext } from 'react';
import { Testimonial } from '@/lib/fetchData';

interface Destination {
  label: string;
  image: string;
  continent: string;
  tags: string[];
}

interface ContinentDetail {
  uid: string;
  continent_description: string;
  heading_text: string;
  last_card_text: string;
}

interface DestinationsProviderProps {
  destinations: Destination[];
  continentDetails: ContinentDetail[];
  uniqueCountries: Destination[];
  testimonials: Testimonial[]; // Use the imported Testimonial type
  children: ReactNode;
}

const DestinationsContext = createContext<DestinationsProviderProps | undefined>(undefined);

export const DestinationsProvider = ({
  children,
  destinations,
  continentDetails,
  uniqueCountries,
  testimonials,
}: DestinationsProviderProps) => {
  return (
    <DestinationsContext.Provider
      value={{
        destinations,
        continentDetails,
        uniqueCountries,
        testimonials,
        children, // Include children in the provider's value
      }}
    >
      {children}
    </DestinationsContext.Provider>
  );
};

export const useDestinations = () => {
  const context = useContext(DestinationsContext);
  if (context === undefined) {
    throw new Error('useDestinations must be used within a DestinationsProvider');
  }
  return context;
};
