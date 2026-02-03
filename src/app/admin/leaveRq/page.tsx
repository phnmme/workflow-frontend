"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("leaves:", leaves);
  }, [leaves]);

  const load = async () => {
    try {
      const leaveRes = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/getAllRequest`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("leaveRes.data:", leaveRes.data);
      setLeaves(leaveRes.data);
    } catch (err) {
      console.error("Load leave error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (
    requestID: string,
    status: "APPROVED" | "CANCELLED"
  ) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/${requestID}/changeStatus`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    load();
  };

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="p-10 min-h-screen bg-white/20 backdrop-blur">
      <h1 className="text-3xl font-bold text-white mb-6">Leave Requests</h1>

      <div className="bg-white/80 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-4">Employee</th>
              <th className="p-4">Type</th>
              <th className="p-4">Date</th>
              <th className="p-4">Days</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => (
              <tr key={l._id} className="border-t">
                <td className="p-4">{l.userId ? l.userId : "Deleted User"}</td>

                <td className="p-4">{l?.leaveType || "Unknown"}</td>

                <td className="p-4">
                  {new Date(l.start_date).toLocaleDateString()} →{" "}
                  {new Date(l.end_date).toLocaleDateString()}
                </td>

                <td className="p-4">{l.days}</td>
                <td className="p-4">{l.reason}</td>

                <td className="p-4">{l.status}</td>

                <td className="p-4">
                  {l.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => changeStatus(l._id, "APPROVED")}
                        className="mr-2 px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => changeStatus(l._id, "CANCELLED")}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {leaves.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  ไม่มีคำขอลา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
