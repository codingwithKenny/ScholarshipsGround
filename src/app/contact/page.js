"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import { sendContact } from "@/app/actions/contact";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const res = await sendContact(formData);

    setResponse(res.message);
    setLoading(false);

    if (res.success) e.target.reset();
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />

      <section className="mt-24 py-20 px-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            className="input-modern"
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            className="input-modern"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            className="textarea-modern"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4 rounded-lg text-white"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {response && (
          <p className="mt-4 text-center text-sm text-green-600">
            {response}
          </p>
        )}
      </section>
    </div>
  );
}