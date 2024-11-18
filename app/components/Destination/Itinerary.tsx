"use client";
import React, { useState } from "react";
import { KeyTextField, RichTextField } from "@prismicio/types";
import { PrismicRichText } from "@prismicio/react";
import { ReactNode } from "react";
import { RTLinkNode } from "@prismicio/client";

// Define the components used to customize how each rich text element is rendered
const richTextComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base mb-4">{children}</p>
  ),
  heading1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-3xl font-bold my-6">{children}</h1>
  ),
  heading2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-2xl font-semibold my-4">{children}</h2>
  ),
  heading3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-xl font-semibold my-3">{children}</h3>
  ),

  hyperlink: ({
    node,
    children,
  }: {
    node: RTLinkNode;
    children: ReactNode;
  }) => (
    <a
      href={node?.data?.url}
      className="text-blue-600 underline"
      target="_blank"
      rel="noopener noreferrer">
      {children}
    </a>
  ),
  oList: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal ml-5 mb-4">{children}</ol>
  ),
  list: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc ml-5 mb-4">{children}</ul>
  ),
  listItem: ({ children }: { children: ReactNode }) => (
    <li className="mb-2">{children}</li>
  ),
};

interface ItineraryItem {
  heading: KeyTextField;
  paragraph: RichTextField;
}

interface ItineraryProps {
  itinerary: ItineraryItem[];
}

const Itinerary = ({ itinerary }: ItineraryProps) => {
  // Always initialize hooks outside any conditions to avoid errors
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Return null if the itinerary is empty (after initializing hooks)
  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  // Toggle function to handle expanding/collapsing an item
  const toggleItem = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-[#F6F8F7] p-4 xl:p-6 rounded-xl ">
      <h2 className="text-2xl font-semibold mb-6">Itinerary</h2>
      <div className="space-y-4">
        {itinerary.map((item, index) => (
          <div key={index} className="bg-white rounded-lg  p-4">
            <div
              className={`flex justify-between items-center w-fit cursor-pointer  transition-colors duration-300 ${
                expandedIndex === index
                  ? "bg-backgroundColor p-3 lg:py-3 lg:px-5 rounded-xl "
                  : ""
              }`}
              onClick={() => toggleItem(index)}>
              <h3 className="text-sm lg:text-lg font-semibold flex-grow">
                {item.heading}
              </h3>
            </div>
            <div
              className={`transition-all overflow-hidden duration-1000 ease-in-out ${
                expandedIndex === index
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}>
              {expandedIndex === index && item.paragraph && (
                <div className="p-4">
                  <PrismicRichText
                    field={item.paragraph}
                    components={richTextComponents}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
