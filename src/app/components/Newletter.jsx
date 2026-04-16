"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/app/admin/(dashboard)/scholarships/action";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ HERE

  async function handleSubscribe() { // ✅ HERE
    setLoading(true);

    const res = await subscribeNewsletter(email);

    setMessage(res.message);
    setLoading(false);
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-green-50 to-teal-50">
             <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Stay Updated!</h2>
          <p className="text-gray-700 mb-8">Subscribe to our newsletter to get the latest scholarships directly in your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-5 py-4 rounded-lg w-full border border-black"
        />

        <button
          onClick={handleSubscribe}
          disabled={loading} // optional but good
          className=" bg-green-500 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>

        {message && (
          <p className="mt-3 text-sm text-red-700">{message}</p>
        )}
          </div>
        </div>

    </section>
  );
}