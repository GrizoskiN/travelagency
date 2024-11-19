import "@/app/globals.css";
import { ReactNode } from "react";
import Menu from "./components/MainMenu";
import { GeistSans } from 'geist/font/sans';

import { fetchDestinations, fetchTags, fetchContinentDetails, fetchTestimonials, fetchBlogPosts } from "@/lib/fetchData";
import { DestinationsProvider } from "./contexts/DestinationsContext";
import Footer from "./components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Agency - GoBro Studio",
  description:"Travel Agency - GoBro Studio"
}
export default async function RootLayout({ children }: { children: ReactNode }) {
  // Fetch data
  const destinations = await fetchDestinations();
  const tagsDictionary = await fetchTags(); // Fetch tags dictionary separately
  const continentDetails = await fetchContinentDetails();
  const testimonials = await fetchTestimonials();
  const blogPosts = await fetchBlogPosts();

  // Extract unique countries
  const uniqueCountries = Array.from(
    new Map(
      destinations.map((destination) => [
        destination.label.trim().toLowerCase(),
        destination,
      ])
    ).values()
  );

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-white">
        <DestinationsProvider
          destinations={destinations}
          tagsDictionary={tagsDictionary}
          continentDetails={continentDetails}
          uniqueCountries={uniqueCountries}
          testimonials={testimonials}
          blogPosts={blogPosts}
        >
          <Menu />
          {children}
          <Footer />
        </DestinationsProvider>
      </body>
    </html>
  );
}
