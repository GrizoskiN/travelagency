"use client";

import HeadingText from "../components/TextModules/HeadingText";
import BlogPosts from "../components/Blog/BlogPosts";

const Page = () => {
  return (
    <div className="customWidth">
      <HeadingText
        heading2={"Blog Section"}
        heading3={"Learn more"}
        customWidth={true}
      />

      <div className=" grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <BlogPosts pointer={false} />
      </div>
    </div>
  );
};

export default Page;
