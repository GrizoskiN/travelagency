import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Testimonial`.
 */
export type TestimonialProps = SliceComponentProps<Content.TestimonialSlice>;

/**
 * Component for "Testimonial" Slices.
 */
const Testimonial = ({ slice }: TestimonialProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
     <PrismicNextImage
  field={slice.primary.testimonial_image}/>
  <h2>{slice.primary.testimonial_name}</h2>
  <h3>{slice.primary.persons_description}</h3>
  <p>{slice.primary.testimonial_text}</p>
    </section>
  );
};

export default Testimonial;
