import { ReactNode } from "react";
import Menu from "./components/MainMenu";
import { createClient } from "@/prismicio";
import { DestinationsProvider } from "./contexts/DestinationsContext";
import { abel } from "./fonts"

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Fetch data from Prismic
  const client = createClient();
  const travelByDestination = await client.getAllByType("destinations");

  // Prepare unique destinations data with continents and country images
  const destinationMap = new Map<string, { label: string; image: string; continent: string; tags: string[] }>();

  travelByDestination.forEach((doc) => {
    const country =
      Array.isArray(doc.data.country) && doc.data.country.length > 0
        ? doc.data.country[0]?.text
        : typeof doc.data.country === "string"
        ? doc.data.country
        : "";
  
    const tags = doc.tags || [];
  
    const countryImage = doc.data.country_image?.url || "";
    const continent = doc.data.continent || "";
  
    if (country.trim() !== "") {
      const normalizedCountry = country.trim().toLowerCase();
  
      if (!destinationMap.has(normalizedCountry)) {
        destinationMap.set(normalizedCountry, {
          label: country.charAt(0).toUpperCase() + country.slice(1),
          image: countryImage,
          continent, // Ensure continent is added
          tags, // Add tags here
        });
      }
    }
  });
  
  // Create uniqueCountries array
  const uniqueCountries = Array.from(destinationMap.entries()).map(([country, data]) => ({
    value: country,
    label: data.label,
    image: data.image,
    continent: data.continent,
    tags: data.tags, // Include tags in the structure
  }));
  

  return (
    <html lang="en" className={abel.className} >
      <body className="bg-backgroundColor">
        <DestinationsProvider destinations={uniqueCountries}>
          <Menu />
          {children}
        </DestinationsProvider>
      </body>
    </html>
  );
}
