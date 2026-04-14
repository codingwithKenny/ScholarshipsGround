// "use server";

// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import { revalidatePath } from "next/cache";

// function generateSlug(title) {
//   return title
//     .toLowerCase()
//     .replace(/[^\w\s]/gi, "")
//     .replace(/\s+/g, "-");
// }

// export async function createScholarship(formData) {

//   const title = formData.get("title");
//   const country = formData.get("country");
//   const university = formData.get("university");
//   const degree = formData.get("degree");
//   const fundingType = formData.get("fundingType");
//   const deadline = formData.get("deadline");

//   const overview = formData.get("overview");

//   const eligibility = formData.get("eligibility");
//   const eligibleCountries = formData.get("eligibleCountries");

//   const benefits = formData.get("benefits");
//   const requirements = formData.get("requirements");

//   const howToApply = formData.get("howToApply");
//   const officialLink = formData.get("officialLink");

//   const status = formData.get("status");

//   const image = formData.get("image");

//   let imageUrl = "";

//   if (image && image.size > 0) {

//     const bytes = await image.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadResult = await new Promise((resolve, reject) => {

//       cloudinary.uploader.upload_stream(
//         { folder: "scholarships" },
//         (error, result) => {
//           if (error) reject(error);
//           resolve(result);
//         }
//       ).end(buffer);

//     });

//     imageUrl = uploadResult.secure_url;
//   }

//   const slug = generateSlug(title);

//   await prisma.scholarship.create({
//     data: {
//       title,
//       slug,
//       country,
//       university,
//       degree,
//       fundingType,
//       deadline: new Date(deadline),

//       overview,

//       eligibility: eligibility.split(",").map(i => i.trim()),
//       eligibleCountries: eligibleCountries.split(",").map(i => i.trim()),

//       benefits: benefits.split(",").map(i => i.trim()),
//       requirements: requirements.split(",").map(i => i.trim()),

//       howToApply,
//       officialLink,

//       status,

//       image: imageUrl,
//     },
//   });

//   revalidatePath("/admin/scholarships");
// }

// export async function deleteScholarship(id) {

//   await prisma.scholarship.delete({
//     where: { id },
//   });

//   revalidatePath("/admin/scholarships");

// }

// export async function updateScholarship(id, formData) {

//   const title = formData.get("title");
//   const country = formData.get("country");
//   const university = formData.get("university");
//   const degree = formData.get("degree");
//   const fundingType = formData.get("fundingType");
//   const deadline = formData.get("deadline");

//   const overview = formData.get("overview");

//   const eligibility = formData.get("eligibility");
//   const eligibleCountries = formData.get("eligibleCountries");

//   const benefits = formData.get("benefits");
//   const requirements = formData.get("requirements");

//   const howToApply = formData.get("howToApply");
//   const officialLink = formData.get("officialLink");

//   const status = formData.get("status");

//   const image = formData.get("image");

//   let imageUrl;

//   if (image && image.size > 0) {

//     const bytes = await image.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadResult = await new Promise((resolve, reject) => {

//       cloudinary.uploader.upload_stream(
//         { folder: "scholarships" },
//         (error, result) => {
//           if (error) reject(error);
//           resolve(result);
//         }
//       ).end(buffer);

//     });

//     imageUrl = uploadResult.secure_url;

//   }

//   await prisma.scholarship.update({
//     where: { id },
//     data: {

//       title,
//       country,
//       university,
//       degree,
//       fundingType,
//       deadline: new Date(deadline),

//       overview,

//       eligibility: eligibility.split(",").map(i => i.trim()),
//       eligibleCountries: eligibleCountries.split(",").map(i => i.trim()),

//       benefits: benefits.split(",").map(i => i.trim()),
//       requirements: requirements.split(",").map(i => i.trim()),

//       howToApply,
//       officialLink,

//       status,

//       ...(imageUrl && { image: imageUrl }),

//     },
//   });

//   revalidatePath("/admin/scholarships");

// }

"use server";

import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

// Slug generator
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
}

// Helper to parse textarea inputs into arrays
function parseList(input) {
  if (!input) return [];
  return input
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

// ================================
// CREATE SCHOLARSHIP / OPPORTUNITY
// ================================
export async function createScholarship(formData) {
  const image = formData.get("image");
  let imageUrl = "";

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "scholarships" }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    imageUrl = uploadResult.secure_url;
   
  }
    // ✅ FIXED DEADLINE LOGIC
  const noDeadline = formData.get("noDeadline") === "true";
  const deadlineValue = formData.get("deadline");

  const deadline =
    noDeadline
      ? null
      : deadlineValue
      ? new Date(deadlineValue)
      : null;

  await prisma.scholarship.create({
    data: {
      title: formData.get("title"),
      slug: generateSlug(formData.get("title")),

      category: formData.get("category") || "SCHOLARSHIP",
      status: formData.get("status"),

      country: formData.get("country") || null,
      university: formData.get("university") || null,
      organization: formData.get("organization") || null,
      degree: formData.get("degree") || null,

      fundingType: formData.get("fundingType") || null,
       deadline,


      overview: formData.get("overview") || null,

      eligibility: parseList(formData.get("eligibility")),
      eligibleCountries: parseList(formData.get("eligibleCountries")),
      benefits: parseList(formData.get("benefits")),
      requirements: parseList(formData.get("requirements")),

      howToApply: formData.get("howToApply") || null,
      extraDetails: formData.get("extraDetails") || null,

      officialLink: formData.get("officialLink") || null,

      // NEW FIELDS
      amount: formData.get("amount") || null,
      salary: formData.get("salary") || null,
      duration: formData.get("duration") || null,

      featured: formData.get("featured") === "on",
      trending: formData.get("trending") === "on",
      popular: formData.get("popular") === "on",

      image: imageUrl,
    },
  });

  revalidatePath("/admin/scholarships");
}

// ================================
// UPDATE SCHOLARSHIP / OPPORTUNITY
// ================================






// Helper to upload image to Cloudinary
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
// UPDATE SCHOLARSHIP / OPPORTUNITY
// ================================
export async function updateScholarship(id, formData) {
  try {
    // Convert FormData to JS object
    const data = Object.fromEntries(formData.entries());

    // Convert booleans
    data.trending = data.trending === "true" || data.trending === true;
    data.popular = data.popular === "true" || data.popular === true;

    // Convert arrays from textarea inputs
    data.eligibility = parseList(data.eligibility);
    data.eligibleCountries = parseList(data.eligibleCountries);
    data.benefits = parseList(data.benefits);
    data.requirements = parseList(data.requirements);

    // Handle optional fields
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

    // Handle image upload if a new image is selected
    if (formData.get("image") && formData.get("image").size > 0) {
      const imageFile = formData.get("image");
      const uploadResult = await uploadImage(imageFile);
      data.image = uploadResult.secure_url;
    }

    // Prisma update
    const updated = await prisma.scholarship.update({
      where: { id },
      data: {
        title: data.title,
        status: data.status, // draft → published works
        category: data.category || "SCHOLARSHIP",
        country: data.country,
        university: data.university,
        organization: data.organization,
        degree: data.degree,
        fundingType: data.fundingType,
        amount: data.amount,
        salary: data.salary,
        duration: data.duration,
        deadline: data.deadline ? new Date(data.deadline) : null,
        overview: data.overview,
        eligibility: data.eligibility || [],
        eligibleCountries: data.eligibleCountries || [],
        benefits: data.benefits || [],
        requirements: data.requirements || [],
        howToApply: data.howToApply,
        extraDetails: data.extraDetails,
        officialLink: data.officialLink,
        trending: data.trending,
        popular: data.popular,
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
// DELETE SCHOLARSHIP / OPPORTUNITY
// ================================
export async function deleteScholarship(id) {
  await prisma.scholarship.delete({
    where: { id },
  });

  revalidatePath("/admin/scholarships");
}