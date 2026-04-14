import Navbar from "@/app/components/Navbar";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

/* ================= SEO METADATA ================= */
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    return {
      title: "Blog Not Found | ScholarshipGround",
    };
  }

  const canonicalUrl = `https://www.scholarshipground.com/blog/${slug}`;

  return {
    title: `${blog.title} | ScholarshipGround`,
    description: blog.excerpt || blog.title,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: canonicalUrl,
      images: blog.image ? [blog.image] : [],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.image ? [blog.image] : [],
    },
  };
}

/* ================= PAGE ================= */
export default async function BlogDetail({ params }) {
  const { slug } = await params;

  const [blog, latestScholarships] = await Promise.all([
    prisma.blog.findUnique({
      where: { slug },
    }),

    prisma.scholarship.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Blog not found</p>
      </div>
    );
  }

  const degrees = ["BSc", "MSc", "PhD"];

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

        {/* ================= TABLE OF CONTENT (OPTIONAL BOOST) ================= */}
        {/* <div className="mb-10 p-4 bg-gray-100 rounded-lg">
          <h2 className="font-semibold mb-2">📌 In this article</h2>
          <ul className="text-sm space-y-1">
            <li>Applying for scholarships early</li>
            <li>Developing remote skills</li>
            <li>Planning living expenses</li>
            <li>Meeting requirements</li>
          </ul>
        </div> */}

        {/* ================= CONTENT (MARKDOWN) ================= */}
        <div className="prose prose-lg max-w-none prose-gray">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-bold mt-10 mb-4" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-semibold mt-8 mb-3" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-4 leading-relaxed" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 mb-4" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-2" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="text-blue-600 hover:underline" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold" {...props} />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-16 p-6 bg-gradient-to-r from-blue-950 to-teal-500 text-white rounded-xl text-center">
          <h2 className="text-xl font-bold mb-2">
            🚀 Want daily scholarship updates?
          </h2>
          <p className="text-sm mb-4">
            Follow us and never miss new opportunities.
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
          <h2 className="text-xl font-bold mb-4">🎯 Browse by Degree</h2>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/scholarships"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
            >
              All
            </Link>

            {degrees.map((degree) => (
              <Link
                key={degree}
                href={`/scholarships?degree=${degree}`}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition"
              >
                {degree}
              </Link>
            ))}
          </div>
        </section>

      </article>
    </div>
  );
}