'use client'
import { createContext, ReactNode, useContext } from "react";

type Destination = {
  label: string;
  image: string;
  continent: string;
  tags: string[];
};

type ContinentDetail = {
  uid: string;
  continent_description: string;
  heading_text: string; // Add heading text field
  last_card_text: string; // Add last card text field
};

type DestinationsContextProps = {
  destinations: Destination[];
  continentDetails: ContinentDetail[];
  uniqueCountries: Destination[];
};

const DestinationsContext = createContext<DestinationsContextProps | undefined>(undefined);

export const DestinationsProvider = ({
  children,
  destinations,
  continentDetails,
  uniqueCountries,
}: {
  children: ReactNode;
  destinations: Destination[];
  continentDetails: ContinentDetail[];
  uniqueCountries: Destination[];
}) => {
  return (
    <DestinationsContext.Provider
      value={{
        destinations,
        continentDetails,
        uniqueCountries,
      }}
    >
      {children}
    </DestinationsContext.Provider>
  );
};

export const useDestinations = () => {
  const context = useContext(DestinationsContext);
  if (!context) {
    throw new Error("useDestinations must be used within a DestinationsProvider");
  }
  return context;
};
