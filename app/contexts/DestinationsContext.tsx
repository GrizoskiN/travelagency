'use client'
import { createContext, ReactNode, useContext } from 'react';
import { Testimonial, BlogPost } from '@/lib/fetchData'; // Import BlogPost type as well

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
  blogPosts: BlogPost[]; // Add blog posts
  children: ReactNode;
}

const DestinationsContext = createContext<DestinationsProviderProps | undefined>(undefined);

export const DestinationsProvider = ({
  children,
  destinations,
  continentDetails,
  uniqueCountries,
  testimonials,
  blogPosts, // Add blog posts to the provider
}: DestinationsProviderProps) => {
  // Utility function to fetch related blog posts based on tags
  // const getRelatedPosts = (currentPostUid: string, currentTags: string[]) => {
  //   return blogPosts.filter(
  //     (post) => post.uid !== currentPostUid && post.tags.some((tag) => currentTags.includes(tag))
  //   ).slice(0, 3); // Return only 3 related posts
  // };

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
