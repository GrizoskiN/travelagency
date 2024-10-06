// app/layout.tsx

import "./globals.css";
import { createClient } from "@/prismicio";
import { DestinationsProvider } from "./contexts/DestinationsContext";
import { ReactNode } from "react";
import Menu from "./components/MainMenu";

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Fetch data from Prismic at build/render time
  const client = createClient();
  const travelByDestination = await client.getAllByType("destinations");

  // Prepare unique destinations data
  const countrySet = new Set<string>();
  travelByDestination.forEach((doc) => {
    const country = Array.isArray(doc.data.country) && doc.data.country.length > 0
      ? doc.data.country[0]?.text
      : typeof doc.data.country === "string"
      ? doc.data.country
      : "";

    if (country.trim() !== "") {
      const normalizedCountry = country.trim().toLowerCase();
      countrySet.add(normalizedCountry);
    }
  });

  // Mapping the unique countries to the required structure
  const uniqueCountries = Array.from(countrySet).map((country) => ({
    value: country,
    label: country.charAt(0).toUpperCase() + country.slice(1),
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
