import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

/* ================= SEO ================= */
export async function generateMetadata() {
  return {
    title: "Blog | ScholarshipGround",
    description:
      "Insights, guides, and scholarship tips to help you succeed",

    alternates: {
      canonical: "https://www.scholarshipground.com/blog",
    },
  };
}

/* ================= CATEGORY LABELS ================= */
const CATEGORY_LABELS = {
  SCHOLARSHIP: "Scholarship",
  INTERNSHIP: "Internship",
  FELLOWSHIP: "Fellowship",
  GRANT: "Grant",
  ENTREPRENEURSHIP: "Entrepreneurship",
  TRAINING: "Training",
  JOB: "Job",
};

/* ================= HELPERS ================= */
function getReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content?.split(" ").length || 0;
  return Math.ceil(wordCount / wordsPerMinute);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ================= PAGE ================= */
export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const featured = blogs.find((b) => b.featured) || blogs[0];
  const rest = blogs.filter((b) => b.id !== featured?.id);
  const latest = blogs.slice(0, 5);

  /* ================= FETCH CATEGORIES FROM DB ================= */
  const categoryRaw = await prisma.scholarship.findMany({
    where: { status: "PUBLISHED" },
    select: { category: true },
  });

  const categories = [
    ...new Set(categoryRaw.map((c) => c.category).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <section className="mt-16 py-16 px-6 max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Blog
          </h1>
          <p className="text-gray-600 mt-4">
            Insights, guides, and scholarship tips to help you succeed
          </p>
        </div>

        {/* FEATURED */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="block group">
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">

              <div className="relative w-full h-72">
                <Image
                  src={featured.image || "/placeholder.jpg"}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-8">
                <span className="text-sm text-blue-600 font-semibold">
                  Featured Article
                </span>

                <h2 className="text-2xl md:text-3xl font-bold mt-2 text-gray-900 group-hover:text-blue-700 transition">
                  {featured.title}
                </h2>

                <p className="text-gray-600 mt-4 line-clamp-3">
                  {featured.excerpt}
                </p>

                <p className="text-xs text-gray-400 mt-6">
                  {formatDate(featured.createdAt)} •{" "}
                  {getReadTime(featured.content)} min read
                </p>
              </div>
            </div>
          </Link>
        )}

        {/* GRID */}
        <div className="grid lg:grid-cols-4 gap-10">

          {/* BLOG LIST */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {rest.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition overflow-hidden group flex flex-col"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={blog.image || "/placeholder.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">

                    <h2 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition">
                      {blog.title}
                    </h2>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="mt-auto pt-4">
                      <p className="text-xs text-gray-400">
                        {formatDate(blog.createdAt)} •{" "}
                        {getReadTime(blog.content)} min read
                      </p>

                      <span className="text-sm font-semibold text-blue-600 group-hover:underline mt-2 inline-block">
                        Read more →
                      </span>
                    </div>

                  </div>
                </Link>
              ))}

            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-8">

            {/* ABOUT */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-3">
                About This Blog
              </h2>
              <p className="text-sm text-gray-600">
                Stay updated with scholarship guides, application tips,
                and opportunities worldwide.
              </p>
            </div>

            {/* CATEGORIES (CLICKABLE + FIXED) */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">
                Categories
              </h2>

              <ul className="space-y-2 text-sm">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/scholarships?category=${cat}`}
                        className="hover:text-blue-700 transition"
                      >
                        {CATEGORY_LABELS[cat] || cat}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No categories</li>
                )}
              </ul>
            </div>

            {/* LATEST */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">
                Latest Posts
              </h2>

              <ul className="space-y-3 text-sm">
                {latest.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

        </div>

      </section>
    </div>
  );
}