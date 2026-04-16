import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../../lib/axios";
import type { ForgotPasswordSchema } from "../../../schemas/forgotPasswordSchema";

export default function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: ForgotPasswordSchema) => {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email: payload.email,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Send email success, please check your inbox");
      navigate("/");
    },
    onError: () => {
      toast.error("Send email failed!");
    },
  });
}
