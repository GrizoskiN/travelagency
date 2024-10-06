import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `DestinationPage`.
 */
export type DestinationPageProps =
  SliceComponentProps<Content.DestinationPageSlice>;

/**
 * Component for "DestinationPage" Slices.
 */
const DestinationPage = ({ slice }: DestinationPageProps): JSX.Element => {
  return (
    <section className="customWidth"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <PrismicNextImage field={slice.primary.header_image} className="w-full h-[60vh] object-cover rounded-xl "/>
      <div className="grid grid-cols-5 gap-3 my-6">
      {slice.primary.gallery.map((item, index) => (
        <PrismicNextImage key={index} field={item.imagegallery} alt="" />
      ))}
      </div>
    </section>
  );
};

export default DestinationPage;
