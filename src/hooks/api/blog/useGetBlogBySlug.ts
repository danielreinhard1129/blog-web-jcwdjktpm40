import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import type { Blog } from "../../../types/blog";

export default function useGetBlogBySlug(slug?: string) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const response = await axiosInstance.get<Blog>(`/blogs/${slug}`);
      return response.data;
    },
    enabled: !!slug,
  });
}
