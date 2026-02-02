"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "user" | "admin";

/* -------- JWT Decode -------- */

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

function getRoleFromToken(): Role {
  const token = localStorage.getItem("token");
  if (!token) return "user";

  const payload = parseJwt(token);
  if (!payload) return "user";

  return payload.role === "admin" ? "admin" : "user";
}

/* -------- Sidebar -------- */

export default function Sidebar() {
  const pathname = usePathname();

  const [role, setRole] = useState<Role>("user");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRole(getRoleFromToken());
  }, []);

  const userMenu = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chatpage" },
    { name: "Leave", href: "/leave" },
  ];

  const adminMenu = [
    { name: "Dashboard", href: "/admin" },
    { name: "Users", href: "/admin/users" },
    { name: "Logs", href: "/admin/logs" },
    { name: "Leave Requests", href: "/admin/leaveRq" },
  ];

  const menus = role === "admin" ? adminMenu : userMenu;

  return (
    <aside className="w-64 min-h-screen p-6 bg-white/20 backdrop-blur-xl border-r border-white/20 shadow-xl text-white">
      <h2 className="text-3xl font-bold mb-14 tracking-wide">
        Attendance
      </h2>

      <nav className="space-y-4">
        {menus.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3
                rounded-xl px-5 py-3
                transition-all duration-300
                ${
                  active
                    ? "bg-white/30 text-white shadow-md"
                    : "text-white/80 hover:bg-white/20 hover:pl-7"
                }
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/20 text-sm text-white/60">
        {role === "admin" ? "Admin Mode" : "User Mode"}
      </div>
    </aside>
  );
}
