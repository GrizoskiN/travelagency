import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Tag`.
 */
export type TagProps = SliceComponentProps<Content.TagSlice>;

/**
 * Component for "Tag" Slices.
 */
const Tag = ({ slice }: TagProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for tag (variation: {slice.variation}) Slices
    </section>
  );
};

export default Tag;
