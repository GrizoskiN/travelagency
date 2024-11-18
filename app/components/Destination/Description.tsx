import { PrismicRichText } from "@prismicio/react";
import { RichTextField } from "@prismicio/client";
import { ReactNode } from "react";
import { RTLinkNode } from "@prismicio/types";
// Define the components used to customize how each rich text element is rendered
const richTextComponents = {
  // Custom render for paragraph tags
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base mb-4">{children}</p>
  ),
  // Custom render for h1 tags
  heading1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-3xl font-bold my-6">{children}</h1>
  ),
  // Custom render for h2 tags
  heading2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-2xl font-semibold my-4">{children}</h2>
  ),
  // Custom render for h3 tags
  heading3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-xl font-semibold my-3">{children}</h3>
  ),
  // Custom render for bold text
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-bold">{children}</strong>
  ),
  // Custom render for links
  hyperlink: ({
    node,
    children,
  }: {
    node: RTLinkNode;
    children: ReactNode;
  }) => (
    <a
      href={node.data.url} // RTLinkNode contains the necessary typing for URL
      className="text-blue-600 underline"
      target="_blank"
      rel="noopener noreferrer">
      {children}
    </a>
  ),
  // Custom render for ordered lists
  oList: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal ml-5 mb-4">{children}</ol>
  ),
  // Custom render for unordered lists
  list: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc ml-5 mb-4">{children}</ul>
  ),
  // Custom render for list items
  listItem: ({ children }: { children: ReactNode }) => (
    <li className="mb-2">{children}</li>
  ),
};
interface DescriptionProps {
  description: RichTextField;
}

const Description = ({ description }: DescriptionProps) => {
  // Check if the description is empty, and return null to hide the component
  if (!description || description.length === 0) {
    return null;
  }

  return (
    <div className="bg-backgroundColor rounded-xl  p-3 xl:p-6  ">
      <h1 className="text-xl md:text-3xl font-semibold mb-11">
     Description
      </h1>
      <div className="bg-white p-4 xl:p-6 rounded-xl">
      <PrismicRichText field={description} components={richTextComponents} />
      </div>
    </div>
  );
};

export default Description;
