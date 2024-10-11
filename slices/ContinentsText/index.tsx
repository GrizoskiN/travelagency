import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContinentsText`.
 */
export type ContinentsTextProps =
  SliceComponentProps<Content.ContinentsTextSlice>;

/**
 * Component for "ContinentsText" Slices.
 */
const ContinentsText = ({ slice }: ContinentsTextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for continents_text (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ContinentsText;
