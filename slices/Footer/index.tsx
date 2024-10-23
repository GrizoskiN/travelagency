import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Footer`.
 */
export type FooterProps = SliceComponentProps<Content.FooterSlice>;

/**
 * Component for "Footer" Slices.
 */
const Footer = ({ slice }: FooterProps): JSX.Element => {
  return (
    <div
      className="bg-black py-11 mt-11"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <div className="customWidth  xl:w-2/3 mx-auto text-primary-foreground">
        <div className="flex  justify-between border-b-[1px] border-gray-600 pb-5">
          <PrismicNextImage
            field={slice.primary.logo}
            width={200}
            height={100} className="w-1/3 lg:w-48 object-contain"
          />
          <div className="xl:text-right">
            <h3 className="lg:text-2xl">
              <span>📞</span> Need help? Call us
            </h3>
            <h2 className="text-white text-2xl lg:text-4xl">
              {slice.primary.phone_number}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-4 lg:grid-cols-6  border-b-[1px] border-gray-600  py-6 ">
          <div className="col-span-4 lg:col-span-2 flex flex-col md:flex-row lg:flex-col items-start justify-between">
            <div className="">
              <h3 className="text-white text-xl pb-3">Contact Us</h3>
              <p className="hover:text-white duration-300 text-lg">
                <span>📞</span>
                {slice.primary.address}
              </p>
              <p className="hover:text-white duration-300 text-lg">
                <span>📞</span>
                {slice.primary.working_hours}
              </p>
              <p className="hover:text-white duration-300 text-lg">
                <span>📞</span>
                {slice.primary.email_address}
              </p>
            </div>
            <div className="my-4">
              <h3 className="text-xl text-white xl:my-4">Follow Us</h3>
              <div className="mt-5 flex space-x-2">
                {slice.primary.social_media.map((item, index) => (
                  <PrismicNextLink key={index} field={item.social_media_link}>
                    <PrismicNextImage
                      field={item.social_media_icon}
                      className="w-8"
                    />
                  </PrismicNextLink>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col col-span-2 md:col-span-1 mt-3  lg:justify-self-end">
            {slice.primary.support.map((item, index) => (
              <PrismicNextLink
                field={item.support_links}
                key={index}
                className="first:text-white first:text-xl first:pb-3 text-lg hover:text-white duration-300">
                {item.support_sub_menu}
              </PrismicNextLink>
            ))}
          </div>
          <div className="flex flex-col col-span-2 md:col-span-1 mt-3  lg:justify-self-end">
            {slice.primary.company.map((item, index) => (
              <PrismicNextLink
                field={item.company_links}
                key={index}
                className="first:text-white first:text-xl first:pb-3 text-lg hover:text-white duration-300">
                {item.company_sub_menu}
              </PrismicNextLink>
            ))}
          </div>
          <div className="flex flex-col col-span-2 md:col-span-1 mt-3  lg:justify-self-end">
            {slice.primary.services.map((item, index) => (
              <PrismicNextLink
                field={item.services_links}
                key={index}
                className="first:text-white first:text-xl first:pb-3 text-lg hover:text-white duration-300">
                {item.services_sub_items}
              </PrismicNextLink>
            ))}
          </div>
          <div className="flex flex-col col-span-2 md:col-span-1 mt-3  lg:justify-self-end">
            {slice.primary.legal.map((item, index) => (
              <PrismicNextLink
                field={item.legal_sub_links}
                key={index}
                className="first:text-white first:text-xl first:pb-3 text-lg hover:text-white duration-300">
                {item.legal_sub_items}
              </PrismicNextLink>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse text-center md:flex-row justify-between mt-4">
          <p className="mt-3 md:mt-0">{slice.primary.all_rights_reserved}</p>
          <div className="text-white text-lg space-x-4">
            {slice.primary.footer_menu.map((item, index) => (
              <PrismicNextLink key={index} field={item.footer_link}>
                {item.footer_item}
              </PrismicNextLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
