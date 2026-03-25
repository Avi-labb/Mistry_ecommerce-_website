import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

const ResetPassword = () => {

  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMsg("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {

      const response = await api.post(
        `/api/reset-password/${token}`,
        { password },{withCredentials:false}
      );

      setMsg(response.data.message);

    } catch (error) {

      setMsg(error.response?.data?.message || "Something went wrong");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Reset Password
        </h1>

        {msg && (
          <div className="mb-4 text-sm text-center text-red-500">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Reset Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPassword;