import Navbar from "@/app/components/Navbar";

export async function generateMetadata() {
  return {
    title: "About Us | ScholarshipGround",
    description:
      "Learn about ScholarshipGround, your trusted platform for verified global scholarships, internships, and study opportunities.",

    alternates: {
      canonical: "https://www.scholarshipground.com/about",
    },
  };
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />

      <section className="mt-24 py-20 px-6 max-w-5xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About ScholarshipGround
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            ScholarshipGround is a trusted platform that helps students discover
            verified global scholarships, internships, fellowships, and study opportunities
            from official sources.
          </p>
        </div>

        {/* MISSION */}
        <div className="bg-white p-8 rounded-2xl shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-4">🎯 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to make education opportunities accessible to everyone,
            regardless of location or financial background. We simplify the process
            of finding and applying for scholarships worldwide.
          </p>
        </div>

        {/* WHAT WE DO */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-3">🔍 Verified Opportunities</h2>
            <p className="text-gray-600">
              We only share opportunities from official and trusted sources to ensure accuracy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-3">🌍 Global Coverage</h2>
            <p className="text-gray-600">
              Scholarships from USA, UK, Canada, Europe, Asia, and more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-3">📚 Easy Guidance</h2>
            <p className="text-gray-600">
              We break down requirements so students can apply with confidence.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-3">⚡ Fast Updates</h2>
            <p className="text-gray-600">
              New opportunities are published regularly to keep you ahead.
            </p>
          </div>

        </div>

        {/* WHY TRUST US */}
        <div className="bg-gradient-to-r from-blue-950 to-teal-500 text-white p-10 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Why Students Trust Us</h2>
          <p className="max-w-3xl mx-auto text-sm md:text-base">
            We do not publish fake or outdated scholarships. Every listing is checked,
            verified, and linked to official application pages.
          </p>
        </div>

      </section>
    </div>
  );
}