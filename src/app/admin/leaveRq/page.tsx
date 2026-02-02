"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

/* ================= TYPES ================= */

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type LeaveType = {
  _id: string;
  leaveName: string;
  limitDays: number;
};

type RawLeaveRequest = {
  _id: string;
  userId: string;        // ObjectId
  leaveTypeID: string;  // ObjectId
  start_date: string;
  end_date: string;
  days: number;
  reason: string;
  status: "PENDING" | "APPROVED" | "CANCELLED";
};

type LeaveRequest = {
  _id: string;
  user: User | null;
  leaveType: LeaveType | null;
  start_date: string;
  end_date: string;
  days: number;
  reason: string;
  status: "PENDING" | "APPROVED" | "CANCELLED";
};

/* ================= COMPONENT ================= */

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      // 1) ดึงข้อมูลดิบ
      const leaveRes = await api.get("/getAllRequest");
      const rawLeaves: RawLeaveRequest[] = leaveRes.data.data;

      // 2) ดึง users ทั้งหมด
      const userRes = await api.get("/admin/users"); // ต้องมี endpoint นี้
      const users: User[] = userRes.data.data;

      // 3) ดึง leave types
      const typeRes = await api.get("/getLeaveTypes"); // ต้องมี endpoint นี้
      const leaveTypes: LeaveType[] = typeRes.data.data;

      // 4) Map ObjectId → object
      const mapped: LeaveRequest[] = rawLeaves.map((l) => ({
        _id: l._id,
        start_date: l.start_date,
        end_date: l.end_date,
        days: l.days,
        reason: l.reason,
        status: l.status,
        user: users.find((u) => u._id === l.userId) || null,
        leaveType: leaveTypes.find((t) => t._id === l.leaveTypeID) || null,
      }));

      setLeaves(mapped);
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
    id: string,
    status: "APPROVED" | "CANCELLED"
  ) => {
    await api.patch(`/${id}/changeStatus`, { status });
    load();
  };

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="p-10 min-h-screen bg-white/20 backdrop-blur">
      <h1 className="text-3xl font-bold text-white mb-6">
        Leave Requests
      </h1>

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
                <td className="p-4">
                  {l.user
                    ? `${l.user.firstName} ${l.user.lastName}`
                    : "Unknown"}
                </td>

                <td className="p-4">
                  {l.leaveType?.leaveName || "Unknown"}
                </td>

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
