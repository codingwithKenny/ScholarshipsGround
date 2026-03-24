"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Filters({ countries }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [country, setCountry] = useState(searchParams.get("country") || "");
  const [degree, setDegree] = useState(searchParams.get("degree") || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (country) params.set("country", country);
    if (degree) params.set("degree", degree);

    router.push(`/scholarships?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md border rounded-xl p-4 mb-12 grid md:grid-cols-4 gap-4"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search scholarships..."
        className="p-3 border rounded-lg"
      />

      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="p-3 border rounded-lg"
      >
        <option value="">All Countries</option>
        {countries.map((c, i) => (
          <option key={i} value={c.country}>
            {c.country}
          </option>
        ))}
      </select>

      <select
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        className="p-3 border rounded-lg"
      >
        <option value="">All Degrees</option>
        <option value="BSc">Bachelor</option>
        <option value="MSc">Master</option>
        <option value="PhD">PhD</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg px-4 py-2"
      >
        Apply Filters
      </button>
    </form>
  );
}