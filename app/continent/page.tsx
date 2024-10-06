import React, {useState, useEffect} from "react";
import { createClient } from "@/prismicio";
import { PrismicDocument } from "@prismicio/types";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [countries, setCountries] = useState<Record<string, PrismicDocument[]>>({});

  useEffect(() => {
    async function fetchContinents() {
      const client = createClient();
      const fetchedContinents = await client.getAllByType("continent");

      // Group destinations by country
      const groupedByCountry: Record<string, PrismicDocument[]> = {};
      fetchedContinents.forEach((continentDoc: PrismicDocument) => {
        const { country } = continentDoc.data;

        // Handle the case where country could be null
        if (!country) {
          return;
        }

        if (!groupedByCountry[country as string]) {
          groupedByCountry[country as string] = [];
        }
        groupedByCountry[country as string].push(continentDoc);
      });

      setCountries(groupedByCountry);
    }

    fetchContinents();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {Object.keys(countries).length === 0 && <p>Loading countries and destinations...</p>}
      {Object.entries(countries).map(([country, destinations], index: number) => (
        <section key={index} className="country-section my-8">
          <h1 className="text-4xl font-bold">{country}</h1>
          <div className="destination-grid grid grid-cols-2 gap-4">
            {destinations.map((destinationDoc: PrismicDocument) => {
              const { country_image, meta_title } = destinationDoc.data;
              const uid = destinationDoc.uid;

              return (
                <Link href={`/destination/${uid}`} key={destinationDoc.id} className="block">
                  {country_image?.url && (
                    <Image
                      src={country_image.url}
                      alt={country_image?.alt || "Country Image"}
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
