import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import prisma from "@/lib/prisma";

/* ================= METADATA ================= */
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const item = await prisma.scholarship.findUnique({
    where: { slug },
  });

  if (!item) {
    return {
      title: "Not Found | ScholarshipGround",
    };
  }

  const canonicalUrl = `https://www.scholarshipground.com/scholarships/${slug}`;

  const deadlineText = item.deadline
    ? `Apply before ${new Date(item.deadline).toLocaleDateString()}`
    : "No fixed deadline / Rolling application";

  return {
    title: `${item.title} | ScholarshipGround`,
    description: `${item.title} in ${item.country}. ${deadlineText}.`,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: item.title,
      description: `${item.title} in ${item.country}`,
      url: canonicalUrl,
      siteName: "ScholarshipGround",
      type: "article",
      images: item.image
        ? [
            {
              url: item.image,
              width: 1200,
              height: 630,
              alt: item.title,
            },
          ]
        : [],
    },
  };
}

/* ================= HELPERS ================= */
function getStatus(deadline) {
  if (!deadline) return "Open";

  const today = new Date();
  const endDate = new Date(deadline);

  if (today > endDate) return "Closed";

  const diffDays = (endDate - today) / (1000 * 60 * 60 * 24);

  if (diffDays <= 30) return "Ongoing";

  return "Open";
}

function getStatusColor(status) {
  if (status === "Open") return "bg-green-100 text-green-700";
  if (status === "Ongoing") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

function formatDeadline(deadline) {
  if (!deadline) return "No deadline / Always open";

  const date = new Date(deadline);
  if (isNaN(date.getTime())) return "No deadline / Always open";

  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getCategoryLabel(category) {
  const map = {
    SCHOLARSHIP: "Scholarship",
    INTERNSHIP: "Internship",
    GRANT: "Grant",
    FELLOWSHIP: "Fellowship",
    ENTREPRENEURSHIP: "Entrepreneurship",
    TRAINING: "Training",
    JOB: "Job",
  };

  return map[category] || category;
}

/* ✅ CLEAN TITLE FIX */
function cleanTitle(title) {
  return title
    .replace(/\(.*?\)/g, "")
    .replace(/–.*$/g, "")
    .trim();
}

/* ================= PAGE ================= */
export default async function DetailPage({ params }) {
  const { slug } = await params;

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
  const statusColor = getStatusColor(status);

  const today = new Date();

  const [related, trending, popular] = await Promise.all([
    prisma.scholarship.findMany({
      where: {
        country: item.country,
        status: "PUBLISHED",
        NOT: { id: item.id },
      },
      take: 6,
      orderBy: {
        deadline: {
          sort: "asc",
          nulls: "last",
        },
      },
    }),

    prisma.scholarship.findMany({
      where: {
        trending: true,
        status: "PUBLISHED",
        NOT: { id: item.id },
        OR: [{ deadline: null }, { deadline: { gte: today } }],
      },
      take: 4,
      orderBy: {
        deadline: {
          sort: "asc",
          nulls: "last",
        },
      },
    }),

    prisma.scholarship.findMany({
      where: {
        popular: true,
        status: "PUBLISHED",
        NOT: { id: item.id },
        OR: [{ deadline: null }, { deadline: { gte: today } }],
      },
      take: 4,
      orderBy: {
        deadline: {
          sort: "asc",
          nulls: "last",
        },
      },
    }),
  ]);

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
                unoptimized
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
              </div>

              {/* TITLE */}
              <h1 className="text-3xl md:text-4xl font-bold">
                {item.title}
              </h1>

              {/* META */}
              <p className="text-gray-500 mt-2 text-sm">
                {item.country} •{" "}
                {item.category === "SCHOLARSHIP"
                  ? item.degree || "All Levels"
                  : item.category === "INTERNSHIP"
                  ? item.duration || getCategoryLabel(item.category)
                  : getCategoryLabel(item.category)}
              </p>

              {/* KEY INFO */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm">

                <Info label="Deadline" value={formatDeadline(item.deadline)} />

                {["SCHOLARSHIP", "GRANT", "FELLOWSHIP"].includes(item.category) && (
                  <Info
                    label="Funding"
                    value={item.fundingType?.replace("_", " ") || "N/A"}
                  />
                )}

                {item.category === "SCHOLARSHIP" && (
                  <>
                    <Info label="University" value={item.university || "Various"} />
                    <Info label="Degree" value={item.degree || "All Levels"} />
                  </>
                )}

                {["INTERNSHIP", "JOB", "TRAINING", "ENTREPRENEURSHIP"].includes(
                  item.category
                ) && (
                  <Info label="Organization" value={item.organization || "Various"} />
                )}

                {item.category === "INTERNSHIP" && item.duration && (
                  <Info label="Duration" value={item.duration} />
                )}

                {item.category === "JOB" && item.salary && (
                  <Info label="Salary" value={item.salary} />
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

          {/* CONTENT */}
          <Section title="Overview" content={item.overview} />

         

          <ListSection title="Eligibility" data={item.eligibility} />
                           <ListSection title="Eligible Countries" data={item.eligibleCountries} />

          <ListSection title="Benefits" data={item.benefits} />
          <ListSection title="Requirements" data={item.requirements} />
           <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-3">
              How to Apply for {cleanTitle(item.title)}
            </h2>

            {item.howToApply ? (
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {item.howToApply}
              </p>
            ) : (
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Click the Apply Now button above</li>
                <li>Check eligibility requirements carefully</li>
                <li>Prepare required documents</li>
                <li>Write a strong motivation letter</li>
                <li>Submit before deadline</li>
              </ol>
            )}
          </div>

          <Section title="Important Notes" content={item.extraDetails} />
          {item.officialLink && (
                <a
                  href={item.officialLink}
                  target="_blank"
                  className="inline-block mt-6 bg-gradient-to-r from-blue-950 to-teal-500 px-6 py-3 text-white font-semibold rounded-lg shadow hover:scale-105 transition"
                >
                  Click here to Apply →
                </a>
              )}

          {trending.length > 0 && (
            <CardList title="🔥 Trending Opportunities" data={trending} />
          )}

          {popular.length > 0 && (
            <CardList title="⭐ Popular Opportunities" data={popular} />
          )}

        </main>

        {/* SIDEBAR */}
        <aside className="space-y-6 lg:sticky lg:top-32 h-fit">

          {item.officialLink && (
            <div className="bg-gradient-to-r from-blue-950 to-teal-500 p-6 rounded-2xl text-white">
              <h3 className="font-bold text-lg">🚀 Apply Now</h3>
              <p className="text-sm mt-2">
                {item.deadline
                  ? "Don’t miss this opportunity before deadline."
                  : "Apply anytime — no fixed deadline."}
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

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-3">More in {item.country}</h3>
            <div className="space-y-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/scholarships/${r.slug}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */
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

function CardList({ title, data }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ul className="list-disc pl-5 space-y-2">
        {data.map((item) => (
          <li key={item.id}>
            <Link
              href={`/scholarships/${item.slug}`}
              className="text-blue-700 hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}