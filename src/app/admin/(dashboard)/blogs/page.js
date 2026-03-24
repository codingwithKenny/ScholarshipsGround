import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteBlogButton from "./DeleteBlogButton";
import Image from "next/image";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all your blog posts
          </p>
        </div>

        <Link
          href="/admin/blogs/create"
          className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          + New Blog
        </Link>
      </div>

      {/* TABLE HEADER */}
      <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-12 text-sm font-medium text-gray-600">
        <div className="col-span-5">Blog</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-3">Date</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border rounded-xl p-4 grid grid-cols-12 items-center hover:shadow-md transition"
          >

            {/* BLOG INFO */}
            <div className="col-span-5 flex items-center gap-4">

              {blog.image ? (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                  No Image
                </div>
              )}

              <div>
                <p className="font-semibold text-gray-900 line-clamp-1">
                  {blog.title}
                </p>
                <p className="text-xs text-gray-500">
                  {blog.slug}
                </p>
              </div>

            </div>

            {/* STATUS */}
            <div className="col-span-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  blog.published
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {blog.published ? "Published" : "Draft"}
              </span>
            </div>

            {/* DATE */}
            <div className="col-span-3 text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </div>

            {/* ACTIONS */}
            <div className="col-span-2 flex justify-end gap-3">

              <Link
                href={`/admin/blogs/edit/${blog.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </Link>

              <DeleteBlogButton id={blog.id} />

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}