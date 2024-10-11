// lib/fetchData.ts

import { createClient } from "@/prismicio";
import { KeyTextField } from "@prismicio/types";

// Adjusting Slice interface
interface Slice {
  primary?: {
    heading_text?: KeyTextField; // Use KeyTextField for Prismic's key text type
    last_card_text?: KeyTextField;
  };
}

// Adjusting ContinentDoc interface to match Prismic types
interface ContinentDoc {
  uid: string;
  data: {
    continent_description?: KeyTextField | null;
    slices?: Slice[];
  };
}

// Function to fetch all destinations
export async function fetchDestinations() {
  const client = createClient();
  const travelByDestination = await client.getAllByType("destinations");

  return travelByDestination.map((doc) => {
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
}

// Function to fetch continent texts
export async function fetchContinentDetails() {
  const client = createClient();
  const continentTexts = await client.getAllByType("continent_text");

  // Prepare continent details
  return continentTexts.map((continentDoc: ContinentDoc) => {
    const slices = continentDoc.data?.slices || [];
    const primarySlice = slices.find((slice: Slice) => slice.primary) || {};

    return {
      uid: continentDoc.uid,
      continent_description: continentDoc.data?.continent_description?.toString() || "", // Convert KeyTextField to string
      heading_text: primarySlice?.primary?.heading_text?.toString() || "",
      last_card_text: primarySlice?.primary?.last_card_text?.toString() || "",
    };
  });
}