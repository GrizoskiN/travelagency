import { allura } from '@/app/fonts'

// Define the props type
interface HeadingTextProps {
  heading2: string;
  heading3: string;
  customWidth: boolean;
}

// Convert the component to a functional TypeScript component
const HeadingText: React.FC<HeadingTextProps> = ({ heading2, heading3, customWidth }) => {
  return (
    <div className={`${customWidth === false ? " " : "mt-16 mb-32 text-center "} `}>
      <h3 className={`${allura.className} text-3xl`}>{heading3}</h3>
      <h2 className={`${customWidth === false ? " " : "lg:w-[35%]"} text-4xl lg:text-6xl mx-auto uppercase`}>{heading2}</h2>
    </div>
  );
}

export default HeadingText;
