import { createClient } from "@/prismicio";
import Link from "next/link";
import Image from "next/image";
import { PrismicDocument } from "@prismicio/types";

export default async function Page() {
  const agencyName = process.env.NEXT_PUBLIC_AGENCY_NAME;
  const client = createClient();
  const fetchedDestinations = await client.getAllByType("destinations");

  // Group destinations by country
  const groupedByCountry: Record<string, PrismicDocument[]> = {};
  fetchedDestinations.forEach((destinationDoc: PrismicDocument) => {
    const { country } = destinationDoc.data;

    if (!country) {
      return;
    }

    if (!groupedByCountry[country]) {
      groupedByCountry[country] = [];
    }
    groupedByCountry[country].push(destinationDoc);
  });
  
  // Return the component with the grouped countries
  return (
    <div className="customWidth">
      {Object.keys(groupedByCountry).length === 0 && <p>No data available</p>}
      {Object.entries(groupedByCountry).map(([country, destinations]) => (
        <section key={country} className="country-section my-8">
          <h1 className="text-4xl font-bold">{country}</h1>
          <div className="destination-grid grid grid-cols-5 gap-4">
            {destinations.map((destinationDoc: PrismicDocument) => {
              const { country_image, meta_title } = destinationDoc.data;
              const uid = destinationDoc.uid;

              return (
                <Link href={`/destination/${uid}`} key={destinationDoc.id} className="block">
                  {country_image?.url && (
                    <Image
                      src={country_image.url} priority
                     alt={`Travel in ${country} with ${agencyName}`}
                      width={500}
                      height={500}
                      className="rounded-lg my-4"
                    />
                  )}
                  <h2 className="text-2xl font-bold mt-2">{meta_title || "Untitled Destination"}</h2>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
