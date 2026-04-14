"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBlog } from "../../blogaction";
import RichMarkdownEditor from "@/app/components/RichMarkdownEditor";

export default function EditBlogForm({ blog }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    published: blog.published,
    featured: blog.featured,
  });

  const [imageFile, setImageFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("excerpt", form.excerpt);
    formData.append("content", form.content);
    formData.append("published", form.published);
    formData.append("featured", form.featured);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await updateBlog(blog.id, formData);

    router.push("/admin/blogs");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-950 to-teal-500 p-8 rounded-2xl text-white shadow-lg">
        <h1 className="text-3xl font-bold">Edit Blog</h1>
        <p className="opacity-90 mt-2">
          Update your blog post
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-8"
      >

        {/* BASIC INFO */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Blog Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              className="input"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              className="input"
              value={form.excerpt}
              onChange={(e) =>
                setForm({ ...form, excerpt: e.target.value })
              }
            />

          </div>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Blog Content
          </h2>

          <RichMarkdownEditor
            rows="8"
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
          />
        </div>

        {/* IMAGE */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Blog Image
          </h2>

          {blog.image && (
            <img
              src={blog.image}
              alt="current"
              className="w-full max-h-64 object-cover rounded-xl mb-4"
            />
          )}

          <input
            type="file"
            className="input"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        {/* SETTINGS */}
        <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">

          <div>
            <h3 className="font-semibold text-gray-900">
              Publish Settings
            </h3>
          </div>

          <div className="flex gap-6">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
              />
              Published
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Featured
            </label>

          </div>

        </div>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button className="bg-gradient-to-r from-blue-950 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
            Update Blog
          </button>
        </div>

      </form>
    </div>
  );
}