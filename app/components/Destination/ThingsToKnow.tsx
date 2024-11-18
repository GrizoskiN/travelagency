import { ImageField } from "@prismicio/types"; // Import the correct type from Prismic
import Image from "next/image";

interface ThingsToKnowItem {
  field_number: number | null;
  icon: ImageField;
  heading: string | null;
  paragraph: string | null;
}

interface ThingsToKnowProps {
  thingsToKnow: ThingsToKnowItem[];
}

const ThingsToKnow = ({ thingsToKnow }: ThingsToKnowProps) => {
  // Check if thingsToKnow is empty or not defined, and return null to hide the component
  if (!thingsToKnow || thingsToKnow.length === 0) {
    return null;
  }

  return (
    <div className="bg-backgroundColor rounded-xl  p-3 xl:p-6">
      <h1 className="text-xl md:text-3xl font-semibold mb-11">Things to Know</h1>
      <div className="grid xxs:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {thingsToKnow.map((item, index) => (
          <div key={index} className="flex flex-col items-center p-2 lg:p-4 bg-white">
            <div className="flex w-full justify-between items-center">
              <h3 className="text-lg font-semibold">
                {item.field_number !== null ? item.field_number : "N/A"}
              </h3>
              {item.icon.url ? (
                <Image
                  src={item.icon.url} // Use the URL if available
                  width={30}
                  height={30}
                  alt={item.icon.alt || ""}
                  className="ml-4"
                />
              ) : (
                <span className="ml-4">No image available</span> // Fallback if URL is null
              )}
            </div>
            <div className="mt-6">
              <h3 className="text-lg md:text-xl text-primary">{item.heading}</h3>
              <p className="font-light text-xs md:text-sm">{item.paragraph}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThingsToKnow;
