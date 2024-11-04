"use client";
import { createContext, ReactNode, useContext } from 'react';
import { Testimonial, BlogPost } from '@/lib/fetchData';

interface Destination {
  uid: string; // Add uid for unique identification
  label: string; // Country label
  image: string; // URL for the country image
  continent: string;
  tags: string[];
  start_date?: string; // Optional: Start date for availability
  end_date?: string; // Optional: End date for availability
  group_size?: string; // Optional: Group size information (e.g., "2-4", "5+")
  meta_title?: string; // Title for displaying purposes
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
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  children: ReactNode;
}

const DestinationsContext = createContext<DestinationsProviderProps | undefined>(undefined);

export const DestinationsProvider = ({
  children,
  destinations,
  continentDetails,
  uniqueCountries,
  testimonials,
  blogPosts,
}: DestinationsProviderProps) => {
  return (
    <DestinationsContext.Provider
    value={{
      destinations,
      continentDetails,
      uniqueCountries,
      testimonials,
      blogPosts,
      children,  
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
