"use client";

import { deleteScholarship } from "./action";


export default function DeleteButton({ id }) {
  async function handleDelete() {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return;

    await deleteScholarship(id);
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}