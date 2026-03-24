"use server";

import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* =========================
   SLUG UTILITIES
========================= */

// Base slug generator (safe)
function generateSlug(title) {
  if (!title || title.trim() === "") {
    throw new Error("Title is required to generate slug");
  }

  let slug = title
    .toLowerCase()
    .trim()
    // normalize accented characters (é → e, ü → u, etc.)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    // replace non-alphanumeric with hyphen
    .replace(/[^a-z0-9]+/g, "-")
    // remove multiple hyphens
    .replace(/-+/g, "-")
    // trim hyphens
    .replace(/(^-|-$)/g, "");

  // fallback only if absolutely empty
  if (!slug) {
    slug = "blog";
  }

  return slug;
}

// Ensure slug is unique in DB
async function generateUniqueSlug(title) {
  const baseSlug = generateSlug(title);

  let slug = baseSlug;
  let count = 1;

  while (await prisma.blog.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

/* =========================
   IMAGE UPLOAD
========================= */

async function uploadImage(image) {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "blogs" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });

  return result.secure_url;
}

/* =========================
   CREATE BLOG
========================= */

export async function createBlog(formData) {
  const title = formData.get("title");
  const excerpt = formData.get("excerpt");
  const content = formData.get("content");
  const image = formData.get("image");

  const published =
    formData.get("published") === "true" ||
    formData.get("published") === "on";

  const featured =
    formData.get("featured") === "true" ||
    formData.get("featured") === "on";

  let imageUrl = null;

  if (image && image.size > 0) {
    imageUrl = await uploadImage(image);
  }

  // ✅ unique slug
  const slug = await generateUniqueSlug(title);

  await prisma.blog.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      image: imageUrl,
      published,
      featured,
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");

  redirect("/admin/blogs");
}

/* =========================
   GET BLOG
========================= */

export async function getBlog(id) {
  return await prisma.blog.findUnique({
    where: { id },
  });
}

/* =========================
   UPDATE BLOG
========================= */

export async function updateBlog(id, formData) {
  const title = formData.get("title");
  const excerpt = formData.get("excerpt");
  const content = formData.get("content");

  const published =
    formData.get("published") === "true" ||
    formData.get("published") === true;

  const featured =
    formData.get("featured") === "true" ||
    formData.get("featured") === true;

  const image = formData.get("image");

  const existingBlog = await prisma.blog.findUnique({
    where: { id },
  });

  let imageUrl;

  if (image && image.size > 0) {
    imageUrl = await uploadImage(image);
  }

  // ✅ Only regenerate slug if title changed
  let slug = existingBlog.slug;

  if (title && title !== existingBlog.title) {
    slug = await generateUniqueSlug(title);
  }

  await prisma.blog.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      published,
      featured,
      ...(imageUrl && { image: imageUrl }),
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");

  redirect("/admin/blogs");
}

/* =========================
   DELETE BLOG
========================= */

export async function deleteBlog(id) {
  await prisma.blog.delete({
    where: { id },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}