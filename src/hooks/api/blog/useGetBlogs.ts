import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import type { Blog } from "../../../types/blog";
import type { PageableResponse } from "../../../types/pagination";

export default function useGetBlogs({ page }: { page: number }) {
  return useQuery({
    queryKey: ["blogs", page],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Blog>>(
        "/blogs",
        {
          params: { page, take: 6 },
        },
      );

      return data;
    },
  });
}
