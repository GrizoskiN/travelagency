import { FC } from "react";
import OutlineButton from "../Buttons/OutlineButton";

interface LastCardProps {
  lastCardText: string; // Add prop for the last card text
}

const LastCard: FC<LastCardProps> = ({ lastCardText }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-start justify-end p-5 xl:p-11">
      <p className="mb-32 text-xl">
        {lastCardText ||
          "No matter what your dream adventure looks like, we’ll help you create unforgettable memories, one destination at a time"}
      </p>
      <OutlineButton link={"/destination"} text={"View all destinations"} />
    </div>
  );
};

export default LastCard;
