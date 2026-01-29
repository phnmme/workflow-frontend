import { users, leaveRequests } from "@/libs/mock_lib";

export default function AdminDashboard() {
    const pending = leaveRequests.filter(l => l.status === "Pending").length;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-semibold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-3 gap-6">
                <Card title="Total Users" value={users.length} />
                <Card title="Leave Requests" value={leaveRequests.length} />
                <Card title="Pending Requests" value={pending} />
            </div>
        </div>
    );
}

function Card({ title, value }: CardProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
}
