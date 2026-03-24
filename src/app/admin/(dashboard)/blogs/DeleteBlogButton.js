"use client";

import { deleteBlog } from "./blogaction";

export default function DeleteBlogButton({ id }) {
  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    await deleteBlog(id);
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 font-medium"
    >
      Delete
    </button>
  );
}