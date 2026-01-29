export const users = [
  { id: "u1", name: "Leslie Alexander", email: "leslie@corp.com", role: "admin" },
  { id: "u2", name: "John Doe", email: "john@corp.com", role: "employee" },
  { id: "u3", name: "Jane Smith", email: "jane@corp.com", role: "employee" },
];

export const leaveRequests = [
  {
    id: "l1",
    userId: "u2",
    userName: "John Doe",
    type: "Sick Leave",
    start: "2025-01-10",
    end: "2025-01-12",
    status: "Pending",
  },
  {
    id: "l2",
    userId: "u3",
    userName: "Jane Smith",
    type: "Vacation",
    start: "2025-01-20",
    end: "2025-01-25",
    status: "Approved",
  },
];
