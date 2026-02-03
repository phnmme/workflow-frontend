"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RequestLeave() {
  const [leaveTypes, setLeaveTypes] = useState("ลางาน");
  const [leaveTypeID, setLeaveTypeID] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays(diff > 0 ? diff : 0);
  }, [startDate, endDate]);

  const submit = async () => {
    const host = process.env.NEXT_PUBLIC_HOST_URL;
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${host}/request`,
        {
          leaveTypeID,
          reason,
          startDate,
          endDate,
          days,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      router.push("/leave");
    } catch (err) {
      alert("ส่งคำขอลาไม่สำเร็จ");
    }
  };

  return (
    <div className="min-h-screen  from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6 rounded-2xl">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-2">📝 Request Leave</h1>
        <p className="text-white/70 mb-8">
          Fill in the form to submit your leave request
        </p>

        <div className="space-y-5">
          {/* Leave Type */}
          <div>
            <label className="block text-white mb-1 text-sm">Leave Type</label>
            <select
              className="w-full p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={leaveTypeID}
              onChange={(e) => setLeaveTypeID(e.target.value)}
            >
              <option value="">-- Select Leave Type --</option>
              <option value="ลางาน">ลางาน</option>
              <option value="ลาป่วย">ลาป่วย</option>
              <option value="ลากิจ">ลากิจ</option>
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
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-white mb-1 text-sm">End Date</label>
              <input
                type="date"
                className="w-full p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
            <label className="block text-white mb-1 text-sm">Reason</label>
            <textarea
              placeholder="Enter your reason..."
              className="w-full p-3 rounded-lg bg-white/80 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
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
