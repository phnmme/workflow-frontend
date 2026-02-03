"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

type User = {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  idCard: string;
  present: number;
  late: number;
  absent: number;
  leave: number;
  total: number;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = new Date();

    axios
      .get(`${process.env.NEXT_PUBLIC_HOST_URL}/log/summary/all`, {
        params: {
          year: now.getFullYear(),
          month: now.getMonth() + 1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.data || []);
      })
      .catch(() => {
        alert("โหลด users ไม่ได้");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="min-h-screen p-10 rounded-2xl bg-gradient-to-br bg-white/20 backdrop-blur-xl
        border border-white/20
        shadow-xl"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Users</h1>
        <p className="text-slate-500 mt-1">Overview of employee attendance</p>
      </div>

      {/* Table Container */}
      <div
        className="
          bg-white/70 backdrop-blur
          border border-slate-200
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >
        {loading ? (
          <p className="p-6 text-slate-500">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-center">Present</th>
                <th className="p-4 text-center">Late</th>
                <th className="p-4 text-center">Leave</th>
                <th className="p-4 text-center">Total</th>
                {/* <th className="p-4 text-center">Action</th> */}
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u.userId}
                  className="border-t hover:bg-blue-50/50 transition"
                >
                  <td className="p-4 font-medium text-slate-800">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="p-4 text-slate-600">{u.username}</td>
                  <td className="p-4 text-slate-600">{u.email}</td>

                  <td className="p-4 text-center font-medium text-green-600">
                    {u.present}
                  </td>
                  <td className="p-4 text-center font-medium text-yellow-600">
                    {u.late}
                  </td>
                  <td className="p-4 text-center font-medium text-purple-600">
                    {u.leave}
                  </td>
                  <td className="p-4 text-center font-semibold text-slate-800">
                    {u.total}
                  </td>

                  {/* <td className="p-4 text-center">
                    <Link
                      href={`/admin/users/${u.userId}`}
                      className="
                        inline-flex items-center justify-center
                        px-4 py-2 rounded-lg
                        bg-blue-500 text-white
                        hover:bg-blue-600
                        transition
                        shadow
                      "
                    >
                      View
                    </Link>
                  </td> */}
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-slate-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
