"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      const forms = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch(
        "http://localhost:3009/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(forms),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup Failed:", errorData);
        toast.error("Invalid username or password");
        return;
      }

      const responseData = await response.json();
      toast.success("User Created successful");
      setTimeout(() => {
        router.push("signin");
      }, 1000);
      console.log("Signup Successful:", responseData);
    } catch (error: any) {
      console.error("Failed to authenticate user:", error);
      console.error("Signup Failed:", error.message);
      if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };
  return (
    <>
      {/* <Header /> */}
      <div className="min-h-[38.5rem]  dark:bg-gray-800 bg-white">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 text-gray-900 dark:text-white">
              Sign up to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST" onSubmit={handleSignup}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md  p-2 text-black shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm border border-black"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md p-2 text-black shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm border border-black"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md  p-2 text-black shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm border border-black"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-gray-500">
                Already a member?{" "}
                <a
                  onClick={() => router.push("/signin")}
                  className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  Sign In
                </a>
              </p>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:outline-none focus:ring-offset-gray-100"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignUp;
