/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { KeyTextField } from "@prismicio/types";

interface IncludedExcludedProps {
  included: { text: KeyTextField }[];
  excluded: { text: KeyTextField }[];
}

const IncludedExcluded = ({ included, excluded }: IncludedExcludedProps) => {
  // Return null if both included and excluded are empty
  if (
    (!included || included.length === 0) &&
    (!excluded || excluded.length === 0)
  ) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 ">
      {/* What's Included Section */}
      {included && included.length > 0 && (
        <div className="bg-[#F6F8F7] p-4 xl:p-6 rounded-lg text-primary">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            What's included
          </h3>
          <ul className="flex flex-wrap gap-2 font-light">
            {included.map((item, index) => (
              <li key={index} className="bg-white py-2 px-4 rounded-full">
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What's NOT Included Section */}
      {excluded && excluded.length > 0 && (
        <div className="bg-[#F6F8F7] p-4 xl:p-6 rounded-lg">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            <span className="">
              What's <span className="text-red-500">NOT</span> included
            </span>
          </h3>
          <ul className="flex flex-wrap gap-2 font-light">
            {excluded.map((item, index) => (
              <li key={index} className="bg-white py-2 px-4 rounded-full">
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IncludedExcluded;
