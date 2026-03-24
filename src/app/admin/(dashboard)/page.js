import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const scholarshipCount = await prisma.scholarship.count();
  const blogCount = await prisma.blog.count();

  const publishedScholarships = await prisma.scholarship.count({
    where: { status: "PUBLISHED" },
  });

  const draftScholarships = await prisma.scholarship.count({
    where: { status: "DRAFT" },
  });

  const recentScholarships = await prisma.scholarship.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 to-teal-500 p-8 rounded-2xl text-white shadow-lg">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="opacity-90 mt-2">
          Manage scholarships, blogs and platform content
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Scholarships */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Total Scholarships</p>
          <h2 className="text-3xl font-bold text-blue-900 mt-2">
            {scholarshipCount}
          </h2>
        </div>

        {/* Published */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Published</p>
          <h2 className="text-3xl font-bold text-teal-600 mt-2">
            {publishedScholarships}
          </h2>
        </div>

        {/* Draft */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Drafts</p>
          <h2 className="text-3xl font-bold text-yellow-500 mt-2">
            {draftScholarships}
          </h2>
        </div>

        {/* Blogs */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Total Blogs</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {blogCount}
          </h2>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">

        <Link
          href="/admin/scholarships/new"
          className="bg-gradient-to-r from-blue-950 to-teal-500 text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition"
        >
          <h3 className="text-xl font-bold mb-2">
            Create Scholarship
          </h3>
          <p className="opacity-90">
            Add a new scholarship opportunity
          </p>
        </Link>

        <Link
          href="/admin/blogs/new"
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition"
        >
          <h3 className="text-xl font-bold mb-2">
            Create Blog Post
          </h3>
          <p className="opacity-90">
            Publish a new article
          </p>
        </Link>

      </div>

      {/* Recent Scholarships */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Scholarships
          </h2>

          <Link
            href="/admin/scholarships"
            className="text-sm text-blue-900 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {recentScholarships.map((sch) => (
            <div
              key={sch.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {sch.title}
                </p>
                <p className="text-sm text-gray-500">
                  {sch.country}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  sch.status === "PUBLISHED"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {sch.status}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}