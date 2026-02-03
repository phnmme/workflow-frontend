"use client";
import React, { useState, useEffect } from "react";
import api from "@/libs/api";
interface AttendanceRecord {
  date: string;
  day: string;
  clockIn: string;
  clockOut: string;
  hasClockIn: boolean;
  hasClockOut: boolean;
  workHours: string;
  status: string;
}

const ClockInOutPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<
    AttendanceRecord[]
  >([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/attendance/history?days=7");

        console.log("RAW API RESPONSE:", res.data);
        console.log("RAW DATA ARRAY:", res.data.data);

        const data = res.data.data;

        const formatted: AttendanceRecord[] = data.map((item: any) => {
          const [datePart] = item.date.split(" ");
          const [day] = datePart.split("/");

          return {
            date: day,
            day: "ม.ค.",
            clockIn: formatTime(item.checkInTime),
            clockOut: formatTime(item.checkOutTime),
            hasClockIn: Boolean(item.checkInTime),
            hasClockOut: Boolean(item.checkOutTime),
            workHours:
              item.checkInTime && item.checkOutTime
                ? "ทำงานแล้ว"
                : item.status === "present"
                ? "มาแล้ว"
                : "-",
            status: item.status, // 👈 ตรงนี้
          };
        });

        console.log("FORMATTED RESULT:", formatted);

        setAttendanceHistory(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  const formatTime = (date?: string | Date | null) => {
    if (!date) return "-";

    // ถ้าเป็น Date (currentTime)
    if (date instanceof Date) {
      return date.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // ถ้าเป็น string จาก backend "31/01/2026 16:28:33"
    const [, time] = date.split(" ");
    return time?.slice(0, 5) ?? "-";
  };

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!currentTime) return null;

  const handleClockIn = async () => {
    try {
      const res = await api.post("/attendance/check-in");
      alert(res.data.message);
      window.location.reload(); // ง่ายสุด (หรือ refetch)
    } catch (err: any) {
      alert(err.response?.data?.message || "Clock-in ไม่สำเร็จ");
    }
  };

  const handleClockOut = async () => {
    try {
      const res = await api.post("/attendance/check-out");
      alert(res.data.message);
      window.location.reload();
    } catch (err: any) {
      alert(err.response?.data?.message || "Clock-out ไม่สำเร็จ");
    }
  };

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black mb-2">
            Clock in / Clock out
          </h1>
          <p className="text-sm text-gray-600">บันทึกเวลาเข้างานของคุณ</p>
        </div>

        {/* Clock Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Clock In Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <h2 className="text-2xl font-bold text-black">Clock in</h2>
            </div>

            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-[#5B9FED] mb-3">
                {formatTime(currentTime)}
              </div>
              <p className="text-sm text-gray-500">
                {currentTime.toLocaleDateString("th-TH", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="mb-6">
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl h-13">
                {/* Empty placeholder */}
              </div>
            </div>

            <button
              className="w-full bg-[#4ADE80] hover:bg-[#3CCE70] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              onClick={handleClockIn}
            >
              Clock in
            </button>
          </div>

          {/* Clock Out Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <h2 className="text-2xl font-bold text-black">Clock out</h2>
            </div>

            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-[#5B9FED] mb-3">
                {formatTime(currentTime)}
              </div>
              <p className="text-sm text-gray-500">
                {currentTime.toLocaleDateString("th-TH", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="mb-6">
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl h-13">
                {/* Empty placeholder */}
              </div>
            </div>

            <button
              className="w-full bg-[#FBBF24] hover:bg-[#F59E0B] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              onClick={handleClockOut}
            >
              Clock out
            </button>
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-black mb-6">
            Attendance History
          </h3>

          <div className="space-y-3">
            {attendanceHistory.map((record, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:bg-white hover:border-gray-300 transition-all"
              >
                <div className="flex items-center gap-5">
                  {/* Date */}
                  <div className="flex flex-col items-center justify-center bg-white rounded-xl px-5 py-3 min-w-20 border border-gray-200">
                    <div className="text-3xl font-bold text-[#5B9FED] leading-none">
                      {record.date}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {record.day}
                    </div>
                  </div>

                  {/* Clock Times */}
                  {record.hasClockIn ? (
                    <div className="flex items-center gap-8 flex-1">
                      <div className="flex items-center gap-2">
                        ⏰ <span>{record.clockIn}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        ⏱️ <span>{record.clockOut}</span>
                      </div>

                      <div className="ml-auto">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              record.status === "late" &&
                              "bg-red-100 text-red-600"
                            }
                            ${
                              record.status === "present" &&
                              "bg-green-100 text-green-600"
                            }
                            ${
                              record.status === "absent" &&
                              "bg-gray-200 text-gray-600"
                            }
                          `}
                        >
                          {record.status === "late" && "มาสาย"}
                          {record.status === "present" && "ปกติ"}
                          {record.status === "absent" && "ขาด"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 text-sm text-gray-400">
                      ยังไม่ clock in
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockInOutPage;
