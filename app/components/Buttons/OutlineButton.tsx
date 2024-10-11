import { FC } from "react";
import Link from "next/link";

interface OutlineButtonProps {
  text: string; // The text to display on the button
  link: string; // The link the button will navigate to
}

const OutlineButton: FC<OutlineButtonProps> = ({ text, link }) => {
  return (
    <Link href={link}>
      <div className="relative inline-flex items-center justify-center px-11 py-2 overflow-hidden font-medium text-primary-foreground transition duration-300 ease-out rounded-full bg-none border-[1px] border-primary-foreground group hover:text-white">
        <span className="absolute w-[140%] h-full bg-gradient-to-br from-primary to-primary transform translate-x-[-100%]  group-hover:translate-x-0 transition duration-300 ease-out rounded-full  " ></span>
        <span className="absolute w-[140%] h-full bg-gradient-to-br from-primary-foreground to-primary translate-x-[-100%]  group-hover:translate-x-0 transition duration-500 ease-out rounded-full  " ></span>
        <span className="relative">{text}</span>
        <span className="ml-2 relative transition-transform duration-300 transform group-hover:translate-x-2">
          →
        </span>
      </div>
    </Link>
  );
};

export default OutlineButton;
