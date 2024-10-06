import { createClient } from "@/prismicio";
import Link from "next/link";
import Image from "next/image";
import { PrismicDocument } from "@prismicio/types";
import { format } from "date-fns";

export default async function CountryPage({
  params,
  searchParams,
}: {
  params: { country: string };
  searchParams: { startDate?: string; endDate?: string };
}) {
  const startDateStr = searchParams.startDate;
  const endDateStr = searchParams.endDate;

  const client = createClient();
  const fetchedDestinations = await client.getAllByType("destinations");

  // Filter destinations by country or include all if 'all' is provided
  const selectedCountry = params.country.toLowerCase();
  let destinations = fetchedDestinations;

  if (selectedCountry !== "all") {
    destinations = destinations.filter((destinationsDoc: PrismicDocument) => {
      const country =
        destinationsDoc.data.country?.[0]?.text?.toLowerCase() ||
        destinationsDoc.data.country?.toLowerCase();
      return country === selectedCountry;
    });
  }

  // Filter and prioritize destinations based on specific date range
  const matchedDestinations: PrismicDocument[] = [];
  const nonMatchedDestinations: PrismicDocument[] = [];

  if (startDateStr && endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    destinations.forEach((destinationsDoc: PrismicDocument) => {
      const specificDateStr = destinationsDoc.data.specific_date;
      if (specificDateStr) {
        const specificDate = new Date(specificDateStr);
        if (specificDate >= startDate && specificDate <= endDate) {
          matchedDestinations.push(destinationsDoc);
        } else {
          nonMatchedDestinations.push(destinationsDoc);
        }
      } else {
        nonMatchedDestinations.push(destinationsDoc);
      }
    });
  } else {
    nonMatchedDestinations.push(...destinations);
  }

  if (matchedDestinations.length === 0 && nonMatchedDestinations.length === 0) {
    return <p>No destinations available for {params.country}</p>;
  }

  // If there are no matches based on the date range, show a specific message
  if (matchedDestinations.length === 0 && startDateStr && endDateStr) {
    return <p>Sorry, no available destinations in this time.</p>;
  }

  return (
    <div className="customWidth">
      <h1 className="text-4xl font-bold my-8">{params.country}</h1>

      {/* Display matched destinations in a separate row */}
      {matchedDestinations.length > 0 && (
        <div className="matched-destinations my-8 bg-pink-200">
          <h2 className="text-xl font-semibold mb-4">
            Destinations from{" "}
            {startDateStr
              ? format(new Date(startDateStr), "MMMM dd, yyyy")
              : ""}{" "}
            to{" "}
            {endDateStr ? format(new Date(endDateStr), "MMMM dd, yyyy") : ""}
          </h2>
          <div className="destination-grid grid grid-cols-5 gap-4">
            {matchedDestinations.map((destinationsDoc: PrismicDocument) => {
              const { country_image, meta_title } = destinationsDoc.data;
              const uid = destinationsDoc.uid;

              return (
                <Link
                  href={`/destination/${uid}`}
                  key={destinationsDoc.id}
                  className="block "
                >
                  {country_image?.url && (
                    <Image
                      src={country_image.url}
                      alt={`Travel in ${params.country} with ${process.env.NEXT_PUBLIC_AGENCY_NAME}`}
                      width={500}
                      height={500}
                      className="rounded-lg my-4"
                    />
                  )}
                  <h2 className="text-2xl font-bold mt-2">
                    {meta_title || "Untitled Destination"}
                  </h2>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Display non-matched destinations below */}
      <div className="non-matched-destinations my-8">
        {startDateStr && <h2 className="text-3xl font-semibold mb-4">Other Destinations</h2>}
        <div className="destination-grid grid grid-cols-5 gap-4">
          {nonMatchedDestinations.map((destinationsDoc: PrismicDocument) => {
            const { country_image, meta_title } = destinationsDoc.data;
            const uid = destinationsDoc.uid;

            return (
              <Link
                href={`/destination/${uid}`}
                key={destinationsDoc.id}
                className="block"
              >
                {country_image?.url && (
                  <Image
                    src={country_image.url}
                    alt={`Travel in ${params.country} with ${process.env.NEXT_PUBLIC_AGENCY_NAME}`}
                    width={500}
                    height={500}
                    className="rounded-lg my-4"
                  />
                )}
                <h2 className="text-2xl font-bold mt-2">
                  {meta_title || "Untitled Destination"}
                </h2>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
