import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../../lib/axios";
import type { CreateBlogSchema } from "../../../schemas/createBlogSchema";

export default function useCreateBlog() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: CreateBlogSchema) => {
      const form = new FormData();
      form.append("title", payload.title);
      form.append("description", payload.description);
      form.append("content", payload.content);
      form.append("category", payload.category);
      form.append("thumbnail", payload.thumbnail);

      await axiosInstance.post("/blogs", form);
    },
    onSuccess: () => {
      toast.success("Create Blog success");
      navigate("/");
    },
    onError: () => {
      toast.error("Create Blog failed");
    },
  });
}
