import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../../lib/axios";
import type { ResetPasswordSchema } from "../../../schemas/resetPasswordSchema";

export default function useResetPassword(token: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: ResetPasswordSchema) => {
      await axiosInstance.post(
        "/auth/reset-password",
        {
          password: payload.password,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    },
    onSuccess: () => {
      toast.success("Reset password success!");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Reset password failed!");
    },
  });
}
