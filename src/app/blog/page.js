import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

// ✅ helpers
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

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  // ✅ Featured logic (fixed)
  const featuredPosts = blogs.filter((b) => b.featured);
  const featured = featuredPosts[0] || blogs[0];

  const rest = blogs.filter((b) => b.id !== featured?.id);

  // ✅ Dynamic categories
  const categories = [
    ...new Set(blogs.map((b) => b.category).filter(Boolean)),
  ];

  // ✅ Latest posts (sidebar)
  const latest = blogs.slice(0, 5);

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

        {/* FEATURED POST */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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

                <p className="text-xs text-gray-500 mt-1">
                  By {featured.author || "RK"}
                </p>
              </div>
            </div>
          </Link>
        )}

        {/* GRID */}
        <div className="grid lg:grid-cols-4 gap-10">

          {/* BLOG LIST */}
          <div className="lg:col-span-3">

            {rest.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  No blog posts yet
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {rest.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition overflow-hidden group flex flex-col"
                  >

                    {/* IMAGE */}
                    <div className="relative w-full h-48">
                      <Image
                        src={blog.image || "/placeholder.jpg"}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 flex flex-col flex-1">

                      <h2 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition">
                        {blog.title}
                      </h2>

                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* FOOTER */}
                      <div className="mt-auto pt-4">
                        <p className="text-xs text-gray-400">
                          {formatDate(blog.createdAt)} •{" "}
                          {getReadTime(blog.content)} min read
                        </p>

                        <p className="text-xs text-gray-500">
                          By {blog.author || "RK"}
                        </p>

                        <span className="text-sm font-semibold text-blue-600 group-hover:underline mt-2 inline-block">
                          Read more →
                        </span>
                      </div>

                    </div>
                  </Link>
                ))}

              </div>
            )}

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

            {/* DYNAMIC CATEGORIES */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">
                Categories
              </h2>

              <ul className="space-y-2 text-sm">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li
                      key={cat}
                      className="hover:text-blue-700 cursor-pointer"
                    >
                      {cat}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No categories</li>
                )}
              </ul>
            </div>

            {/* LATEST POSTS */}
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

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-950 to-teal-500 text-white rounded-xl p-6 text-center">
              <h3 className="font-bold text-lg mb-2">
                Want Updates?
              </h3>
              <p className="text-sm mb-4">
                Subscribe to get the latest scholarship alerts.
              </p>

              <Link href="/subscribe">
                <button className="bg-white text-blue-900 px-4 py-2 rounded-full text-sm font-semibold">
                  Subscribe
                </button>
              </Link>
            </div>

          </aside>

        </div>

      </section>
    </div>
  );
}