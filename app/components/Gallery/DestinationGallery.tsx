import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface DestinationGalleryProps {
  destination: {
    label: string;
    image: string;
    tags: string[];
   
  };
}

const DestinationGallery: FC<DestinationGalleryProps> = ({ destination }) => {
  
  return (
    <Link href={`/countries/${destination.label}`} className="block ">
      <div className="relative w-full h-full ">
        <Image
          src={destination.image}
          alt={destination.label}
          className="object-cover w-full h-full rounded-lg"
          width={300}
          height={300}
        />
      <div className="absolute top-8 left-8 flex gap-2">  {destination.tags.map((tag, index) => (
            <p
              key={index}
              className="bg-white text-primary text-lg px-6 capitalize py-1 rounded-full "
            >
              {tag}
            </p>
          ))}</div>
        <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm bg-opacity-50 text-white p-2 rounded-lg">
          <h3 className="text-sm font-light">
            Visit the beautiful <span className="text-lg">{destination.label}</span>
          </h3>
         
          <p>View the listings</p>
        </div>
      </div>
    </Link>
  );
};

export default DestinationGallery;
