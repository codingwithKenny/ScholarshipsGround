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

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
}

function parseList(input) {
  if (!input) return [];
  return input
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

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

  await prisma.scholarship.create({
    data: {
      title: formData.get("title"),
      slug: generateSlug(formData.get("title")),
      country: formData.get("country"),
      university: formData.get("university"),
      degree: formData.get("degree"),
      fundingType: formData.get("fundingType"),
      deadline: new Date(formData.get("deadline")),

      overview: formData.get("overview"),

      eligibility: parseList(formData.get("eligibility")),
      eligibleCountries: parseList(formData.get("eligibleCountries")),
      benefits: parseList(formData.get("benefits")),
      requirements: parseList(formData.get("requirements")),

      howToApply: formData.get("howToApply"),
      officialLink: formData.get("officialLink"),
      status: formData.get("status"),

      // ✅ New fields
      category: formData.get("category") || "SCHOLARSHIP",
      extraDetails: formData.get("extraDetails") || "",
      trending: formData.get("trending") === "true",
      popular: formData.get("popular") === "true",

      image: imageUrl,
    },
  });

  revalidatePath("/admin/scholarships");
}

export async function updateScholarship(id, formData) {
  const image = formData.get("image");
  let imageUrl;

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

  await prisma.scholarship.update({
    where: { id },
    data: {
      title: formData.get("title"),
      country: formData.get("country"),
      university: formData.get("university"),
      degree: formData.get("degree"),
      fundingType: formData.get("fundingType"),
      deadline: new Date(formData.get("deadline")),

      overview: formData.get("overview"),

      eligibility: parseList(formData.get("eligibility")),
      eligibleCountries: parseList(formData.get("eligibleCountries")),
      benefits: parseList(formData.get("benefits")),
      requirements: parseList(formData.get("requirements")),

      howToApply: formData.get("howToApply"),
      officialLink: formData.get("officialLink"),
      status: formData.get("status"),

      // ✅ New fields
      category: formData.get("category") || "SCHOLARSHIP",
      extraDetails: formData.get("extraDetails") || "",
      trending: formData.get("trending") === "true",
      popular: formData.get("popular") === "true",

      ...(imageUrl && { image: imageUrl }),
    },
  });

  revalidatePath("/admin/scholarships");
}

export async function deleteScholarship(id) {

await prisma.scholarship.delete({
   where: { id },
 });

 revalidatePath("/admin/scholarships");

 }