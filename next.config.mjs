/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",  // Points to your API route that serves the sitemap
        permanent: true,
      },
    ];
  },
};

export default nextConfig;