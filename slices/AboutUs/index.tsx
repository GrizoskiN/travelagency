import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  SliceComponentProps,
  PrismicRichText,
  JSXMapSerializer,
} from "@prismicio/react";
import { ReactNode } from "react";
import { allura, aboreto } from "@/app/fonts";
import FullButton from "@/app/components/Buttons/FullButton";

/**
 * Props for `AboutUs`.
 */
export type AboutUsProps = SliceComponentProps<Content.AboutUsSlice>;

type LabelProps = {
  children: ReactNode;
};

/**
 * Component for "AboutUs" Slices.
 */
const components: JSXMapSerializer = {
  heading1: ({ children }: LabelProps) => (
    <h1 className={`${aboreto.className} uppercase text-5xl mb-3`}>
      {children}
    </h1>
  ),
  heading3: ({ children }: LabelProps) => (
    <h3 className={`${allura.className} text-2xl`}>{children}</h3>
  ),
  paragraph: ({ children }: LabelProps) => (
    <p className={` text-xl w-2/3 `}>{children}</p>
  ),
};

const AboutUs = ({ slice }: AboutUsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" customWidth relative py-16">
      <div className="flex items-center  ">
        <div className=" w-1/2">
          <PrismicNextImage
            field={slice.primary.about_us_image}
            className="relative z-40 mx-auto w-10/12 rounded-xl object-fit"
          />
        </div>
        <div className="rounded-xl p-11 w-1/2 ml-auto relative z-40 ">
          <PrismicRichText
            field={slice.primary.about_text}
            components={components}
          />
          <ul className="z-40 relative mt-11">
            {slice.primary.list_items.map((item: any, index: number) => (
              <li  key={item.id || index}  className="flex my-3">
                <PrismicNextImage
                  field={item.list_icon}
                  quality={100}
                  className="w-16 h-16"
                />
                <div className="pl-6 w-2/3">
                  <h3 className="text-xl font-bold"> {item.list_title}</h3>
                  <p className="">{item.list_description}</p>
                </div>
              </li>
            ))}
          </ul>
        <PrismicNextLink field={slice.primary.button_link} className="relative inline-flex items-center justify-center px-11 py-2 mt-6 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-xl bg-primary-foreground group hover:bg-primary">
        <span className="absolute w-[140%] h-full bg-gradient-to-br from-primary to-primary transform translate-y-[100%]  group-hover:translate-y-0 transition duration-300 ease-out rounded-full  " ></span>
        <span className="absolute w-[140%] h-full bg-gradient-to-br from-primary-foreground to-primary translate-y-[100%]  group-hover:translate-y-0 transition duration-500 ease-out rounded-full  " ></span>
        <span className="relative">Contact Us</span>
        <span className="ml-2 relative transition-transform duration-300 transform group-hover:translate-x-2">
          →
        </span>
        </PrismicNextLink>
        <FullButton link={slice.primary.button_link} text={"Contact"}/>
        </div>
      </div>
      <div className="bg-white rounded-xl absolute  top-0 right-0 w-2/3 h-full "></div>
    </section>
  );
};

export default AboutUs;
