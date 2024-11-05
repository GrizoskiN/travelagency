import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface DestinationGalleryProps {
  destination: {
    label: string;
    image: string;
    tags: string[];
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
      <div className="relative w-full h-full">
        <Image
          src={destination.image}
          alt={destination.label}
          className="object-cover w-full h-full rounded-2xl"
          width={300}
          height={300}
        />
        <div className="absolute top-8 left-8 flex gap-2">
          {destination.tags.map((tagId, index) => {
            const tag = tagsDictionary[tagId];
            return tag ? (
              <p
                key={index}
                className="bg-white text-primary text-lg px-6 capitalize py-1 rounded-full"
              >
                {tag.name}
              </p>
            ) : null;
          })}
        </div>
        <div className="absolute flex justify-between bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm bg-opacity-50 text-white p-2 rounded-lg">
          <h3 className="text-sm font-light flex flex-col">
            Visit the beautiful
            <span className="text-4xl">{destination.label}</span>
          </h3>
          <div className="text-center">
            <p>{`${destinationCount} ${destinationCount === 1 ? 'Tour' : 'Tours'}`}</p>
            <p className="border-[1px] border-white rounded-xl w-fit px-3 py-1">
              View the listings
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationGallery;
