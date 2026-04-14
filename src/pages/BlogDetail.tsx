import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import BackNavigation from "../components/BackNavigation";
import BlogDetailContent from "../components/BlogDetailContent";
import BlogDetailError from "../components/BlogDetailError";
import BlogDetailHeader from "../components/BlogDetailHeader";
import BlogDetailLoading from "../components/BlogDetailLoading";
import BlogDetailNotFound from "../components/BlogDetailNotFound";
import BlogDetailThumbnail from "../components/BlogDetailThumbnail";
import Navbar from "../components/Navbar";
import { axiosInstance2 } from "../lib/axios";
import type { Blog } from "../types/blog";

function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: blog,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const response = await axiosInstance2.get<Blog>(`/blogs/${slug}`);
      return response.data;
    },
  });

  if (isPending) {
    return <BlogDetailLoading />;
  }

  if (error) {
    return (
      <BlogDetailError
        error={"Failed to load blog"}
        onRetry={() => refetch()}
      />
    );
  }

  if (!blog) {
    return <BlogDetailNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackNavigation className="mb-8" />

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <BlogDetailThumbnail blog={blog} />

          <div className="p-8 md:p-12">
            <BlogDetailHeader
              title={blog.title}
              author={blog.user.name}
              created={blog.createdAt}
            />

            <BlogDetailContent
              description={blog.description}
              content={blog.content}
            />
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors shadow-md"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>View More Blogs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
