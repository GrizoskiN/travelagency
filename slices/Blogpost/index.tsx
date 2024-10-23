import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Blogpost`.
 */
export type BlogpostProps = SliceComponentProps<Content.BlogpostSlice>;

/**
 * Component for "Blogpost" Slices.
 */
const Blogpost = ({ slice }: BlogpostProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h1>{slice.primary.title}</h1>
    </section>
  );
};

export default Blogpost;
