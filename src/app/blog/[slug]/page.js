import Navbar from "@/app/components/Navbar";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function BlogDetail({ params }) {
  const { slug } = await params;

  const [blog, latestScholarships, degrees] = await Promise.all([
    prisma.blog.findUnique({
      where: { slug },
    }),

    prisma.scholarship.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),

    prisma.scholarship.findMany({
      where: { status: "PUBLISHED" },
      select: { degree: true },
      distinct: ["degree"],
    }),
  ]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <article className="max-w-3xl mx-auto px-6 py-20">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl mt-10 font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>

        {/* META */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>

          {blog.featured && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
        </div>

        {/* IMAGE */}
        {blog.image && (
          <div className="mb-8">
            <Image
              src={blog.image}
              alt={blog.title}
              width={900}
              height={500}
              className="rounded-xl object-cover w-full"
              priority
            />
          </div>
        )}

        {/* EXCERPT */}
        {blog.excerpt && (
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* CONTENT */}
        <div className="prose prose-lg max-w-none prose-gray whitespace-pre-line">
          {blog.content}
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-16 p-6 bg-gradient-to-r from-blue-950 to-teal-500 text-white rounded-xl text-center">
          <h2 className="text-xl font-bold mb-2">
            🚀 Want daily scholarship updates?
          </h2>
          <p className="text-sm mb-4">
            Follow us on X and never miss new opportunities.
          </p>

          <a
            href="https://x.com/ScholarGround"
            target="_blank"
            className="inline-block bg-white text-blue-900 px-5 py-2 rounded-lg font-semibold"
          >
            Follow on X
          </a>
        </div>

        {/* ================= LATEST SCHOLARSHIPS ================= */}
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-4">
            🎓 Latest Scholarships
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {latestScholarships.map((sch) => (
              <Link
                key={sch.id}
                href={`/scholarships/${sch.slug}`}
                className="p-4 bg-white border rounded-lg hover:shadow-md transition"
              >
                <h3 className="font-semibold">{sch.title}</h3>
                <p className="text-sm text-gray-500">
                  {sch.country} • {sch.degree}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= BROWSE BY DEGREE ================= */}
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-4">
            🎯 Browse by Degree
          </h2>

          <div className="flex flex-wrap gap-3">
            {degrees.map((d, i) => (
              <Link
                key={i}
                href={`/scholarships?degree=${d.degree}`}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition"
              >
                {d.degree}
              </Link>
            ))}
          </div>
        </section>

      </article>
    </div>
  );
}