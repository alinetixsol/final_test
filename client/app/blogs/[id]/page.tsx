"use client";
import Blog from "@/components/Blog";
import BlogId from "@/components/BlogId";

const page = ({ params }: { params: { id: string } }) => {
  console.log("This is params Id : ", params.id);

  return (
    <div>
      <BlogId id={params.id} />
    </div>
  );
};

export default page;
