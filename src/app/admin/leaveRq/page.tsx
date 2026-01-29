import { leaveRequests } from "@/libs/mock_lib";

export default function LeavesPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Leave Requests</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Type</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(l => (
              <tr key={l.id} className="border-t">
                <td className="p-4">{l.userName}</td>
                <td className="p-4">{l.type}</td>
                <td className="p-4">
                  {l.start} → {l.end}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs
                      ${
                        l.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }
                    `}
                  >
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
