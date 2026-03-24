"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Scholarships", href: "/admin/scholarships", icon: GraduationCap },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-72 bg-blue-950 text-white flex flex-col justify-between shadow-xl">
        <div>
          <div className="px-6 py-8 border-b border-blue-900">
            <h1 className="text-2xl font-bold">ScholarshipGround</h1>
            <p className="text-sm text-blue-200 mt-1">Admin Dashboard</p>
          </div>

          <nav className="mt-6 px-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                    ${
                      active
                        ? "bg-gradient-to-r from-blue-900 to-teal-500"
                        : "text-blue-100 hover:bg-blue-900"
                    }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-blue-900">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}