"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/aboutUs" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Countries", href: "/countries" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg border-b border-gray-300 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-24 px-6 md:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-56 h-44 mt-26">
            <Image
              src="/sglogo2.png"
              alt="Scholarship Ground Logo"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex mx-54 gap-8 text-gray-700 font-medium items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-green-700 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}

          {/* Check Status Button */}
          <Link
            href="/status"
            className="ml-4 w-40 p-4 text-center bg-amber-400 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-600 hover:scale-105 transition transform"
          >
            Check Status
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-green-700 focus:outline-none text-2xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg flex flex-col items-center gap-4 py-4 text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="hover:text-blue-700 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Check Status */}
          <Link
            href="/status"
            onClick={() => setOpen(false)}
            className="w-full text-center px-5 py-3 bg-blue-950 text-white rounded-lg font-semibold shadow-lg hover:bg-green-600 hover:scale-105 transition transform"
          >
            Check Status
          </Link>
        </div>
      )}
    </nav>
  );
}