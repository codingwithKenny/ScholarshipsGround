"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/app/admin/(dashboard)/scholarships/action";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubscribe() {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await subscribeNewsletter(email);

      setMessage(res?.message || "Subscribed successfully!");
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-950 to-teal-600 text-white my-10 rounded-2xl text-center p-8 shadow-lg border border-white/10">

  {/* TITLE */}
  <h3 className="text-xl md:text-2xl font-bold mb-2">
    Never Miss a Scholarship Deadline 🚀
  </h3>

  {/* SUBTITLE */}
  <p className="text-sm md:text-base text-white/80 mb-6 max-w-md mx-auto">
    Get fully funded opportunities before they close. Join 10,000+ students already subscribed.
  </p>

  {/* INPUT + BUTTON */}
  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">

   <input
  type="email"
  placeholder="Enter your email address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full sm:w-72 px-4 py-3 rounded-lg text-gray-900 bg-white/95 border border-white/30 shadow-md outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition"
/>

    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:scale-105 transition disabled:opacity-50"
    >
      {loading ? "Subscribing..." : "Subscribe"}
    </button>
  </div>

  {/* MESSAGE */}
  {message && (
    <p className="mt-4 text-sm text-white/90">
      {message}
    </p>
  )}
</div>
  );
}