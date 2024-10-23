import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Newsletter`.
 */
export type NewsletterProps = SliceComponentProps<Content.NewsletterSlice>;

/**
 * Component for "Newsletter" Slices.
 */
const Newsletter = ({ slice }: NewsletterProps): JSX.Element => {
  return (
    <section
      className="customWidth xl:w-2/3  mx-auto relative md:h-[20rem] lg:h-[25rem] 2xl:h-[35rem] my-32 rounded-xl overflow-hidden "
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <div className="w-full 2xl:ml-32 md:p-8 2xl:pt-24 md:w-1/2 2xl:w-[40%] space-y-4 ">
        <h1 className="bg-[#F9FD27] text-xl lg:text-2xl w-fit py-2 px-5 rounded-full">{slice.primary.title}</h1>
        <p className="text-xl xl:text-3xl lg:pb-11 xl:pb-16">{slice.primary.text}</p>
        <form className="flex items-center bg-white rounded-full overflow-hidden shadow-lg p-[5px] w-full">
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-2 text-gray-700 w-full rounded-full outline-none"
          />
          <button
            type="submit"
            className="relative inline-flex items-center justify-center px-11 py-2 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full bg-primary-foreground group hover:bg-primary">
            <span className="absolute w-[140%] h-full bg-gradient-to-br from-primary to-primary transform translate-y-[100%]  group-hover:translate-y-0 transition duration-300 ease-out rounded-full  "></span>
            <span className="absolute w-[140%] h-full bg-gradient-to-br from-primary-foreground to-primary translate-y-[100%]  group-hover:translate-y-0 transition duration-500 ease-out rounded-full  "></span>
            <span className="relative">{slice.primary.button_text}</span>
          </button>
        </form>
        <p className="pl-5">{slice.primary.alter_text}</p>
      </div>
      <PrismicNextImage
        field={slice.primary.image}
        className="md:absolute inset-0 -z-10 h-full rounded-xl w-full  object-cover"
      />
    </section>
  );
};

export default Newsletter;
