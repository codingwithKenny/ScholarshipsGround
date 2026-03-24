"use client";

import Navbar from "@/app/components/Navbar";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />

      <section className="mt-24 py-20 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          About ScholarshipGround
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          ScholarshipGround provides verified global scholarship opportunities
          for students seeking undergraduate, masters, and doctoral funding.
          We link directly to official sources to ensure accuracy and trust.
        </p>
        <p className="text-lg md:text-xl text-gray-700">
          Our mission is to make it easy for students worldwide to find
          scholarships, understand requirements, and apply confidently.
        </p>
      </section>
    </div>
  );
}