import { useDestinations } from "@/app/contexts/DestinationsContext";
import Image from "next/image";
import Link from "next/link";
import OutlineButton from "../Buttons/OutlineButton";
import { Calendar, Time, Author } from "./BlogIcons";

interface BlogPostsProps {
  pointer: boolean; // Specify the type of pointer prop (adjust based on your actual data)
}
const BlogPosts: React.FC<BlogPostsProps> = ({ pointer }) => {
  const { blogPosts } = useDestinations();
  return (
    <>
      {blogPosts.map((blog, index) => (
        <div
          key={index}
          className="min-w-[37rem] flex flex-col justify-between overflow-hidden">
          <div>
            <div
              className={`${pointer ? "pointer-events-none" : "pointer-events-auto"} overflow-hidden  rounded-2xl  block`}>
              <Link href={`blog/${blog.uid}`}>
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={100}
                  className="rounded-xl w-full overflow-hidden hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
            <div className="flex items-center justify-between px-2 my-3">
              <div className="flex gap-2 items-center">
                <Calendar />
                <p className="">{blog.date}</p>
              </div>
              <span>|</span>
              <div className="flex gap-2 items-center">
                <Author />
                <p className="">{blog.author}</p>
              </div>
              <span>|</span>
              <div className="flex gap-2 items-center">
                <Time />
                <p className="">{blog.minutes}</p>
              </div>
            </div>

            <div className="space-y-4 pb-5 items-start px-2">
              <h1 className="text-2xl">{blog.title}</h1>
              <p className="text-md leading-5 tracking-normal text-justify lg:h-11 line-clamp-2 overflow-y-clip">
                {blog.excerpt}
              </p>
            </div>
          </div>

          <div className="pl-2">
            <OutlineButton link={`blog/${blog.uid}`} text={"Read More"} />
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogPosts;
