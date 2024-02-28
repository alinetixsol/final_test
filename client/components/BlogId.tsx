import React, { useEffect, useState } from "react";

interface BlogIdProps {
  id: string; // Adjust the type of 'id' based on your actual data type
}

interface NewsData {
  main_img_url: string;
  title: string;
  text: string;
  participants: string;
  author: string;
  domain_rank: string;
}

const BlogId: React.FC<BlogIdProps> = ({ id }) => {
  const [news, setNews] = useState<NewsData>({
    main_img_url: "",
    title: "",
    text: "",
    participants: "",
    author: "",
    domain_rank: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3009/news/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      const data: NewsData = await response.json();

      setNews(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // Include 'id' as a dependency to avoid unnecessary fetches

  console.log("This is blog : ", news);
  console.log("This is blogid : ", id);

  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl my-4 rounded-md">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48 rounded-md"
            src={news.main_img_url}
            alt="News Image"
          />
        </div>
        <div className="p-6 md:p-8">
          <div className="text-indigo-500 font-bold text-lg mb-2">
            Title: {news.title}
          </div>
          <div className="text-green-500 font-bold text-sm mb-2">
            Text: {news.text}
          </div>
          <div className="text-xs text-gray-500 mb-2">
            {/* {publishedDate} */}
          </div>
          <div className="font-semibold text-gray-900">
            Participants: {news.participants}
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">Author: {news.author}</span>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">
              Domain Rank: {news.domain_rank}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogId;
