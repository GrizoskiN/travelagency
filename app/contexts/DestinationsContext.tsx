"use client";

import { createContext, useContext, ReactNode } from "react";

type Destination = {
  
  label: string;
  image: string;
  tags: string[];
  continent: string;

};

type ContinentDetail = {
  uid: string;
  continent_description: string;
};

type DestinationsContextProps = {
  destinations: Destination[];
  continentDetails: ContinentDetail[];
  onChange: (value: string) => void;
};

const DestinationsContext = createContext<DestinationsContextProps | undefined>(undefined);

export const DestinationsProvider = ({
  children,
  destinations,
  continentDetails,
}: {
  children: ReactNode;
  destinations: Destination[];
  continentDetails: ContinentDetail[];
}) => {
  const handleChange = (value: string) => {
    console.log("Country changed:", value);
  };

  return (
    <DestinationsContext.Provider value={{ destinations, continentDetails, onChange: handleChange }}>
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
