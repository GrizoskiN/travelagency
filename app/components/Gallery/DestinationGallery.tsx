import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface DestinationGalleryProps {
  destination: {
    label: string;
    destination_image?: string | null;
    tags?: string[] | null;
  };
  destinationCount: number;
  tagsDictionary: Record<string, { name: string; image: string }>;
}

const DestinationGallery: FC<DestinationGalleryProps> = ({
  destination,
  destinationCount,
  tagsDictionary,
}) => {
  return (
    <Link href={`/countries/${destination.label}`} className="block">
      <div className="relative w-full h-full min-h-80 min-w-80 lg:min-w-[18rem] lg:min-h-[18rem] xl:min-h-[33.5rem] xxl:min-h-[45rem] overflow-hidden">
      {destination.destination_image ? (
          <Image
            src={destination.destination_image}
            alt={destination.label}
            className="object-cover w-full h-full min-h-80 min-w-80 md:min-w-[21rem] md:min-h-[21rem] lg:min-w-[18rem] lg:h-full xl:min-h-[34.5rem] xxl:min-h-[45rem] rounded-2xl"
            width={500}
            height={500}
          />
        ) : (
          <div className=" w-full h-full min-h-80 min-w-80 md:min-w-[21rem] md:min-h-[21rem] lg:min-w-[18rem] lg:h-full xl:min-h-[33.5rem] xxl:min-h-[45rem] bg-backgroundColor rounded-2xl flex items-center justify-center">
          
          </div>
        )}

        <div className="absolute top-8 left-8 flex gap-2">
          {destination.tags && destination.tags.map((tagId, index) => {
            const tag = tagsDictionary[tagId];
            return tag ? (
              <p
                key={index}
                className="bg-white text-primary text-lg px-6 capitalize py-1 rounded-full">
                {tag.name}
              </p>
            ) : null;
          })}
        </div>
        <div className="absolute flex justify-between bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm bg-opacity-50 text-white p-2 rounded-lg">
          <h3 className="text-xs text-pre font-light flex flex-col justify-between">
            Visit the beautiful
            <span className="text-xl xl:text-4xl">{destination.label}</span>
          </h3>
          <div className="text-center">
            <p>{`${destinationCount} ${
              destinationCount === 1 ? "Tour" : "Tours"
            }`}</p>
            <p className="border-[1px] border-white rounded-xl text-xs w-fit px-3 py-1">
              View the listings
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationGallery;
