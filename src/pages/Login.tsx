import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { BookOpen, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import useLogin from "../hooks/api/auth/useLogin";
import { axiosInstance } from "../lib/axios";
import { loginSchema, type LoginSchema } from "../schemas/loginSchema";
import { useAuth } from "../stores/useAuth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: loginMutation, isPending } = useLogin();

  const onSubmit = async (data: LoginSchema) => {
    await loginMutation(data);
  };

  const handleLoginByGoogle = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const response = await axiosInstance.post("/auth/google", {
          accessToken: access_token,
        });

        login({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          image: response.data.user.image,
          role: response.data.user.role,
        });

        navigate("/");
      } catch (e) {
        console.log(e);
        toast.error("Login failed!");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <BookOpen className="h-12 w-12 text-yellow-500" />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Login to your account to continue
        </p>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <Link to="/forgot-password">Forgot Password</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors shadow-md"
          >
            {isPending ? "Loading" : "Login"}
          </button>

          <button
            type="button"
            onClick={() => handleLoginByGoogle()}
            className="flex items-center justify-center gap-3 w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            {/* Google Icon */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 
          12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.7 6.1 29.1 4 24 4 12.9 4 4 12.9 4 
          24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 12 24 12c3 0 5.7 1.1 
          7.8 2.9l5.7-5.7C33.7 6.1 29.1 4 24 4c-7.7 0-14.3 4.3-17.7 
          10.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.1 0 9.8-2 13.4-5.3l-6.2-5.1C29.1 35.9 
          26.7 36 24 36c-5.2 0-9.7-3.3-11.3-8l-6.5 
          5C9.5 39.6 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.4-6.1 
          6.9l6.2 5.1C36.9 37.5 40 31.2 40 24c0-1.3-.1-2.7-.4-3.5z"
              />
            </svg>

            {/* Text */}
            <span className="text-sm font-medium text-gray-700">
              Continue with Google
            </span>
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-500 hover:text-purple-600 font-semibold transition-colors"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
