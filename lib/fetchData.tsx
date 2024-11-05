import { createClient } from "@/prismicio";
import { PrismicDocument, KeyTextField } from "@prismicio/types";

// Adjusting Slice interface
interface Slice {
  primary?: {
    heading_text?: KeyTextField;
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
export interface Tag {
  id: string;
  name: string;
  image: string;
}
export interface Destination {
  uid: string; // Unique identifier for destination
  label: string; // Country label
  image: string; // URL for the country image
  continent: string; // Continent
  tags: string[]; // Tags for the destination
  start_date?: string; // Optional: Start date for availability
  end_date?: string; // Optional: End date for availability
  group_size?: string; // Optional: Group size information (e.g., "2-4", "5+")
  meta_title?: string; // Optional: Title for displaying purposes
}

export interface Testimonial {
  uid: string | null;
  testimonial_image: string;
  testimonial_name: string;
  persons_description: string;
  testimonial_text: string;
}

export interface BlogPost {
  uid: string | null;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  author: string;
  minutes: string;
  tags: string[] ;
}
// Function to fetch all tags separately and build tagsDictionary
export async function fetchTags(): Promise<Record<string, Tag>> {
  const client = createClient();
  const allTags = await client.getAllByType("tags");

  const tagsDictionary = allTags.reduce((acc, tagDoc) => {
    acc[tagDoc.id] = {
      id: tagDoc.id,
      name: tagDoc.data.tag_name || "",
      image: tagDoc.data.icon?.url || "",
    };
    return acc;
  }, {} as Record<string, Tag>);

  return tagsDictionary;
}
// Function to fetch all destinations
export async function fetchDestinations(): Promise<Destination[]> {
  const client = createClient();

  // Fetch all destinations
  const travelByDestination = await client.getAllByType("destinations");

  // Fetch tagsDictionary once for use here
  const tagsDictionary = await fetchTags();

  // Map destinations and replace linked tags with IDs from tagsDictionary
  return travelByDestination.map((doc) => {
    const country =
      Array.isArray(doc.data.country) && doc.data.country.length > 0
        ? doc.data.country[0]?.text || ""
        : typeof doc.data.country === "string"
        ? doc.data.country
        : "";

      const tags = Array.isArray(doc.data.destination_tag)
  ? doc.data.destination_tag
      .map((tag) => (tag.tags_link as { id?: string })?.id)
      .filter((tagId): tagId is string => tagId !== undefined && tagsDictionary[tagId] !== undefined) // Ensures only defined string values
  : [];

      

    return {
      uid: doc.uid || "",
      label: country.charAt(0).toUpperCase() + country.slice(1).trim(),
      image: doc.data.country_image?.url || "",
      continent: doc.data.continent || "",
      tags, // Only tag IDs here
      start_date: doc.data.start_date || "",
      end_date: doc.data.end_date || "",
      group_size: doc.data.group_size || "",
      meta_title: doc.data.meta_title || "",
    };
  });
}
// Function to fetch continent texts
export async function fetchContinentDetails() {
  const client = createClient();
  const continentTexts = await client.getAllByType("continent_text");

  return continentTexts.map((continentDoc: ContinentDoc) => {
    const slices = continentDoc.data?.slices || [];
    const primarySlice = slices.find((slice) => slice.primary) || {
      primary: {},
    };

    return {
      uid: continentDoc.uid,
      continent_description:
        continentDoc.data?.continent_description?.toString() || "",
      heading_text: primarySlice.primary?.heading_text?.toString() || "",
      last_card_text: primarySlice.primary?.last_card_text?.toString() || "",
    };
  });
}

// Function to fetch testimonials
export async function fetchTestimonials() {
  const client = createClient();
  const testimonials = await client.getAllByType("testimonials");

  return testimonials.map((testimonialDoc: PrismicDocument) => {
    const slices = testimonialDoc.data?.slices || [];
    const primarySlice = slices.find((slice: Slice) => slice.primary) || {};

    return {
      uid: testimonialDoc.uid,
      testimonial_image: primarySlice?.primary?.testimonial_image?.url || "",
      testimonial_name:
        primarySlice?.primary?.testimonial_name?.toString() || "",
      persons_description:
        primarySlice?.primary?.persons_description?.toString() || "",
      testimonial_text:
        primarySlice?.primary?.testimonial_text?.toString() || "",
    };
  });
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const client = createClient();
  const blogPosts = await client.getAllByType("blogpost");

  return blogPosts.map((blogDoc: PrismicDocument) => {
    const slices = blogDoc.data?.slices || [];
    const primarySlice = slices.find((slice: Slice) => slice.primary) || {};

    return {
      uid: blogDoc.uid,
      title: primarySlice?.primary?.title?.toString() || "",
      image: primarySlice?.primary?.blog_image?.url || "",
      excerpt: primarySlice?.primary?.excerpt?.toString() || "",
      date: primarySlice?.primary?.date || "",
      author: primarySlice?.primary?.author?.toString() || "",
      minutes: primarySlice?.primary?.minutes?.toString() || "",
      tags: primarySlice?.primary?.tags || [],
    };
  });
}
