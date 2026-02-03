"use client";
import { loginAction } from "@/actions/action";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await loginAction(username, password);

    if (result.success && result.token) {
      document.cookie = `token=${result.token}; path=/`;
      localStorage.setItem("token", result.token);

      router.replace("/");
    } else {
      setError(result.message ?? "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-105 text-center">
        {/* Chat Icon */}
        <div className="w-14 h-14 mx-auto mb-5">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              stroke="#000000"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M20 28C20 24.6863 22.6863 22 26 22H38C41.3137 22 44 24.6863 44 28V34C44 37.3137 41.3137 40 38 40H32L24 46V40H26C22.6863 40 20 37.3137 20 34V28Z"
              stroke="#000000"
              strokeWidth="2.5"
              fill="none"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-black mb-1">Welcome !</h1>
        <p className="text-sm text-gray-400 mb-8">
          เข้าสู่ระบบเพื่อดำเนินการต่อ
        </p>

        {/* Form */}
        <form className="space-y-4" autoComplete="off" onSubmit={submitHandler}>
          {/* Username Field */}
          <div className="text-left">
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-black mb-2"
            >
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Chutawat"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:bg-white focus:border-blue-300 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="text-left">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-black mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:bg-white focus:border-blue-300 transition-all placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                {showPassword ? (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Change Password Link */}
          <div className="text-right pt-1 pb-4">
            <a
              href="/changepassword"
              className="text-xs text-[#5B9FED] hover:text-[#4A8FDD] transition-colors"
            >
              Change password ?
            </a>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            onClick={submitHandler}
            className="w-full bg-[#5B9FED] hover:bg-[#4A8FDD] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:translate-y-0.5"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
