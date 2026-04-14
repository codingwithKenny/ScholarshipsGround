import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic"; // ✅ THIS FIXES IT

export default async function sitemap() {
  const baseUrl = "https://www.scholarshipground.com";

  let scholarships = [];

  try {
    scholarships = await prisma.scholarship.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.error("Sitemap DB error:", error);
  }

  const scholarshipUrls = scholarships.map((sch) => ({
    url: `${baseUrl}/scholarships/${sch.slug}`,
    lastModified: sch.updatedAt,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...scholarshipUrls,
  ];
}