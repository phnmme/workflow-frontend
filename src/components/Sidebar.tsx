"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButt";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const pathname = usePathname();

  const [role, setRole] = useState("user");

  useEffect(() => {
    const verifyRole = () => {
      const host = process.env.NEXT_PUBLIC_HOST_URL;
      const token = localStorage.getItem("token");
      try {
        axios
          .get(`${host}/verify-token`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            // console.log("User role:", res.data.decoded.role);
            setRole(res.data.decoded.role);
          });
      } catch (err) {
        console.error("Error fetching user role:", err);
      }
    };

    verifyRole();
  }, []);

  const userMenu = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chatpage" },
    { name: "Document", href: "/leave" },
    // { name: "Change-Password", href: "/changepassword" },

    // { name: "Leave", href: "/leave" },
  ];

  const adminMenu = [
    // { name: "Dashboard", href: "/admin" },
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chatpage" },
    { name: "Document", href: "/leave" },
    { name: "Users", href: "/admin/users" },
    // { name: "Logs", href: "/admin/logs" },
    { name: "Leave Requests", href: "/admin/leaveRq" },
  ];

  const menus = role === "admin" ? adminMenu : userMenu;

  return (
    <aside className="w-64 min-h-screen p-6 bg-white/20 backdrop-blur-xl border-r border-white/20 shadow-xl text-white">
      <h2 className="text-3xl font-bold mb-14 tracking-wide">Attendance</h2>

      <nav className="space-y-4">
        {menus.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
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
      <LogoutButton />

      <div className="mt-auto pt-8 border-t border-white/20 text-sm text-white/60">
        {role === "admin" ? "Admin Mode" : "User Mode"}
      </div>
    </aside>
  );
}
