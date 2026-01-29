"use client";
import { useState } from "react";

export default function Page() {
  const today = new Date();
  const [current, setCurrent] = useState(new Date());

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [total, setTotal] = useState("");

  const year = current.getFullYear();
  const month = current.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

  return (
    <div className="min-h-screen rounded-2xl w-full bg-linear-to-br from-[#9cc9ff] to-[#4c6b8a] p-10">
      {/* Header */}
      <div className="flex justify-between items-center text-white mb-10">
        <h1 className="text-2xl font-semibold">Document</h1>
        
      </div>

      <div className="flex gap-10">

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-85">
          <h2 className="text-lg font-semibold mb-6">Leave request form</h2>

          <div className="space-y-4 text-sm ">
            <div >
              <label className="block  mb-1 text-gray-500 ">Leave type</label>
              <select className="w-full border rounded-md bg-gray-100 px-3 py-2 p outline-none ">
                <option>Sick Leave</option>
                <option>Leave of absence</option>
              </select>
            </div>

            <div>
              <label className="block mb-1  text-gray-500">Reason</label>
              <textarea className="w-full border rounded-md bg-gray-100 px-3 py-2 h-20 resize-none outline-none" />
            </div>

            {/* Start date */}
            <div>
              <label className="block mb-1 text-gray-500">Start date</label>
              <div className="relative border rounded">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-md bg-gray-100 px-3 py-2 pr-10 outline-none"
                />
              </div>
            </div>

            {/* End date */}
            <div>
              <label className="block mb-1 text-gray-500">End date</label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border rounded-md bg-gray-100 px-3 py-2 pr-10 outline-none"
                />
              </div>
            </div>

            {/* Total (manual) */}
            <div>
              <label className="block mb-1 text-gray-500">Total</label>
              <input
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="Enter days"
                className="w-full border rounded-md bg-gray-100 px-3 py-2 outline-none"
              />
            </div>

            <button className="w-full bg-gray-300 hover:bg-gray-400 transition rounded-lg py-2 mt-4 text-gray-700">
              Submit
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 w-[320px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold">
              {current.toLocaleString("default", { month: "long" })} {year}
            </h2>
            <div className="flex gap-4 text-gray-400 text-xl">
              <button onClick={prevMonth}>‹</button>
              <button onClick={nextMonth}>›</button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center text-sm gap-y-3">
            {["Mo","Tu","We","Th","Fr","Sa","Su"].map(d => (
              <div key={d} className="text-gray-400">{d}</div>
            ))}

            {Array.from({ length: (firstDay + 6) % 7 }).map((_, i) => (
              <div key={"e" + i} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const date = new Date(year, month, i + 1);
              const isToday = date.toDateString() === today.toDateString();

              return (
                <div
                  key={i}
                  className={`
                    w-9 h-9 flex items-center justify-center rounded-full
                    ${isToday ? "bg-red-400 text-white" : "text-gray-700"}
                  `}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
