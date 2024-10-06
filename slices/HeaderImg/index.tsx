import SearchBar from "@/app/components/Search/Search";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Header`.
 */
export type HeaderProps = SliceComponentProps<Content.HeaderSlice>;

/**
 * Component for "Header" Slices.
 */
const Header = ({ slice}: HeaderProps): JSX.Element => {
  return (
    <section className="relative flex flex-col items-center text-center justify-center h-[85vh] customWidth"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
       <div className="z-40 ">
       <h1 className="text-6xl md:text-8xl xl:text-9xl text-white font-aboreto">{slice.primary.header_text}</h1>
       <p className=" uppercase md:text-xl text-white">{slice.primary.sub_header}</p>
       </div>
       <SearchBar />
      <PrismicNextImage
        field={slice.primary.header_image}
        quality={80}
        className="w-full h-full rounded-xl object-cover z-0 absolute inset-0"
      />
    </section>
  );
};

export default Header;
