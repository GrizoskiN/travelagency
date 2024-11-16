import { PrismicNextImage } from "@prismicio/next";
import { FilledImageFieldImage } from "@prismicio/types"; // Import the appropriate Prismic type

interface HeaderImageProps {
  image: FilledImageFieldImage;
}

const HeaderImage = ({ image }: HeaderImageProps) => (
  <PrismicNextImage
    field={image}
    className="w-full h-[60vh] object-cover rounded-xl"
  />
);

export default HeaderImage;
