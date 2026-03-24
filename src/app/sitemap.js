import prisma from "@/lib/prisma";
export default async function sitemap() {
  const baseUrl = "https://scholarshipground.com";

  const scholarships = await prisma.scholarship.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      slug: true,
      createdAt: true,
    },
  });

  const scholarshipPages = scholarships.map((scholarship) => ({
    url: `${baseUrl}/scholarships/${scholarship.slug}`,
    lastModified: scholarship.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/scholarships`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...scholarshipPages,
  ];
}