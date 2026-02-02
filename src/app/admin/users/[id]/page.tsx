"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useParams } from "next/navigation";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  CalendarDays,
  BarChart3,
} from "lucide-react";

type Summary = {
  present: number;
  late: number;
  absent: number;
  leave: number;
  total: number;
};

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
};

function StatCard({ title, value, icon, color }: StatCardProps) {
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
      <div
        className={`absolute -top-6 -right-6 w-24 h-24 ${color} opacity-20 rounded-full blur-3xl`}
      />

      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} text-white`}
        >
          {icon}
        </div>

        <div>
          <p className="text-slate-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function UserSummaryPage() {
  const { id } = useParams();
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    const now = new Date();
    api
      .get("/log/summary/user", {
        params: {
          userId: id,
          year: now.getFullYear(),
          month: now.getMonth() + 1,
        },
      })
      .then((res) => {
        setSummary(res.data.summary);
      });
  }, [id]);

  if (!summary)
    return (
      <div className="p-10 text-slate-500">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen p-10 ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          User Summary
        </h1>
        <p className="text-slate-500 mt-1">
          Monthly attendance overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard
          title="Present"
          value={summary.present}
          icon={<CheckCircle size={22} />}
          color="bg-green-500"
        />
        <StatCard
          title="Late"
          value={summary.late}
          icon={<AlertCircle size={22} />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Absent"
          value={summary.absent}
          icon={<XCircle size={22} />}
          color="bg-red-500"
        />
        <StatCard
          title="Leave"
          value={summary.leave}
          icon={<CalendarDays size={22} />}
          color="bg-purple-500"
        />
        <StatCard
          title="Total"
          value={summary.total}
          icon={<BarChart3 size={22} />}
          color="bg-blue-500"
        />
      </div>
    </div>
  );
}
