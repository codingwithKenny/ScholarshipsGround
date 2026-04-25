"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBlog } from "../blogaction";
import RichMarkdownEditor from "@/app/components/RichMarkdownEditor";

export default function CreateBlog() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    published: false,
    featured: false,
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

    // ✅ Attach image file (NOT URL, NOT upload here)
    if (imageFile) {
      formData.append("image", imageFile);
    }

    await createBlog(formData);

    router.push("/admin/blogs");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-950 to-teal-500 p-8 rounded-2xl text-white shadow-lg">
        <h1 className="text-3xl font-bold">Create Blog</h1>
        <p className="opacity-90 mt-2">
          Publish a new blog post
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
              placeholder="Blog Title"
              required
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="Excerpt"
              required
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
  value={form.content}
  rows="8"
  placeholder="Write your blog content..."
  required
  onChange={(value) =>
    setForm({ ...form, content: value })
  }
/>
        </div>

        {/* IMAGE */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Blog Image
          </h2>

          <input
            type="file"
            accept="image/*"
            className="input"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              className="mt-4 rounded-xl shadow w-full max-h-64 object-cover"
            />
          )}
        </div>

        {/* SETTINGS */}
        <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">

          <div>
            <h3 className="font-semibold text-gray-900">
              Publish Settings
            </h3>
            <p className="text-sm text-gray-500">
              Control blog visibility
            </p>
          </div>

          <div className="flex gap-6">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
              />
              Published
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
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
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-950 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Create Blog
          </button>
        </div>

      </form>
    </div>
  );
}