"use client";
import api from "@/services/api";
import { useEffect, useState } from "react";
import {
  Users,
  CalendarDays,
  Clock
} from "lucide-react";

type UserSummary = {
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

type ApiResponse = {
  success: boolean;
  month: string;
  year: string;
  data: UserSummary[];
};

type Summary = {
  totalUsers: number;
  totalLeaves: number;
  pendingLeaves: number;
};

type CardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
};

function Card({ title, value, icon, color }: CardProps) {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl p-6
        bg-white/20 backdrop-blur-xl
        border border-white/20
        shadow-xl
        hover:scale-[1.02]
        transition-all
      "
    >
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-20 rounded-full blur-3xl`} />

      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} text-white`}
        >
          {icon}
        </div>

        <div>
          <p className="text-white/70 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState<Summary>({
    totalUsers: 0,
    totalLeaves: 0,
    pendingLeaves: 0,
  });

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    api
      .get<ApiResponse>("/log/summary/all", {
        params: { year, month },
      })
      .then((res) => {
        const users = res.data.data || [];

        const totalUsers = users.length;
        const totalLeaves = users.reduce((sum, u) => sum + u.leave, 0);

        setSummary({
          totalUsers,
          totalLeaves,
          pendingLeaves: 0,
        });
      })
      .catch(() => {
        alert("Don't have permission");
      });
  }, []);

  return (
    <div className="p-10  space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/60 mt-1">
          Overview of employees & attendance
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Total Employees"
          value={summary.totalUsers}
          icon={<Users size={22} />}
          color="bg-blue-500"
        />
        <Card
          title="Leave Requests"
          value={summary.totalLeaves}
          icon={<CalendarDays size={22} />}
          color="bg-purple-500"
        />
        <Card
          title="Pending Requests"
          value={summary.pendingLeaves}
          icon={<Clock size={22} />}
          color="bg-yellow-500"
        />
      </div>
    </div>
  );
}
