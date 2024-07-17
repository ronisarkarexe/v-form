"use client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setIsLogin } from "@/redux/features/listSlice";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success && result.data.accessToken) {
        localStorage.setItem("accessToken2", result.data.accessToken);
        toast.success("Login successful!");
        dispatch(setIsLogin(true));
        router.push("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Login!</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border border-blue-500 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border border-blue-500 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-outline btn-info btn-sm">
            Login
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;
