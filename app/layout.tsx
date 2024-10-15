import { ReactNode } from "react";
import Menu from "./components/MainMenu";
import { abel } from "./fonts";
import { fetchDestinations, fetchContinentDetails } from "@/lib/fetchData";
import { DestinationsProvider } from "./contexts/DestinationsContext";
import "@/app/globals.css";

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Fetch data
  const destinations = await fetchDestinations();
  const continentDetails = await fetchContinentDetails();

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
        >
          <Menu />
          {children}
        </DestinationsProvider>
      </body>
    </html>
  );
}
