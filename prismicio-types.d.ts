// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type ContinentTextDocumentDataSlicesSlice = ContinentsTextSlice;

/**
 * Content for Continent text documents
 */
interface ContinentTextDocumentData {
  /**
   * Continent Description field in *Continent text*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: continent_text.continent_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  continent_description: prismic.KeyTextField;

  /**
   * Slice Zone field in *Continent text*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: continent_text.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ContinentTextDocumentDataSlicesSlice> /**
   * Meta Title field in *Continent text*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: continent_text.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Continent text*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: continent_text.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Continent text*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: continent_text.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Continent text document from Prismic
 *
 * - **API ID**: `continent_text`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ContinentTextDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<ContinentTextDocumentData>,
    "continent_text",
    Lang
  >;

type DestinationsDocumentDataSlicesSlice = DestinationPageSlice;

/**
 * Content for destination documents
 */
interface DestinationsDocumentData {
  /**
   * meta_title field in *destination*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Name of the place
   * - **API ID Path**: destinations.meta_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;

  /**
   * Continent field in *destination*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **API ID Path**: destinations.continent
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  continent: prismic.SelectField<
    | "Europe"
    | "Asia"
    | "South America"
    | "North America"
    | "Africa"
    | "Australia"
  >;

  /**
   * meta_description field in *destination*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Description
   * - **API ID Path**: destinations.meta_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * country_image field in *destination*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: destinations.country_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  country_image: prismic.ImageField<never>;

  /**
   * Specific Date field in *destination*
   *
   * - **Field Type**: Date
   * - **Placeholder**: Offer with fixed dates
   * - **API ID Path**: destinations.specific_date
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  specific_date: prismic.DateField;

  /**
   * Country field in *destination*
   *
   * - **Field Type**: Text
   * - **Placeholder**: France
   * - **API ID Path**: destinations.country
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  country: prismic.KeyTextField;

  /**
   * City field in *destination*
   *
   * - **Field Type**: Text
   * - **Placeholder**: City
   * - **API ID Path**: destinations.city
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  city: prismic.KeyTextField;

  /**
   * destination tag field in *destination*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: destinations.destination_tag
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  destination_tag: prismic.ContentRelationshipField<"destinations">;

  /**
   * Slice Zone field in *destination*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: destinations.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<DestinationsDocumentDataSlicesSlice>;
}

/**
 * destination document from Prismic
 *
 * - **API ID**: `destinations`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type DestinationsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<DestinationsDocumentData>,
    "destinations",
    Lang
  >;

type HeaderimageDocumentDataSlicesSlice = HeaderSlice;

/**
 * Content for HeaderImage documents
 */
interface HeaderimageDocumentData {
  /**
   * Slice Zone field in *HeaderImage*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: headerimage.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HeaderimageDocumentDataSlicesSlice> /**
   * Meta Title field in *HeaderImage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: headerimage.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *HeaderImage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: headerimage.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *HeaderImage*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: headerimage.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * HeaderImage document from Prismic
 *
 * - **API ID**: `headerimage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HeaderimageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<HeaderimageDocumentData>,
    "headerimage",
    Lang
  >;

type MenuDocumentDataSlicesSlice = MainMenuSlice;

/**
 * Content for Menu documents
 */
interface MenuDocumentData {
  /**
   * Slice Zone field in *Menu*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<MenuDocumentDataSlicesSlice> /**
   * Meta Title field in *Menu*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: menu.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Menu*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: menu.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Menu*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Menu document from Prismic
 *
 * - **API ID**: `menu`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type MenuDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<MenuDocumentData>, "menu", Lang>;

export type AllDocumentTypes =
  | ContinentTextDocument
  | DestinationsDocument
  | HeaderimageDocument
  | MenuDocument;

/**
 * Primary content in *ContinentsText → Default → Primary*
 */
export interface ContinentsTextSliceDefaultPrimary {
  /**
   * Heading text field in *ContinentsText → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: continents_text.default.primary.heading_text
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  heading_text: prismic.KeyTextField;

  /**
   * Last card text field in *ContinentsText → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: continents_text.default.primary.last_card_text
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  last_card_text: prismic.KeyTextField;
}

/**
 * Default variation for ContinentsText Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContinentsTextSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ContinentsTextSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *ContinentsText*
 */
type ContinentsTextSliceVariation = ContinentsTextSliceDefault;

/**
 * ContinentsText Shared Slice
 *
 * - **API ID**: `continents_text`
 * - **Description**: ContinentsText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContinentsTextSlice = prismic.SharedSlice<
  "continents_text",
  ContinentsTextSliceVariation
>;

/**
 * Item in *DestinationPage → Default → Primary → Gallery*
 */
export interface DestinationPageSliceDefaultPrimaryGalleryItem {
  /**
   * ImageGallery field in *DestinationPage → Default → Primary → Gallery*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: destination_page.default.primary.gallery[].imagegallery
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  imagegallery: prismic.ImageField<never>;
}

/**
 * Primary content in *DestinationPage → Default → Primary*
 */
export interface DestinationPageSliceDefaultPrimary {
  /**
   * Header Image field in *DestinationPage → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: destination_page.default.primary.header_image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  header_image: prismic.ImageField<never>;

  /**
   * Gallery field in *DestinationPage → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: destination_page.default.primary.gallery[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  gallery: prismic.GroupField<
    Simplify<DestinationPageSliceDefaultPrimaryGalleryItem>
  >;

  /**
   * destination field in *DestinationPage → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: destination_page.default.primary.destination
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  destination: prismic.KeyTextField;

  /**
   * Location field in *DestinationPage → Default → Primary*
   *
   * - **Field Type**: GeoPoint
   * - **Placeholder**: *None*
   * - **API ID Path**: destination_page.default.primary.location
   * - **Documentation**: https://prismic.io/docs/field#geopoint
   */
  location: prismic.GeoPointField;
}

/**
 * Default variation for DestinationPage Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type DestinationPageSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<DestinationPageSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *DestinationPage*
 */
type DestinationPageSliceVariation = DestinationPageSliceDefault;

/**
 * DestinationPage Shared Slice
 *
 * - **API ID**: `destination_page`
 * - **Description**: DestinationPage
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type DestinationPageSlice = prismic.SharedSlice<
  "destination_page",
  DestinationPageSliceVariation
>;

/**
 * Primary content in *HeaderImg → Default → Primary*
 */
export interface HeaderSliceDefaultPrimary {
  /**
   * Header Image field in *HeaderImg → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: header.default.primary.header_image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  header_image: prismic.ImageField<never>;

  /**
   * Header Text field in *HeaderImg → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: EXPLORE
   * - **API ID Path**: header.default.primary.header_text
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  header_text: prismic.KeyTextField;

  /**
   * Sub Header field in *HeaderImg → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: the beauty of the world
   * - **API ID Path**: header.default.primary.sub_header
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  sub_header: prismic.KeyTextField;
}

/**
 * Default variation for HeaderImg Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeaderSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<HeaderSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *HeaderImg*
 */
type HeaderSliceVariation = HeaderSliceDefault;

/**
 * HeaderImg Shared Slice
 *
 * - **API ID**: `header`
 * - **Description**: Header
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeaderSlice = prismic.SharedSlice<"header", HeaderSliceVariation>;

/**
 * Item in *MainMenu → Default → Primary → MenuLink*
 */
export interface MainMenuSliceDefaultPrimaryMenulinkItem {
  /**
   * Menu Item field in *MainMenu → Default → Primary → MenuLink*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Menu Item
   * - **API ID Path**: main_menu.default.primary.menulink[].menu_item
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  menu_item: prismic.KeyTextField;

  /**
   * Menu link field in *MainMenu → Default → Primary → MenuLink*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Menu Item Link
   * - **API ID Path**: main_menu.default.primary.menulink[].menu_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  menu_link: prismic.LinkField;
}

/**
 * Item in *MainMenu → Sub Menu Item → Primary → MenuLink*
 */
export interface MainMenuSliceSubMenuItemPrimaryMenulinkItem {
  /**
   * Menu Item field in *MainMenu → Sub Menu Item → Primary → MenuLink*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Menu Item
   * - **API ID Path**: main_menu.subMenuItem.primary.menulink[].menu_item
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  menu_item: prismic.KeyTextField;

  /**
   * Menu link field in *MainMenu → Sub Menu Item → Primary → MenuLink*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Menu Item Link
   * - **API ID Path**: main_menu.subMenuItem.primary.menulink[].menu_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  menu_link: prismic.LinkField;
}

/**
 * Primary content in *MainMenu → Default → Primary*
 */
export interface MainMenuSliceDefaultPrimary {
  /**
   * Logo field in *MainMenu → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: main_menu.default.primary.logo
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never>;

  /**
   * MenuLink field in *MainMenu → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: main_menu.default.primary.menulink[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  menulink: prismic.GroupField<
    Simplify<MainMenuSliceDefaultPrimaryMenulinkItem>
  >;

  /**
   * CTA button field in *MainMenu → Default → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: CTA Button
   * - **API ID Path**: main_menu.default.primary.cta_button
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  cta_button: prismic.LinkField;
}

/**
 * Default variation for MainMenu Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MainMenuSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<MainMenuSliceDefaultPrimary>,
  never
>;

/**
 * Primary content in *MainMenu → Sub Menu Item → Primary*
 */
export interface MainMenuSliceSubMenuItemPrimary {
  /**
   * Logo field in *MainMenu → Sub Menu Item → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: main_menu.subMenuItem.primary.logo
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never>;

  /**
   * MenuLink field in *MainMenu → Sub Menu Item → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: main_menu.subMenuItem.primary.menulink[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  menulink: prismic.GroupField<
    Simplify<MainMenuSliceSubMenuItemPrimaryMenulinkItem>
  >;

  /**
   * CTA button field in *MainMenu → Sub Menu Item → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: CTA Button
   * - **API ID Path**: main_menu.subMenuItem.primary.cta_button
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  cta_button: prismic.LinkField;
}

/**
 * Sub Menu Item variation for MainMenu Slice
 *
 * - **API ID**: `subMenuItem`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MainMenuSliceSubMenuItem = prismic.SharedSliceVariation<
  "subMenuItem",
  Simplify<MainMenuSliceSubMenuItemPrimary>,
  never
>;

/**
 * Slice variation for *MainMenu*
 */
type MainMenuSliceVariation = MainMenuSliceDefault | MainMenuSliceSubMenuItem;

/**
 * MainMenu Shared Slice
 *
 * - **API ID**: `main_menu`
 * - **Description**: MainMenu
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MainMenuSlice = prismic.SharedSlice<
  "main_menu",
  MainMenuSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      ContinentTextDocument,
      ContinentTextDocumentData,
      ContinentTextDocumentDataSlicesSlice,
      DestinationsDocument,
      DestinationsDocumentData,
      DestinationsDocumentDataSlicesSlice,
      HeaderimageDocument,
      HeaderimageDocumentData,
      HeaderimageDocumentDataSlicesSlice,
      MenuDocument,
      MenuDocumentData,
      MenuDocumentDataSlicesSlice,
      AllDocumentTypes,
      ContinentsTextSlice,
      ContinentsTextSliceDefaultPrimary,
      ContinentsTextSliceVariation,
      ContinentsTextSliceDefault,
      DestinationPageSlice,
      DestinationPageSliceDefaultPrimaryGalleryItem,
      DestinationPageSliceDefaultPrimary,
      DestinationPageSliceVariation,
      DestinationPageSliceDefault,
      HeaderSlice,
      HeaderSliceDefaultPrimary,
      HeaderSliceVariation,
      HeaderSliceDefault,
      MainMenuSlice,
      MainMenuSliceDefaultPrimaryMenulinkItem,
      MainMenuSliceDefaultPrimary,
      MainMenuSliceSubMenuItemPrimaryMenulinkItem,
      MainMenuSliceSubMenuItemPrimary,
      MainMenuSliceVariation,
      MainMenuSliceDefault,
      MainMenuSliceSubMenuItem,
    };
  }
}
