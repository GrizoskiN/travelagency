import { FC, useState } from "react";
import Link from "next/link";

interface OutlineButtonProps {
  text: string; // The text to display on the button
  link: string; // The link the button will navigate to
}

const OutlineButton: FC<OutlineButtonProps> = ({ text, link }) => {
  const [hovered, setHovered] = useState(true);
  return (
    <Link href={link}>
      <div
        onMouseEnter={() => setHovered(false)} // Reset post-hover state on mouse enter
        onMouseLeave={() => setHovered(true)} // Trigger post-hover state on mouse leave
        className=" relative inline-flex items-center justify-center px-11 py-2 overflow-hidden font-medium text-primary-foreground transition duration-300 ease-out rounded-full bg-none border-[1px] hover:border-transparent border-primary-foreground group hover:text-white">
        <span className={`${hovered ? " translate-x-[-100%]" : "absolute w-[140%] h-full bg-gradient-to-br from-primary to-primary-foreground transform   group-hover:translate-x-0 group-hover:border-none"} transition duration-300 ease-in rounded-full  `}></span>
        <span
          className={` ${hovered ? "absolute w-[100%] h-full bg-gradient-to-br from-primary to-primary-foreground transform translate-x-[100%]  group-hover:translate-x-0 transition duration-500 ease-out rounded-full " : ""}   `}></span>
        <span className="relative">{text}</span>
        <span className="ml-2 relative transition-transform duration-300 transform group-hover:translate-x-2">
          →
        </span>
      </div>
    </Link>
  );
};

export default OutlineButton;
