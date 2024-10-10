// app/contexts/DestinationsContext.tsx

"use client";

import { createContext, useContext, ReactNode } from "react";

type Destination = {
  value: string;
  label: string;
  image: string; 
  tags: string[]; 
  continent: string;
};

type DestinationsContextProps = {
  destinations: Destination[];
  onChange: (value: string) => void;
};

const DestinationsContext = createContext<DestinationsContextProps | undefined>(undefined);

export const DestinationsProvider = ({ children, destinations }: { children: ReactNode; destinations: Destination[] }) => {
  const handleChange = (value: string) => {
    // Implement the handler logic if needed
    console.log("Country changed:", value);
  };

  return (
    <DestinationsContext.Provider value={{ destinations, onChange: handleChange }}>
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
