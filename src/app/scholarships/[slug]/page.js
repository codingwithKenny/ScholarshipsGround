import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import prisma from "@/lib/prisma";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const scholarship = await prisma.scholarship.findUnique({
    where: { slug },
  });

  if (!scholarship) {
    return { title: "Scholarship Not Found | ScholarshipGround" };
  }

  return {
    title: `${scholarship.title} | ScholarshipGround`,
    description: `${scholarship.title} in ${scholarship.country}. Apply before ${new Date(
      scholarship.deadline
    ).toLocaleDateString()}.`,
  };
}

function getStatus(deadline) {
  const today = new Date();
  const endDate = new Date(deadline);

  if (today > endDate) return "Closed";

  const diffDays = (endDate - today) / (1000 * 60 * 60 * 24);

  if (diffDays <= 30) return "Ongoing";

  return "Open";
}

export default async function ScholarshipDetailPage({ params }) {
  const { slug } = await params;

  const scholarship = await prisma.scholarship.findUnique({
    where: { slug },
  });

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Scholarship not found</p>
      </div>
    );
  }

  const status = getStatus(scholarship.deadline);

  const relatedScholarships = await prisma.scholarship.findMany({
    where: {
      country: scholarship.country,
      status: "PUBLISHED",
      NOT: { id: scholarship.id },
    },
    take: 6,
    orderBy: { deadline: "asc" },
  });

  const statusColor =
    status === "Open"
      ? "bg-green-100 text-green-700"
      : status === "Ongoing"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";


  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 mt-40 grid lg:grid-cols-3 gap-10">

        {/* MAIN CONTENT */}
        <main className="lg:col-span-2 space-y-8">

          {/* HERO CARD */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            {scholarship.image && (
              <Image
                src={scholarship.image}
                alt={scholarship.title}
                width={900}
                height={400}
                className="w-full h-72 object-cover"
              />
            )}

            <div className="p-6">

              <span className={`text-xs px-3 py-1 rounded-full ${statusColor}`}>
                {status}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold mt-3 leading-tight">
                {scholarship.title}
              </h1>

              <p className="text-gray-500 mt-2 text-sm">
                {scholarship.country} • {scholarship.degree}
              </p>

              {/* KEY INFO */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm">

                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-gray-500">Deadline</span>
                  <span className="font-semibold">
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-gray-500">Funding</span>
                  <span className="font-semibold">
                    {scholarship.fundingType?.replace("_", " ")}
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-gray-500">University</span>
                  <span className="font-semibold">
                    {scholarship.university || "Various"}
                  </span>
                </div>

              </div>

              {/* APPLY BUTTON */}
              {scholarship.officialLink && (
                <a
                  href={scholarship.officialLink}
                  target="_blank"
                  className="inline-block mt-6 bg-gradient-to-r from-blue-950 to-teal-500 px-6 py-3 text-white font-semibold rounded-lg shadow hover:scale-105 transition"
                >
                  Apply Now →
                </a>
              )}

            </div>
          </div>

          {/* CONTENT SECTIONS */}
          {[
            { title: "Overview", content: scholarship.overview },
            { title: "How to Apply", content: scholarship.howToApply },
          ].map((section, i) =>
            section.content ? (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ) : null
          )}

          {/* LIST SECTIONS */}
          {/* LIST SECTIONS */}
{[
  { title: "Eligibility", data: scholarship.eligibility },
  { title: "Benefits", data: scholarship.benefits },
  { title: "Requirements", data: scholarship.requirements },
].map((section, i) =>
  section.data ? (
    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-3">
        {section.title}
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        {section.data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  ) : null
)}

        </main>

        {/* SIDEBAR */}
        <aside className="space-y-6 lg:sticky lg:top-32 h-fit">

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-4">
              More in {scholarship.country}
            </h3>

            <div className="space-y-3">
              {relatedScholarships.map((item) => (
                <Link
                  key={item.id}
                  href={`/scholarships/${item.slug}`}
                  className="block p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <p className="font-medium text-sm line-clamp-2">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.deadline).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm text-sm text-gray-600">
            <p className="font-semibold mb-2">💡 Tip</p>
            <p>
              Apply early and prepare documents like SOP, CV, and recommendation letters.
            </p>
          </div>

        </aside>

      </div>
    </div>
  );
}