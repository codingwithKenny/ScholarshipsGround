import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import prisma from "@/lib/prisma";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const item = await prisma.scholarship.findUnique({
    where: { slug },
  });

  if (!item) return { title: "Not Found | ScholarshipGround" };

  return {
    title: `${item.title} | ScholarshipGround`,
    description: `${item.title} in ${item.country}. Apply before ${new Date(
      item.deadline
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

function getCategoryLabel(category) {
  switch (category) {
    case "INTERNSHIP":
      return "Internship";
    case "GRANT":
      return "Grant";
    case "FELLOWSHIP":
      return "Fellowship";
    case "ENTREPRENEURSHIP":
      return "Entrepreneurship";
    case "TRAINING":
      return "Training";
    case "JOB":
      return "Job";
    default:
      return "Scholarship";
  }
}

export default async function DetailPage({ params }) {
  const { slug } = await params;

  // Fetch main scholarship
  const item = await prisma.scholarship.findUnique({
    where: { slug },
  });

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Opportunity not found</p>
      </div>
    );
  }

  const status = getStatus(item.deadline);

  // Sidebar: other scholarships in same country
  const related = await prisma.scholarship.findMany({
    where: {
      country: item.country,
      status: "PUBLISHED",
      NOT: { id: item.id },
    },
    take: 6,
    orderBy: { deadline: "asc" },
  });

  // Trending scholarships (future deadlines only)
  const today = new Date();
  const trending = await prisma.scholarship.findMany({
    where: {
      trending: true,
      status: "PUBLISHED",
      NOT: { id: item.id },
      deadline: { gte: today },
    },
    take: 4,
    orderBy: { deadline: "asc" },
  });

  // Popular scholarships (future deadlines only)
  const popular = await prisma.scholarship.findMany({
    where: {
      popular: true,
      status: "PUBLISHED",
      NOT: { id: item.id },
      deadline: { gte: today },
    },
    take: 4,
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

        {/* ================= MAIN ================= */}
        <main className="lg:col-span-2 space-y-8">

          {/* HERO */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                width={900}
                height={400}
                className="w-full h-72 object-cover"
              />
            )}

            <div className="p-6">
              {/* BADGES */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`text-xs px-3 py-1 rounded-full ${statusColor}`}>
                  {status}
                </span>

                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  {getCategoryLabel(item.category)}
                </span>

                {/* {item.trending && (
                  <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                    🔥 Trending
                  </span>
                )}

                {item.popular && (
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                    ⭐ Popular
                  </span>
                )} */}
              </div>

              {/* TITLE */}
              <h1 className="text-3xl md:text-4xl font-bold">{item.title}</h1>

              {/* META */}
              <p className="text-gray-500 mt-2 text-sm">
                {item.country} •{" "}
                {item.category === "SCHOLARSHIP"
                  ? item.degree
                  : getCategoryLabel(item.category)}
              </p>

              {/* KEY INFO */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm">
                <Info label="Deadline" value={new Date(item.deadline).toLocaleDateString()} />
                <Info label="Funding" value={item.fundingType?.replace("_", " ")} />

                {item.category === "SCHOLARSHIP" ? (
                  <>
                    <Info label="University" value={item.university || "Various"} />
                    <Info label="Degree" value={item.degree || "All Levels"} />
                  </>
                ) : (
                  <Info label="Organization" value={item.organization || "Various"} />
                )}
              </div>

              {/* APPLY */}
              {item.officialLink && (
                <a
                  href={item.officialLink}
                  target="_blank"
                  className="inline-block mt-6 bg-gradient-to-r from-blue-950 to-teal-500 px-6 py-3 text-white font-semibold rounded-lg shadow hover:scale-105 transition"
                >
                  Apply Now →
                </a>
              )}
            </div>
          </div>

          {/* OVERVIEW */}
          <Section title="Overview" content={item.overview} />

          {/* EXTRA DETAILS */}
          {/* <Section title="Extra Details" content={item.extraDetails} /> */}

          {/* LISTS */}
          <ListSection title="Eligibility" data={item.eligibility} />
          <ListSection title="Benefits" data={item.benefits} />
          <ListSection title="Requirements" data={item.requirements} />
          <Section title="Note" content={item.extraDetails} />

          {/* HOW TO APPLY */}
          <Section title="How To Apply" content={item.howToApply} />

          {/* ================= TRENDING POSTS ================= */}
          {trending.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">🔥 Trending Scholarships</h2>
              <ul className="list-disc pl-5 space-y-2">
                {trending.map((t) => (
                  <li key={t.id}>
                    <Link href={`/scholarships/${t.slug}`} className="text-blue-700 hover:underline">
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ================= POPULAR POSTS ================= */}
          {popular.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">⭐ Popular Scholarships</h2>
              <ul className="list-disc pl-5 space-y-2">
                {popular.map((p) => (
                  <li key={p.id}>
                    <Link href={`/scholarships/${p.slug}`} className="text-blue-700 hover:underline">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>

        {/* ================= SIDEBAR ================= */}
        <aside className="space-y-6 lg:sticky lg:top-32 h-fit">

          {/* APPLY BOX */}
          {item.officialLink && (
            <div className="bg-gradient-to-r from-blue-950 to-teal-500 p-6 rounded-2xl text-white shadow-lg">
              <h3 className="font-bold text-lg">🚀 Don’t Miss Out</h3>
              <p className="text-sm mt-2">
                Apply before the deadline and secure your spot.
              </p>

              <a
                href={item.officialLink}
                target="_blank"
                className="block text-center mt-4 bg-white text-blue-900 font-semibold py-2 rounded-lg"
              >
                Apply Now
              </a>
            </div>
          )}

          {/* COMMUNITY */}
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <h3 className="font-semibold text-lg mb-2">🎯 Join Our Community</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get daily scholarships, grants & opportunities directly.
            </p>

            <a
              href="https://chat.whatsapp.com/EnMAWNlw9Cr66sGSKmy0nR"
              target="_blank"
              className="inline-block bg-green-500 text-white px-5 py-2 rounded-lg font-semibold"
            >
              Join WhatsApp Group
            </a>
          </div>

          {/* RELATED */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-4">More in {item.country}</h3>

            <div className="space-y-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/scholarships/${r.slug}`}
                  className="block p-4 rounded-xl bg-gray-50 hover:bg-gray-100"
                >
                  <p className="text-sm font-medium line-clamp-2">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */
function Info({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <span className="block text-gray-500 text-xs">{label}</span>
      <span className="font-semibold text-sm">{value}</span>
    </div>
  );
}

function Section({ title, content }) {
  if (!content) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    </div>
  );
}

function ListSection({ title, data }) {
  if (!data?.length) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        {data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}