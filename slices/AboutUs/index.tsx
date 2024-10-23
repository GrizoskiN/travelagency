import { Content } from "@prismicio/client";
import { ImageField, KeyTextField } from "@prismicio/types"; // Import necessary types from Prismic
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  SliceComponentProps,
  PrismicRichText,
  JSXMapSerializer,
} from "@prismicio/react";
import { ReactNode } from "react";
import { allura, aboreto } from "@/app/fonts";

/**
 * Props for `AboutUs`.
 */
export type AboutUsProps = SliceComponentProps<Content.AboutUsSlice>;

/**
 * Type for individual list item in the AboutUs slice.
 */
interface ListItem {
  id?: string; // Optional unique identifier
  list_icon: ImageField; // Using ImageField type from Prismic
  list_title: KeyTextField; // Title of the list item (can be string or null)
  list_description: KeyTextField; // Description of the list item (can be string or null)
}

/**
 * Component for "AboutUs" Slices.
 */
const components: JSXMapSerializer = {
  heading1: ({ children }: { children: ReactNode }) => (
    <h1 className={`${aboreto.className} uppercase text-2xl lg:text-5xl mb-3`}>
      {children}
    </h1>
  ),
  heading3: ({ children }: { children: ReactNode }) => (
    <h3 className={`${allura.className}  lg:text-2xl`}>{children}</h3>
  ),
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="lg:text-xl lg:w-2/3">{children}</p>
  ),
};

const AboutUs = ({ slice }: AboutUsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="customWidth relative  mt-32 py-16"
    >
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2">
          <PrismicNextImage
            field={slice.primary.about_us_image}
            className="relative z-40 mx-auto w-11/12 rounded-xl object-fit"
          />
        </div>
        <div className="rounded-xl p-5 lg:p-11 lg:w-1/2 ml-auto relative z-40">
          <PrismicRichText
            field={slice.primary.about_text}
            components={components}
          />
          <ul className="z-40 relative mt-11">
            {slice.primary.list_items.map((item: ListItem, index: number) => (
              <li key={item.id || index} className="flex flex-col lg:flex-row my-3">
                <PrismicNextImage
                  field={item.list_icon}
                  quality={100}
                  className="w-9 lg:w-16 h-9 lg:h-16"
                />
                <div className="lg:pl-6 lg:w-2/3">
                  <h3 className="text-xl font-bold">
                    {item.list_title ? item.list_title : "No title available"}
                  </h3>
                  <p>
                    {item.list_description
                      ? item.list_description
                      : "No description available"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <PrismicNextLink
            field={slice.primary.button_link}
            className="relative inline-flex items-center justify-center px-11 py-2 mt-6 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-xl bg-primary-foreground group hover:bg-primary"
          >
            <span className="absolute w-[140%] h-full bg-gradient-to-br from-primary to-primary transform translate-y-[100%] group-hover:translate-y-0 transition duration-300 ease-out rounded-full"></span>
            <span className="absolute w-[140%] h-full bg-gradient-to-br from-primary-foreground to-primary translate-y-[100%] group-hover:translate-y-0 transition duration-500 ease-out rounded-full"></span>
            <span className="relative">Contact Us</span>
            <span className="ml-2 relative transition-transform duration-300 transform group-hover:translate-x-2">
              →
            </span>
          </PrismicNextLink>
        </div>
      </div>
      <div className="bg-white rounded-xl absolute top-0 right-0 w-full lg:w-2/3 h-full"></div>
    </section>
  );
};

export default AboutUs;
