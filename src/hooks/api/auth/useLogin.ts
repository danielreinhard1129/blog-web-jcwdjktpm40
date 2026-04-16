import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../../lib/axios";
import type { LoginSchema } from "../../../schemas/loginSchema";
import { useAuth } from "../../../stores/useAuth";

export default function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginSchema) => {
      const response = await axiosInstance.post("/auth/login", {
        email: payload.email,
        password: payload.password,
      });
      return response.data;
    },
    onSuccess: (response) => {
      login({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        image: response.user.image,
        role: response.user.role,
      });
      toast.success("Login success!");
      navigate("/");
    },
    onError: () => {
      toast.error("Login failed!");
    },
  });
}
