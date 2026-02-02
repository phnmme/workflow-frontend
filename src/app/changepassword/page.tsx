"use client";
import React, { useState } from "react";

interface PasswordRequirement {
  id: string;
  text: string;
  validator: (password: string) => boolean;
}

const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requirements: PasswordRequirement[] = [
    {
      id: "length",
      text: "มีความยาวอย่างน้อย 8 ตัวอักษร",
      validator: (password: string) => password.length >= 8,
    },
    {
      id: "case",
      text: "ประกอบด้วยตัวพิมพ์ใหญ่และตัวพิมพ์เล็ก",
      validator: (password: string) =>
        /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    {
      id: "number",
      text: "มีตัวเลขอย่างน้อย 1 ตัว",
      validator: (password: string) => /\d/.test(password),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Password change submitted");
  };

  const EyeIcon: React.FC<{ show: boolean }> = ({ show }) => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {show ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#87CEEB] via-[#6BA8D8] to-[#5E8DB8] flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        {/* Title */}
        <h1 className="text-2xl font-bold text-black text-center mb-8">
          Change Password
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-semibold text-black mb-2"
            >
              Current password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:bg-white focus:border-blue-300 transition-all placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <EyeIcon show={showCurrentPassword} />
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-black mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:bg-white focus:border-blue-300 transition-all placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <EyeIcon show={showNewPassword} />
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-black mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:bg-white focus:border-blue-300 transition-all placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <EyeIcon show={showConfirmPassword} />
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-[#C8DCF0] border border-[#9EBFE0] rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-[#1E3A5F] mb-3">
              รหัสผ่านต้องประกอบด้วย:
            </p>
            {requirements.map((req) => {
              const isValid = req.validator(newPassword);
              return (
                <div key={req.id} className="flex items-start gap-2.5">
                  <div
                    className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${
                      isValid && newPassword
                        ? "bg-blue-500"
                        : "bg-white border-2 border-gray-300"
                    }`}
                  >
                    {isValid && newPassword && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-[#1E3A5F] leading-relaxed">
                    {req.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2 items-center">
            <a
              href="/login"
              className="bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-6 rounded-xl transition-all"
            >
              Cancel
            </a>

            <button
              type="submit"
              className="flex-1 bg-[#5B9FED] hover:bg-[#4A8FDD] text-white font-semibold py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:translate-y-0.5"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
