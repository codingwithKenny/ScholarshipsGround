import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppCommunity from "./components/whatsapp";
import prisma from "@/lib/prisma";

export default async function Home() {
  // Fetch latest scholarships
  const scholarships = await prisma.scholarship.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  // Trending scholarships
  const trending = await prisma.scholarship.findMany({
    where: { status: "PUBLISHED", trending: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Popular scholarships (highest views)
  const popular = await prisma.scholarship.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { views: "desc" },
    take: 5,
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-teal-50 py-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute bg-blue-200/20 w-72 h-72 rounded-full -top-16 -left-16 animate-pulse-slow"></div>
          <div className="absolute bg-teal-200/20 w-96 h-96 rounded-full -bottom-32 -right-32 animate-pulse-slow"></div>
          <div className="absolute bg-yellow-200/20 w-48 h-48 rounded-full top-1/2 left-1/4 animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Discover Scholarships Worldwide
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Verified undergraduate, masters, and PhD scholarships from trusted institutions globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full px-4 sm:px-0">
            <input
              type="text"
              placeholder="Search scholarships..."
              className="flex-1 px-5 py-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md"
            />
            <button className="bg-gradient-to-r from-blue-950 to-teal-500 px-6 py-4 rounded-lg font-semibold shadow-lg hover:scale-105 transition text-white">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Scholarships */}
 <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
  <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
    Featured Scholarships
  </h2>

  {/* Grid: 3 cards per row on md+ screens */}
  <div className="grid md:grid-cols-3 gap-6">
    {scholarships.map((sch) => (
      <div
        key={sch.id}
        className="flex bg-white  rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
      >
        {/* Left: Image */}
        <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
          <img
            src={sch.image || "/default-scholarship.jpg"}
            alt={sch.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right: Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs text-gray-900">
              {sch.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1 truncate">
              {sch.country} | {sch.degree}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              <span className="font-semibold">Deadline:</span>{" "}
              {new Date(sch.deadline).toLocaleDateString()}
            </p>
           <p className="text-xs text-gray-500 mt-1">
  <span className="font-semibold">Posted:</span>{" "}
  {new Date(sch.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>
          </div>

          <div className="mt-3">
            <Link
              href={`/scholarships/${sch.slug}`}
              className="inline-block bg-gradient-to-r from-blue-950 to-teal-500 px-4 py-2 rounded-full text-white text-sm shadow hover:scale-105 transition"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Load More Button */}
  <div className="mt-8 text-center">
    <button className="bg-gradient-to-r from-blue-950 to-teal-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:scale-105 transition">
      Load More
    </button>
  </div>
</section>

      {/* Community & Trending / Popular */}
      

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">1. Search</h3>
              <p className="text-gray-700">Find scholarships by degree, country, or funding type.</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">2. Review</h3>
              <p className="text-gray-700">Check eligibility, benefits, and deadlines carefully before applying.</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">3. Apply</h3>
              <p className="text-gray-700">Use the direct application link to submit your documents and apply.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Check Scholarship Status */}
      <section id="status" className="py-20 px-6 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Check Scholarship Status</h2>
          <p className="text-gray-700 mb-8">
            Enter a scholarship name to see if results are out or applications are open.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="text"
              placeholder="Enter scholarship name..."
              className="flex-1 px-5 py-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition"
            />
            <button className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform text-white">
              Check
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* WhatsApp / Community */}
        <div className="lg:col-span-1">
          <WhatsAppCommunity />
        </div>

        {/* Trending Scholarships */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">🔥 Trending Scholarships</h3>
          <ul className="space-y-2 text-sm">
            {trending.map((sch) => (
              <li key={sch.id}>
                <Link href={`/scholarships/${sch.slug}`} className="hover:text-blue-600 transition">
                  {sch.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/scholarships?trending=true"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
          >
            Load More →
          </Link>
        </div>

        {/* Popular Scholarships */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">⭐ Popular Scholarships</h3>
          <ul className="space-y-2 text-sm">
            {popular.map((sch) => (
              <li key={sch.id}>
                <Link href={`/scholarships/${sch.slug}`} className="hover:text-blue-600 transition">
                  {sch.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/scholarships?sort=popular"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
          >
            Load More →
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link href="/scholarships?degree=BSc" className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition transform border-l-4 border-teal-400">
            <p className="font-semibold text-gray-900">Undergraduate</p>
          </Link>
          <Link href="/scholarships?degree=MSc" className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition transform border-l-4 border-teal-400">
            <p className="font-semibold text-gray-900">Masters</p>
          </Link>
          <Link href="/scholarships?degree=PhD" className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition transform border-l-4 border-teal-400">
            <p className="font-semibold text-gray-900">PhD</p>
          </Link>
          <Link href="/scholarships?filter=Fully Funded" className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition transform border-l-4 border-green-400">
            <p className="font-semibold text-gray-900">Fully Funded</p>
          </Link>
          <Link href="/scholarships?filter=Partial Funding" className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition transform border-l-4 border-green-400">
            <p className="font-semibold text-gray-900">Partial Funding</p>
          </Link>
          <Link href="/scholarships?country=Europe" className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition transform border-l-4 border-blue-400">
            <p className="font-semibold text-gray-900">Study in Europe</p>
          </Link>
          <Link href="/scholarships?country=USA" className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition transform border-l-4 border-blue-400">
            <p className="font-semibold text-gray-900">Study in USA</p>
          </Link>
          <Link href="/scholarships?country=Canada" className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition transform border-l-4 border-blue-400">
            <p className="font-semibold text-gray-900">Study in Canada</p>
          </Link>
        </div>
      </section>

      {/* Top Destinations */}
      <section id="top-countries" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">Top Scholarship Destinations</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {["USA", "UK", "Germany", "Canada"].map((country, i) => (
              <div key={i} className="bg-gray-50 shadow-lg rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition transform">
                <p className="font-semibold text-gray-900">{country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <p className="text-gray-700 mb-4">"Thanks to ScholarshipGround, I received a fully funded masters scholarship in Germany!"</p>
              <span className="font-semibold text-gray-900">– Jane Doe</span>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <p className="text-gray-700 mb-4">"This platform helped me find the perfect scholarship for my PhD in the USA."</p>
              <span className="font-semibold text-gray-900">– John Smith</span>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <p className="text-gray-700 mb-4">"Easy to use, accurate, and reliable. Got my dream scholarship!"</p>
              <span className="font-semibold text-gray-900">– Aisha Bello</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-20 px-6 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Stay Updated!</h2>
          <p className="text-gray-700 mb-8">Subscribe to our newsletter to get the latest scholarships directly in your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input type="email" placeholder="Enter your email..." className="flex-1 px-5 py-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition" />
            <button className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform text-white">Subscribe</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">About ScholarshipGround</h2>
          <p className="text-gray-700 text-lg md:text-xl">
            ScholarshipGround provides verified global scholarship opportunities
            for students seeking undergraduate, masters, and doctoral funding.
            We link directly to official sources to ensure accuracy and trust.
          </p>
        </div>
      </section>
    </div>
  );
}