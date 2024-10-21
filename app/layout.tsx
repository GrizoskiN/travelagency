import "@/app/globals.css";
import { ReactNode } from "react";
import Menu from "./components/MainMenu";
import { abel } from "./fonts";
import { fetchDestinations, fetchContinentDetails, fetchTestimonials } from "@/lib/fetchData";
import { DestinationsProvider } from "./contexts/DestinationsContext";

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Fetch data
  const destinations = await fetchDestinations();
  const continentDetails = await fetchContinentDetails();
  const testimonials = await fetchTestimonials(); // Ensure this is correctly called.

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
          continentDetails={continentDetails}
          uniqueCountries={uniqueCountries}
          testimonials={testimonials} // Ensure testimonials are passed down.
        >
          <Menu />
          {children}
        </DestinationsProvider>
      </body>
    </html>
  );
}
