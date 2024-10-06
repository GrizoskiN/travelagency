// app/contexts/DestinationsContext.tsx

"use client";

import { createContext, useContext, ReactNode } from "react";

type Destination = {
  value: string;
  label: string;
};

type DestinationsContextProps = {
  destinations: Destination[];
};

const DestinationsContext = createContext<DestinationsContextProps | undefined>(undefined);

export const DestinationsProvider = ({ children, destinations }: { children: ReactNode; destinations: Destination[] }) => {
  return (
    <DestinationsContext.Provider value={{ destinations }}>
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
