"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDestinations } from "@/app/contexts/DestinationsContext";
import { format } from "date-fns";
import { Destination } from "@/lib/fetchData";

export default function CountryPage({
  params,
}: {
  params: { country: string };
}) {
  const searchParams = useSearchParams();
  const startDateStr = searchParams.get("startDate");
  const endDateStr = searchParams.get("endDate");
  const groupSizeStr = searchParams.get("groupSize");

  const { destinations } = useDestinations(); // Use context to get destinations

  // Filter destinations by country or include all if 'all' is provided
  const selectedCountry = params.country.toLowerCase();
  let filteredDestinations = destinations;

  if (selectedCountry !== "all") {
    filteredDestinations = filteredDestinations.filter(
      (dest) => dest.label.toLowerCase() === selectedCountry
    );
  }

  // If no destinations are found for the selected country, show a specific message
  if (filteredDestinations.length === 0) {
    return <p>No destinations available for {params.country}</p>;
  }

  // Filter and prioritize destinations based on specific date range and group size
  const matchedDestinations: Destination[] = [];

  filteredDestinations.forEach((destination) => {
    const { start_date, end_date, group_size } = destination;

    // Determine if the destination falls within the specified date range
    const isInDateRange =
      startDateStr && endDateStr
        ? start_date &&
          end_date &&
          new Date(start_date) <= new Date(endDateStr) &&
          new Date(end_date) >= new Date(startDateStr)
        : true; // Default to true if no date range filter is applied

    // Determine if the destination matches the group size filter
    const isInGroupSize =
      groupSizeStr !== null
        ? group_size && checkGroupSize(group_size, groupSizeStr)
        : true; // Default to true if no group size filter is applied

    // Add destination to matchedDestinations if all selected filters match
    if (isInDateRange && isInGroupSize) {
      matchedDestinations.push(destination);
    }
  });

  // Helper function to check group size
  function checkGroupSize(
    destinationGroupSize: string,
    groupSizeStr: string
  ): boolean {
    const groupSize = parseInt(groupSizeStr, 10);

    if (isNaN(groupSize)) return false; // Invalid group size input

    // Handle ranges like "4+"
    if (destinationGroupSize.includes("+")) {
      const min = parseInt(destinationGroupSize.replace("+", ""), 10);
      return groupSize >= min;
    }

    // Handle ranges like "2-4"
    if (destinationGroupSize.includes("-")) {
      const [min, max] = destinationGroupSize.split("-").map(Number);
      return groupSize >= min && groupSize <= max;
    }

    return false;
  }

  // Display filtered destinations
  return (
    <div className="customWidth">
      <h1 className="text-4xl font-bold my-8">{params.country}</h1>

      {/* Display matched destinations */}
      {matchedDestinations.length > 0 ? (
        <div className="matched-destinations my-8 bg-pink-200">
          <h2 className="text-xl font-semibold mb-4">
            {startDateStr || endDateStr || groupSizeStr ? (
              <>
                Destinations from{" "}
                {startDateStr
                  ? format(new Date(startDateStr), "MMMM dd, yyyy")
                  : ""}{" "}
                to{" "}
                {endDateStr
                  ? format(new Date(endDateStr), "MMMM dd, yyyy")
                  : ""}
                {groupSizeStr ? ` for ${groupSizeStr} guests` : ""}
              </>
            ) : (
              "All Destinations"
            )}
          </h2>
          <div className="destination-grid grid grid-cols-5 gap-4">
            {matchedDestinations.map((dest) => (
              <div key={dest.uid} className="block">
                {dest.image && (
                  <Image
                    src={dest.image}
                    alt=""
                    width={500}
                    height={500}
                    className="rounded-lg my-4"
                  />
                )}
                <h2 className="text-2xl font-bold mt-2">
                  {dest.meta_title || "Untitled Destination"}
                </h2>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No matching destinations found.</p>
      )}
    </div>
  );
}
