export const dynamic = "force-dynamic";

import Link from "next/link";
import Navbar from "../components/Navbar";
import prisma from "@/lib/prisma";
import WhatsAppCommunity from "../components/whatsapp";
import Footer from "../components/Footer";

export async function generateMetadata({ searchParams }) {
  const baseUrl = "https://www.scholarshipground.com/scholarships";

  // ✅ FIX: unwrap searchParams
  const params = await searchParams;

  const page = params?.page;
  const search = params?.search;
  const country = params?.country;
  const degree = params?.degree;
  const category = params?.category;

  // ✅ Detect filters (for SEO control)
  const hasFilters = page || search || country || degree || category;

  return {
    title: "Scholarships, Internships & Grants | ScholarshipGround",
    description:
      "Find verified scholarships, internships, fellowships, and global opportunities.",

    alternates: {
      canonical: baseUrl,
    },

    // ✅ PRO SEO (prevents duplicate indexing of filters)
    robots: {
      index: !hasFilters,
      follow: true,
    },

    openGraph: {
      title: "Scholarships | ScholarshipGround",
      description:
        "Find verified global scholarships and opportunities.",
      url: baseUrl,
      siteName: "ScholarshipGround",
      type: "website",
    },
  };
}

function getStatus(deadline) {
  const today = new Date();
  const endDate = new Date(deadline);

  if (today > endDate) return "Closed";

  const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) return "Ongoing";

  return "Open";
}

export default async function ScholarshipsPage({ searchParams }) {
  searchParams = await searchParams;

  const page = parseInt(searchParams?.page || "1");
  const search = searchParams?.search || "";
  const country = searchParams?.country || "";
  const degree = searchParams?.degree || "";
  const category = searchParams?.category || "";

  const pageSize = 10;

  const where = {
    status: "PUBLISHED",
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { overview: { contains: search, mode: "insensitive" } },
        { country: { contains: search, mode: "insensitive" } },
        { university: { contains: search, mode: "insensitive" } },
        { extraDetails: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(country && { country: { contains: country.trim(), mode: "insensitive" } }),
    ...(degree && { degree: { contains: degree.trim(), mode: "insensitive" } }),
    ...(category && { category: category.trim() }),
  };

  const [scholarships, total, countries] = await Promise.all([
    prisma.scholarship.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.scholarship.count({ where }),
    prisma.scholarship.findMany({
      select: { country: true },
      distinct: ["country"],
    }),
  ]);

  const totalPages = Math.ceil(total / pageSize);
  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      {/* ✅ STRUCTURED DATA (SEO BOOST) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Scholarships",
            url: "https://www.scholarshipground.com/scholarships",
            description:
              "Find scholarships, internships, and global opportunities.",
          }),
        }}
      />

      <section className="mt-32 max-w-7xl mx-auto px-6">
        {/* HERO */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Find Scholarships That Fit You
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore scholarships, filter by country, degree, category, and deadline.
          </p>
        </div>

        {/* FILTER BAR */}
        <form
          method="GET"
          action="/scholarships"
          className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 mb-12 grid md:grid-cols-5 gap-4"
        >
          <input
            type="text"
            name="search"
            placeholder="🔍 Search scholarships..."
            defaultValue={search}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select name="country" defaultValue={country} className="p-3 border border-gray-200 rounded-lg">
            <option value="">🌍 All Countries</option>
            {countries.map((c, i) => (
              <option key={i} value={c.country}>
                {c.country}
              </option>
            ))}
          </select>

          <select name="degree" defaultValue={degree} className="p-3 border border-gray-200 rounded-lg">
            <option value="">🎓 All Degrees</option>
            <option value="BSc">Bachelor</option>
            <option value="MSc">Master</option>
            <option value="PhD">PhD</option>
          </select>

          {/* ✅ FIXED CATEGORY VALUES */}
          <select name="category" defaultValue={category} className="p-3 border border-gray-200 rounded-lg">
            <option value="">📂 All Categories</option>
            <option value="SCHOLARSHIP">Scholarship</option>
            <option value="INTERNSHIP">Internship</option>
            <option value="FELLOWSHIP">Fellowship</option>
            <option value="GRANT">Grant</option>
            <option value="ENTREPRENEURSHIP">Entrepreneurship</option>
            <option value="TRAINING">Training</option>
            <option value="JOB">Job</option>
          </select>

          <button className="bg-gradient-to-r from-blue-950 to-teal-500 text-white rounded-lg px-4 py-2 font-semibold hover:opacity-90 transition">
            Apply Filters
          </button>
        </form>

        <div className="grid lg:grid-cols-4 gap-10">
          {/* LEFT SIDEBAR */}
         <aside className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit lg:sticky lg:top-24">
  <h2 className="font-bold mb-4 text-lg">🔥 Popular Destinations</h2>

  <div className="space-y-3 text-sm">
    {countries.slice(0, 8).map((c, i) => (
      <Link
        key={i}
        href={`/scholarships?country=${c.country}`}
        className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
      >
        {c.country}
      </Link>
    ))}
  </div>
</aside>



          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {scholarships.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center text-gray-500 shadow-sm">
                No scholarships found.
              </div>
            ) : (
              scholarships.map((sch) => {
const isGuide = sch.category === "GUIDE";
const status = !isGuide ? getStatus(sch.deadline) : null;
                const statusColor =
                  status === "Open"
                    ? "bg-green-100 text-green-700"
                    : status === "Ongoing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700";

                return (
                  <div
                    key={sch.id}
                    className={`bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition p-6 flex flex-col md:flex-row gap-6 group ${
  isGuide ? "border-l-4 border-l-green-500" : ""
}`}>
                    {sch.image && (
                      <div className="md:w-44 w-full h-40 overflow-hidden rounded-xl">
                        <img
                          src={sch.image}
                          alt={sch.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                    )}

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {!isGuide && (
  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor}`}>
    {status}
  </span>
)}

                        {sch.category && (
                          <span className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                            {sch.category}
                          </span>
                        )}

                        <h2 className="text-xl font-semibold mt-2 group-hover:text-blue-600 transition">
                          {sch.title}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          {sch.country} • {sch.degree}
                        </p>

                        {!isGuide && sch.deadline && (
  <p className="text-sm mt-1">
    Deadline:{" "}
    <span className="font-medium">
      {new Date(sch.deadline).toLocaleDateString()}
    </span>
  </p>
)}
{isGuide ? (
  <p className="text-sm text-gray-600 mt-3 italic">
    📘 Read full guide article →
  </p>
) : (
  sch.overview && (
    <p className="text-sm text-gray-600 mt-3 line-clamp-3">
      {sch.overview}
    </p>
  )
)}
                      </div>

                      <div className="mt-5">
                        <Link
                          href={`/scholarships/${sch.slug}`}
                          className="inline-flex items-center bg-gradient-to-r from-blue-950 to-teal-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-12">
              {page > 1 && (
                <Link href={`?page=${page - 1}`} className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition">
                  ← Previous
                </Link>
              )}
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link href={`?page=${page + 1}`} className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition">
                  Next →
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6 sticky top-24">
            <WhatsAppCommunity />

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold mb-3">🔥 Trending</h2>
              <ul className="space-y-2 text-sm">
                {scholarships.filter((s) => s.trending).slice(0, 5).map((s) => (
                  <li key={s.id}>
                    <Link href={`/scholarships/${s.slug}`}>{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-sm text-gray-600 shadow-sm">
              <p className="font-semibold mb-2">💡 Tip</p>
              <p>
                Use filters to quickly find scholarships that match your country,
                degree, category, and deadline.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}