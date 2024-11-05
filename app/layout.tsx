import "@/app/globals.css";
import { ReactNode } from "react";
import Menu from "./components/MainMenu";
import { abel } from "./fonts";
import { fetchDestinations, fetchTags, fetchContinentDetails, fetchTestimonials, fetchBlogPosts } from "@/lib/fetchData";
import { DestinationsProvider } from "./contexts/DestinationsContext";
import Footer from "./components/Footer";

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
    <html lang="en" className={abel.className}>
      <body className="bg-backgroundColor">
        <DestinationsProvider
          destinations={destinations}
          tagsDictionary={tagsDictionary} // Pass tagsDictionary here
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
