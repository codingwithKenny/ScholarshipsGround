"use client";

import Navbar from "@/app/components/Navbar";
import Link from "next/link";

const countries = [
  "Germany",
  "USA",
  "United Kingdom",
  "Canada",
  "Australia",
  "Netherlands",
  "Sweden",
];

export default function CountriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />

      <section className="mt-24 py-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
          Scholarships by Country
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {countries.map((country, idx) => (
            <Link
              href={`/scholarships?country=${country}`}
              key={idx}
              className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition transform"
            >
              <p className="text-xl font-semibold text-gray-900">{country}</p>
              <p className="text-gray-600 mt-2">View available scholarships</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}