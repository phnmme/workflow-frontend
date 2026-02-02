"use client";
import { useState } from "react";
import api from "@/services/api";
import { useParams, useSearchParams, useRouter } from "next/navigation";

export default function EditLog() {
  const { id } = useParams();
  const search = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState(
    search.get("status") || "present"
  );
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await api.put(`/log/${id}`, { status });
      alert("Saved");
      router.push("/admin/logs");
    } catch {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-10 ">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        Edit Attendance
      </h1>

      <div className="max-w-md bg-white rounded-xl shadow  p-6">
        <label className="block mb-2 text-sm text-slate-600">
          Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
        >
          <option value="present">Present</option>
          <option value="late">Late</option>
          <option value="leave">Leave</option>
          <option value="absent">Absent</option>
        </select>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-slate-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={saving}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
