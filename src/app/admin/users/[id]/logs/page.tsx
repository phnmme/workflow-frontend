"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useParams } from "next/navigation";

type Log = {
  _id: string;
  date: string;
  CheckIn: string;
  CheckOut: string;
  status: string;
};

export default function LogsPage() {
  const { id } = useParams();
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    api.get(`/log/user/${id}`).then(res => {
      setLogs(res.data.data);
    });
  }, []);

  const deleteLog = (logId: string) => {
    api.delete(`/log/${logId}`).then(() => {
      setLogs(logs.filter(l => l._id !== logId));
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Daily Logs</h1>

      <table className="w-full bg-white shadow">
        <thead>
          <tr>
            <th>Date</th>
            <th>In</th>
            <th>Out</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {logs.map(l => (
            <tr key={l._id} className="border-t text-center">
              <td>{l.date}</td>
              <td>{l.CheckIn}</td>
              <td>{l.CheckOut}</td>
              <td>{l.status}</td>
              <td>
                <button
                  onClick={() => deleteLog(l._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
