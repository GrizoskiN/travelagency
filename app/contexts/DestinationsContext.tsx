"use client";
import { createContext, ReactNode, useContext } from 'react';
import { Testimonial, BlogPost, Tag } from '@/lib/fetchData';

// Define the shape of tagsDictionary as a Record of tags by their ID
interface TagDictionary {
  [id: string]: Tag;
}

interface Destination {
  uid: string; // Unique identifier
  label: string; // Country label
  continent: string;
  destination_image?: string | null ;
  tags?: string[] | null; // Allow both string[] (IDs) or Tag[]
  price?: string;
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
  tagsDictionary: TagDictionary;
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
  tagsDictionary
}: DestinationsProviderProps) => {
  return (
    <DestinationsContext.Provider
      value={{
        destinations,
        continentDetails,
        uniqueCountries,
        testimonials,
        blogPosts,
        tagsDictionary,
        children 
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
