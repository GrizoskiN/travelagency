import "./globals.css";
import { createClient } from "@/prismicio";
import { DestinationsProvider } from "./contexts/DestinationsContext";
import { ReactNode } from "react";
import Menu from "./components/MainMenu";

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Fetch data from Prismic at build/render time
  const client = createClient();
  const travelByDestination = await client.getAllByType("destinations");

  // Prepare unique destinations data with cities
  const destinationMap = new Map<string, { label: string; cities: string[] }>();

  travelByDestination.forEach((doc) => {
    const country = Array.isArray(doc.data.country) && doc.data.country.length > 0
      ? doc.data.country[0]?.text
      : typeof doc.data.country === "string"
      ? doc.data.country
      : "";

    const city = doc.data.city;

    if (country.trim() !== "") {
      const normalizedCountry = country.trim().toLowerCase();

      if (!destinationMap.has(normalizedCountry)) {
        destinationMap.set(normalizedCountry, {
          label: country.charAt(0).toUpperCase() + country.slice(1),
          cities: [],
        });
      }

      if (city && typeof city === "string") {
        destinationMap.get(normalizedCountry)?.cities.push(city);
      }
    }
  });

  // Map the destination data to the required format
  const uniqueCountries = Array.from(destinationMap.entries()).map(([country, data]) => ({
    value: country,
    label: data.label,
    cities: data.cities,
  }));

  return (
    <html lang="en">
      <body>
        {/* Provide pre-fetched destinations to DestinationsProvider */}
        <DestinationsProvider destinations={uniqueCountries}>
          <Menu />
          {children}
        </DestinationsProvider>
      </body>
    </html>
  );
}
