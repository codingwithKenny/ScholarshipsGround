"use server";

import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

// ================================
// SLUG GENERATOR
// ================================
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
}

// ================================
// PARSE TEXTAREA → ARRAY
// ================================
function parseList(input) {
  if (!input) return [];
  return input
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

// ================================
// IMAGE UPLOAD
// ================================
async function uploadImage(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "scholarships" },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    ).end(buffer);
  });

  return result;
}

// ================================
// CREATE OPPORTUNITY
// ================================
export async function createScholarship(formData) {
  const image = formData.get("image");
  let imageUrl = "";

  if (image && image.size > 0) {
    const uploadResult = await uploadImage(image);
    imageUrl = uploadResult.secure_url;
  }

  const category = formData.get("category") || "SCHOLARSHIP";
  const isGuide = category === "GUIDE";

  // DEADLINE LOGIC
  const noDeadline = formData.get("noDeadline") === "true";
  const deadlineValue = formData.get("deadline");

  const deadline = isGuide
    ? null
    : noDeadline
    ? null
    : deadlineValue
    ? new Date(deadlineValue)
    : null;

  await prisma.scholarship.create({
    data: {
      title: formData.get("title"),
      slug: generateSlug(formData.get("title")),

      category,
      status: formData.get("status"),

      // ====================
      // GUIDE SAFE FIELDS
      // ====================
      country: isGuide ? null : formData.get("country") || null,
      university: isGuide ? null : formData.get("university") || null,
      organization: isGuide ? null : formData.get("organization") || null,
      degree: isGuide ? null : formData.get("degree") || null,

      fundingType: isGuide ? null : formData.get("fundingType") || null,
      deadline,

      overview: formData.get("overview") || null,

      eligibility: isGuide ? [] : parseList(formData.get("eligibility")),
      eligibleCountries: isGuide ? [] : parseList(formData.get("eligibleCountries")),
      benefits: isGuide ? [] : parseList(formData.get("benefits")),
      requirements: isGuide ? [] : parseList(formData.get("requirements")),

      howToApply: isGuide ? null : formData.get("howToApply") || null,
      extraDetails: isGuide ? null : formData.get("extraDetails") || null,
      officialLink: isGuide ? null : formData.get("officialLink") || null,

      amount: isGuide ? null : formData.get("amount") || null,
      salary: isGuide ? null : formData.get("salary") || null,
      duration: isGuide ? null : formData.get("duration") || null,

      featured: formData.get("featured") === "on",
      trending: isGuide ? false : formData.get("trending") === "on",
      popular: isGuide ? false : formData.get("popular") === "on",

      image: imageUrl,
    },
  });

  revalidatePath("/admin/scholarships");
}

// ================================
// UPDATE OPPORTUNITY
// ================================
export async function updateScholarship(id, formData) {
  try {
    const data = Object.fromEntries(formData.entries());

    const isGuide = data.category === "GUIDE";

    // BOOLEAN FIX
    data.trending = data.trending === "true" || data.trending === true;
    data.popular = data.popular === "true" || data.popular === true;

    // ARRAY FIX
    data.eligibility = parseList(data.eligibility);
    data.eligibleCountries = parseList(data.eligibleCountries);
    data.benefits = parseList(data.benefits);
    data.requirements = parseList(data.requirements);

    // OPTIONAL FIELDS
    const optionalFields = [
      "university",
      "organization",
      "degree",
      "fundingType",
      "amount",
      "salary",
      "duration",
      "overview",
      "howToApply",
      "extraDetails",
      "officialLink",
      "deadline",
    ];

    optionalFields.forEach((field) => {
      if (!data[field]) data[field] = null;
    });

    // IMAGE
    if (formData.get("image") && formData.get("image").size > 0) {
      const uploadResult = await uploadImage(formData.get("image"));
      data.image = uploadResult.secure_url;
    }

    const updated = await prisma.scholarship.update({
      where: { id },
      data: {
        title: data.title,
        status: data.status,
        category: data.category || "SCHOLARSHIP",

        // ====================
        // GUIDE SAFE UPDATE
        // ====================
        country: isGuide ? null : data.country,
        university: isGuide ? null : data.university,
        organization: isGuide ? null : data.organization,
        degree: isGuide ? null : data.degree,

        fundingType: isGuide ? null : data.fundingType,
        amount: isGuide ? null : data.amount,
        salary: isGuide ? null : data.salary,
        duration: isGuide ? null : data.duration,

        deadline: isGuide
          ? null
          : data.deadline
          ? new Date(data.deadline)
          : null,

        overview: data.overview,

        eligibility: isGuide ? [] : data.eligibility || [],
        eligibleCountries: isGuide ? [] : data.eligibleCountries || [],
        benefits: isGuide ? [] : data.benefits || [],
        requirements: isGuide ? [] : data.requirements || [],

        howToApply: isGuide ? null : data.howToApply,
        extraDetails: isGuide ? null : data.extraDetails,
        officialLink: isGuide ? null : data.officialLink,

        trending: isGuide ? false : data.trending,
        popular: isGuide ? false : data.popular,

        image: data.image || undefined,
      },
    });

    revalidatePath("/admin/scholarships");
    return updated;
  } catch (error) {
    console.error("Error updating scholarship:", error);
    throw new Error("Failed to update scholarship");
  }
}

// ================================
// DELETE
// ================================
export async function deleteScholarship(id) {
  await prisma.scholarship.delete({
    where: { id },
  });

  revalidatePath("/admin/scholarships");
}


export async function subscribeNewsletter(email) {
  if (!email) {
    return { success: false, message: "Email is required" };
  }

  const existing = await prisma.subscriber.findUnique({
    where: { email },
  });

  if (existing) {
    return { success: false, message: "You're already subscribed" };
  }

  await prisma.subscriber.create({
    data: { email },
  });

  return { success: true, message: "Subscribed successfully 🎉" };
}