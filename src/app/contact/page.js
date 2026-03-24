"use client";

import Navbar from "@/app/components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />

      <section className="mt-24 py-20 px-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900">
          Contact Us
        </h1>
        <p className="text-gray-700 text-center mb-8">
          Have questions or suggestions? Fill out the form below and we will get back to you.
        </p>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
          />
          <textarea
            placeholder="Your Message"
            className="px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm resize-none"
            rows={5}
          ></textarea>
          <button className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4 rounded-lg font-semibold text-white shadow hover:scale-105 transition-transform">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}