import { Content } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Country`.
 */
export type CountryProps = SliceComponentProps<Content.CountrySlice>;

/**
 * Component for "Country" Slices.
 */
const Country = ({ slice }: CountryProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
     <PrismicNextImage field={slice.primary.country_image} />
     <h2>{slice.primary.country_name}</h2>
    </section>
  );
};

export default Country;
