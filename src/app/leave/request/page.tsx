"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

type LeaveType = {
  _id: string;
  leaveName: string;
};

type Leave = {
  leaveTypeID: LeaveType;
};

export default function RequestLeave() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [leaveTypeID, setLeaveTypeID] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);

  const router = useRouter();

  useEffect(() => {
    api.get("/getMyRequest").then(res => {
      const requests: Leave[] = res.data || [];

      const types = requests
        .map(r => r.leaveTypeID)
        .filter(Boolean);

      const unique = Array.from(
        new Map(types.map(t => [t._id, t])).values()
      );

      setLeaveTypes(unique);
    });
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays(diff > 0 ? diff : 0);
  }, [startDate, endDate]);

  const submit = async () => {
    try {
      await api.post("/request", {
        leaveTypeID,
        reason,
        startDate,
        endDate,
        days
      });

      router.push("/leave");
    } catch (err) {
      alert("ส่งคำขอลาไม่สำเร็จ");
    }
  };

  return (
  <div className="min-h-screen  from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6 rounded-2xl">
    <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">

      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-2">
        📝 Request Leave
      </h1>
      <p className="text-white/70 mb-8">
        Fill in the form to submit your leave request
      </p>

      <div className="space-y-5">

        {/* Leave Type */}
        <div>
          <label className="block text-white mb-1 text-sm">
            Leave Type
          </label>
          <select
            className="w-full p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={leaveTypeID}
            onChange={e => setLeaveTypeID(e.target.value)}
          >
            <option value="">-- Select Leave Type --</option>
            {leaveTypes.map(t => (
              <option key={t._id} value={t._id}>
                {t.leaveName}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-1 text-sm">
              Start Date
            </label>
            <input
              type="date"
              className="w-full p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white mb-1 text-sm">
              End Date
            </label>
            <input
              type="date"
              className="w-full p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Days */}
        <div className="bg-blue-100/20 text-white p-3 rounded-lg flex justify-between items-center">
          <span>📅 Total Days</span>
          <span className="text-xl font-bold">{days} days</span>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-white mb-1 text-sm">
            Reason
          </label>
          <textarea
            placeholder="Enter your reason..."
            className="w-full p-3 rounded-lg bg-white/80 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={submit}
          disabled={!leaveTypeID || !startDate || !endDate}
          className="
            w-full py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-blue-500 to-indigo-600
            hover:from-blue-600 hover:to-indigo-700
            transition
            disabled:opacity-40 disabled:cursor-not-allowed
            shadow-lg
          "
        >
          🚀 Submit Request
        </button>

      </div>
    </div>
  </div>
);
}
