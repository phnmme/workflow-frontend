"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

type LeaveType = {
  _id: string;
  leaveName: string;
  limitDays: number;
  detail: string;
  isActive: boolean;
};

type Leave = {
  _id: string;
  leaveTypeID: LeaveType;
  start_date: string;
  end_date: string;
  status: string;
};

export default function MyLeaves() {
  const [leaves, setLeaves] = useState<Leave[]>([]);

  useEffect(() => {
    const getMyRequest = async () => {
      try {
        const host = process.env.NEXT_PUBLIC_HOST_URL;
        const token = localStorage.getItem("token");

        const res = await axios.get(`${host}/getMyRequest`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeaves(res.data);
      } catch (err) {
        console.error("Error fetching leave requests:", err);
      }
    };

    getMyRequest();
  }, []);

  const cancel = async (id: string) => {
    if (!confirm("Cancel this request?")) return;

    try {
      const host = process.env.NEXT_PUBLIC_HOST_URL;
      const token = localStorage.getItem("token");
      await axios.post(`${host}/${id}/cancelRequest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Error cancelling leave request:", err);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-sky-200">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">My Leave Requests</h1>
        <Link
          href="/leave/request"
          className="px-4 py-2 rounded-xl bg-blue-500 text-white"
        >
          + Request Leave
        </Link>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Type</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => (
              <tr key={l._id} className="border-t">
                <td className="p-4">{l.leaveTypeID?.leaveName}</td>

                <td className="p-4">
                  {new Date(l.start_date).toLocaleDateString()} →{" "}
                  {new Date(l.end_date).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      l.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : l.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {l.status}
                  </span>
                </td>

                <td className="p-4">
                  {l.status === "PENDING" && (
                    <button
                      onClick={() => {
                        console.log("Cancel", l._id);
                        cancel(l._id);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {leaves.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No leave requests yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
