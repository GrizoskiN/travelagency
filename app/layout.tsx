import { ReactNode } from "react";
import Menu from "./components/MainMenu";
import { createClient } from "@/prismicio";
import { DestinationsProvider } from "./contexts/DestinationsContext";
import { abel } from "./fonts";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Fetch data from Prismic
  const client = createClient();
  const travelByDestination = await client.getAllByType("destinations");
  const continentTexts = await client.getAllByType("continent_text"); // Fetch continent texts separately

  // Prepare continent details
  interface ContinentDoc {
    uid: string;
    data: {
      continent_description: string | null; // Account for possible null value
    };
  }

  const continentDetails = continentTexts.map((continentDoc: ContinentDoc) => ({
    uid: continentDoc.uid, // UID (Name of the continent)
    continent_description: continentDoc.data.continent_description || "", // Assuming the field name is continent_description
  }));

  // Create an array to store all destinations
  const destinations = travelByDestination.map((doc) => {
    const country =
      Array.isArray(doc.data.country) && doc.data.country.length > 0
        ? doc.data.country[0]?.text
        : typeof doc.data.country === "string"
        ? doc.data.country
        : "";

    const tags = doc.tags || [];
    const countryImage = doc.data.country_image?.url || "";
    const continent = doc.data.continent || "";

    return {
      label: country.charAt(0).toUpperCase() + country.slice(1).trim(),
      image: countryImage,
      continent,
      tags,
    };
  });

  return (
    <html lang="en" className={abel.className}>
      <body className="bg-backgroundColor">
        <DestinationsProvider
          destinations={destinations} // Pass all destinations
          continentDetails={continentDetails} // Provide continent details to the context
        >
          <Menu />
          {children}
        </DestinationsProvider>
      </body>
    </html>
  );
}
