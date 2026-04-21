import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { authLoader } from "./loaders/auth";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { default: Home } = await import("./pages/Home");
      return { Component: Home };
    },
  },
  {
    path: "/register",
    lazy: async () => {
      const { default: Register } = await import("./pages/Register");
      return { Component: Register };
    },
  },
  {
    path: "/login",
    lazy: async () => {
      const { default: Login } = await import("./pages/Login");
      return { Component: Login };
    },
  },
  {
    path: "/forgot-password",
    lazy: async () => {
      const { default: ForgotPassword } =
        await import("./pages/ForgotPassword");
      return { Component: ForgotPassword };
    },
  },
  {
    path: "/create",
    loader: authLoader,
    lazy: async () => {
      const { default: CreateBlog } = await import("./pages/CreateBlog");
      return { Component: CreateBlog };
    },
  },
  {
    path: "/blogs/:slug",
    lazy: async () => {
      const { default: BlogDetail } = await import("./pages/BlogDetail");
      return { Component: BlogDetail };
    },
  },
  {
    path: "/reset-password/:token",
    lazy: async () => {
      const { default: ResetPassword } = await import("./pages/ResetPassword");
      return { Component: ResetPassword };
    },
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
