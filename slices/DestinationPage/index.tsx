import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import ImageGallery from "@/app/components/Destination/ImageGallery";
import ThingsToKnow from "@/app/components/Destination/ThingsToKnow";

/**
 * Props for `DestinationPage`.
 */

interface DestinationPageProps
  extends SliceComponentProps<Content.DestinationPageSlice> {
  context: {
    group: string;
    tags: string[];
    continent: string;
    country: string;
    meta_title: string;
    meta_description: string;
    start_date: string;
    end_date: string;
  };
}

const DestinationPage = ({
  slice,
  context,
}: DestinationPageProps): JSX.Element => {
  return (
    <section
      className="customWidth max-w-[1300px] mx-auto"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      {/* <HeaderImage image={slice.primary.header_image} /> */}
      <div className="flex justify-between items-end">
        <div className="">
          <h1 className="text-3xl ">{context.meta_title}</h1>
          <div className="flex  gap-2 text-sm text-gray-500">
            <p>{context.group} Group Size | </p>
            {context.tags.map((tag, index) => (
              <div key={index}>
                <p className="capitalize">{tag}</p>
                <span className="last:hidden">|</span>
              </div>
            ))}
          </div>
        </div>
        <p className="flex items-end gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_442_456)">
              <path
                d="M13.4737 4.73908L10.5311 1.79652C10.2883 1.55373 10.042 1.43062 9.79916 1.43062C9.46568 1.43062 9.07629 1.68425 9.07629 2.39911V3.40088C6.93843 3.49406 4.94197 4.37081 3.41924 5.89347C1.80643 7.50618 0.918121 9.6504 0.917969 11.9312C0.917969 12.0951 1.02277 12.2406 1.17821 12.2925C1.21789 12.3057 1.25851 12.3121 1.29875 12.3121C1.41623 12.3121 1.52994 12.2575 1.60327 12.16C3.40129 9.76663 6.10826 8.35224 9.07629 8.24058V9.22694C9.07629 9.94174 9.46568 10.1954 9.79914 10.1954H9.79921C10.0421 10.1954 10.2883 10.0723 10.5311 9.82955L13.4736 6.88694C13.7596 6.60103 13.9171 6.21964 13.9171 5.81301C13.9171 5.40646 13.7596 5.02504 13.4737 4.73908Z"
                fill="#556270"
              />
            </g>
            <defs>
              <clipPath id="clip0_442_456">
                <rect
                  width="12.9992"
                  height="12.9992"
                  fill="white"
                  transform="translate(0.917969 0.371765)"
                />
              </clipPath>
            </defs>
          </svg>
          Share
        </p>
      </div>
      {/* Image Gallery */}
      <ImageGallery gallery={slice.primary.gallery} />

      {/* Things to Know Section */}
      <ThingsToKnow thingsToKnow={slice.primary.things_to_know} />
    </section>
  );
};

export default DestinationPage;
