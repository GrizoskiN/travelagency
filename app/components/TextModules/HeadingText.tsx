import { allura } from '@/app/fonts'

// Define the props type
interface HeadingTextProps {
  heading2: string;
  heading3: string;
}

// Convert the component to a functional TypeScript component
const HeadingText: React.FC<HeadingTextProps> = ({ heading2, heading3 }) => {
  return (
    <>
      <h3 className={`${allura.className} text-3xl`}>{heading3}</h3>
      <h2 className="text-4xl lg:text-5xl">{heading2}</h2>
    </>
  );
}

export default HeadingText;
