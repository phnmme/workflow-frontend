"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import Link from "next/link";

type Log = {
    _id: string;
    userId: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    date: string;
    status: string;
};

export default function LogsPage() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);

    const loadLogs = () => {
        setLoading(true);
        api
            .get("/log")
            .then((res) => {
                setLogs(res.data.data || []);
            })
            .catch(() => {
                alert("โหลด logs ไม่ได้");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadLogs();
    }, []);

    const deleteLog = async (id: string) => {
        if (!confirm("Delete this log?")) return;

        try {
            await api.delete(`/log/${id}`);
            loadLogs();
        } catch {
            alert("ลบไม่สำเร็จ");
        }
    };

    return (
        <div className="
        min-h-screen p-10 relative overflow-hidden
        rounded-2xl
        bg-white/20 backdrop-blur-xl
        border border-white/20
        shadow-xl
        ">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    Attendance Logs
                </h1>
                <p className="text-slate-500 mt-1">
                    All employee check-in / check-out records
                </p>
            </div>

            <div className="bg-white/70 backdrop-blur rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <p className="p-6 text-slate-500">Loading...</p>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100 text-slate-600">
                            <tr>
                                <th className="p-4 text-left">User</th>
                                <th className="p-4 text-left">Username</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {logs.map((l) => (
                                <tr
                                    key={l._id}
                                    className="border-t hover:bg-blue-50/60 transition"
                                >
                                    <td className="p-4 font-medium text-slate-800">
                                        {l.userId?.firstName} {l.userId?.lastName}
                                    </td>

                                    <td className="p-4 text-slate-600">
                                        {l.userId?.username}
                                    </td>

                                    <td className="p-4 text-slate-600">
                                        {new Date(l.date).toLocaleDateString()}
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${l.status === "present"
                                                    ? "bg-green-100 text-green-700"
                                                    : l.status === "late"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : l.status === "leave"
                                                            ? "bg-purple-100 text-purple-700"
                                                            : "bg-red-100 text-red-700"
                                                }
                      `}
                                        >
                                            {l.status}
                                        </span>
                                    </td>

                                    <td className="p-4 text-center space-x-3">
                                        <Link
                                            href={`/admin/logs/${l._id}`}
                                            className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteLog(l._id)}
                                            className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {logs.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-10 text-center text-slate-400"
                                    >
                                        No logs found
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
