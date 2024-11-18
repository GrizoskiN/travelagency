import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("destinations", params.uid)
    .catch(() => notFound());

  // Pass the slices and static fields to the SliceZone
  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={{
        continent: page.data.continent,
        country: page.data.country,
        destination_image: page.data.destination_image?.url,
        meta_title: page.data.meta_title,
        meta_description: page.data.meta_description,
        start_date: page.data.start_date,
        end_date: page.data.end_date,
        group: page.data.group_size,
        tags: page.tags || "",
        price: page.data.price || "",
      }}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("destinations", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("destinations");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
