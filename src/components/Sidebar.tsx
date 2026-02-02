"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButt";

export default function Sidebar() {
  const pathname = usePathname();

  const user = {
    name: "Leslie Alex",
    role:  "user",
  }

  const menu = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chatpage" },
    { name: "Document", href: "/leave" },
    { name: "Change-Password", href: "/changepassword" },

  ];
  const adminMenu = [
  { name: "Dashboard", href: "/admin" },
  { name: "Users", href: "/admin/users" },
  { name: "Leave Requests", href: "/admin/leaveRq" },
];

  const menus = user.role === 'admin' ? adminMenu : menu;

  return (
    <aside className="w-64 min-h-screen p-6
      bg-white/20 backdrop-blur-xl
      border-r border-white/20
      shadow-xl
      text-white">

      <h2 className="text-3xl font-bold mb-14 tracking-wide">
        Logo
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
                ${active 
                  ? "bg-white/30 text-white shadow-md"
                  : "text-white/80 hover:bg-white/20 hover:pl-7"}
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
        <LogoutButton/>
    </aside>
    
  );
}
