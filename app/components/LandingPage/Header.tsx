import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Header({}) {
  const client = createClient();
  const page = await client.getSingle("headerimage");

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("headerimage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}