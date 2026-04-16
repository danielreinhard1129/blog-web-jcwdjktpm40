import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../../lib/axios";
import type { RegisterSchema } from "../../../schemas/registerSchema";

export default function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: RegisterSchema) => {
      await axiosInstance.post("/auth/register", {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });
    },
    onSuccess: () => {
      toast.success("Register success!");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Register failed!");
    },
  });
}
