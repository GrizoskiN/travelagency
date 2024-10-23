import FullButton from "@/app/components/Buttons/FullButton";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `MainMenu`.
 */
export type MainMenuProps = SliceComponentProps<Content.MainMenuSlice>;

/**
 * Component for "MainMenu" Slices.
 */

const MainMenu = ({ slice }: MainMenuProps): JSX.Element => {
  return (
    <section
      className="customWidth  flex items-center justify-between mt-11 mb-6"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <Link href="/" className="">
        {" "}
        <PrismicNextImage
          field={slice.primary.logo}
          alt=""
          className="max-w-[10rem]"
        />
      </Link>
      <div className="hidden xl:flex justify-between ">
        {slice.primary.menulink.map((item, index) => (
          <div key={index} className="relative flex items-center space-x-5">
            <PrismicNextLink
              field={item.menu_link}
              className="relative flex text-xl">
              {item.menu_item}
            </PrismicNextLink>
            <span className="last:hidden">|</span>
            {/* The dividers, but only show if it's not the last item */}
            {index < slice.primary.menulink.length - 1 && (
              <div className="h-2/3 w-[1px] mx-5 bg-accentColor"></div>
            )}
          </div>
        ))}
      </div>

      <div className=""><FullButton text={"Book Now"} link={"/contact"}  /></div>
    </section>
  );
};

export default MainMenu;
