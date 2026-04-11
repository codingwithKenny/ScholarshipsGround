import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ✅ This Fixes It

export default async function sitemap() {
  const baseUrl = "https://scholarshipground.com";

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

  const sitemapUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...scholarships.map((sch) => ({
      url: `${baseUrl}/scholarships/${sch.slug}`,
      lastModified: sch.updatedAt,
    })),
  ];

  const xmlUrls = sitemapUrls
    .map(
      (entry) => `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${entry.lastModified.toISOString()}</lastmod>
    </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xmlUrls}
  </urlset>`;

  return NextResponse.json(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}