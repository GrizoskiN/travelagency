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
  tags: string[];
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

  return continentTexts.map((continentDoc: ContinentDoc) => {
    const slices = continentDoc.data?.slices || [];
    const primarySlice = slices.find((slice: Slice) => slice.primary) || {};

    return {
      uid: continentDoc.uid,
      continent_description: continentDoc.data?.continent_description?.toString() || "",
      heading_text: primarySlice?.primary?.heading_text?.toString() || "",
      last_card_text: primarySlice?.primary?.last_card_text?.toString() || "",
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
      testimonial_name: primarySlice?.primary?.testimonial_name?.toString() || "",
      persons_description: primarySlice?.primary?.persons_description?.toString() || "",
      testimonial_text: primarySlice?.primary?.testimonial_text?.toString() || "",
    };
  });
}
export async function fetchBlogPosts () {
  const client = createClient();
  const blogPosts = await client.getAllByType("blogpost");

  return blogPosts.map((blogDoc: PrismicDocument) => {
    const slices = blogDoc.data?.slices || [];
    const primarySlice = slices.find((slice: Slice) => slice.primary) || {};

    return {

      uid: blogDoc.uid,
      title: primarySlice?.primary?.title?.toString() ||  '', // Ensure text extraction
      image: primarySlice?.primary?.blog_image?.url || '', // Fetch image URL
      excerpt: primarySlice?.primary?.excerpt.toString() ||  '',
      date: primarySlice?.primary?.date || '',
      author: primarySlice?.primary?.author.toString() ||  '',
      minutes: primarySlice?.primary?.minutes.toString() ||  '',
   
      tags: primarySlice?.primary?.tags || [],
    } 
  });
}