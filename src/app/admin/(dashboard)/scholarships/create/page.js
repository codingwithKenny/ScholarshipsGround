"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createScholarship } from "../action";

export default function CreateScholarship() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    category: "SCHOLARSHIP",
    country: "",
    university: "",
    organization: "",
    degree: "",
    fundingType: "FULLY_FUNDED",
    deadline: "",
    overview: "",
    eligibility: "",
    eligibleCountries: "",
    benefits: "",
    requirements: "",
    howToApply: "",
    extraDetails: "",
    officialLink: "",
    status: "DRAFT",
    featured: false,
    trending: false,
  });

  const [imageFile, setImageFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) formData.append("image", imageFile);

    await createScholarship(formData);
    router.push("/admin/scholarships");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-950 to-teal-500 p-8 rounded-2xl text-white shadow-lg">
        <h1 className="text-3xl font-bold">Create Opportunity</h1>
        <p className="opacity-90 mt-2">
          Add a new opportunity to the platform
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-8"
      >
        {/* BASIC INFO */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Basic Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">

            <input
              className="input"
              placeholder="Title"
              required
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <select
              className="input"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="SCHOLARSHIP">Scholarship</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="GRANT">Grant</option>
              <option value="FELLOWSHIP">Fellowship</option>
              <option value="ENTREPRENEURSHIP">Entrepreneurship</option>
              <option value="TRAINING">Training</option>
              <option value="JOB">Job</option>
            </select>

            <input
              className="input"
              placeholder="Country"
              required
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />

            {/* Conditional: Scholarship → University / Degree */}
            {form.category === "SCHOLARSHIP" && (
              <>
                <input
                  className="input"
                  placeholder="University (Optional)"
                  onChange={(e) => setForm({ ...form, university: e.target.value })}
                />
                <input
                  className="input"
                  placeholder="Degree (Bachelors / Masters / PhD)"
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
                />
              </>
            )}

            {/* Conditional: Other categories → Organization */}
            {form.category !== "SCHOLARSHIP" && (
              <input
                className="input"
                placeholder="Organization (Optional)"
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
              />
            )}

            <select
              className="input"
              onChange={(e) => setForm({ ...form, fundingType: e.target.value })}
            >
              <option value="FULLY_FUNDED">Fully Funded</option>
              <option value="PARTIALLY_FUNDED">Partially Funded</option>
              <option value="TUITION_ONLY">Tuition Only</option>
              <option value="SELF_FUNDED">Self Funded</option>
            </select>

            <input
              type="date"
              className="input"
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
          </div>
        </div>

        {/* OVERVIEW */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Overview</h2>
          <textarea
            rows="4"
            className="textarea"
            placeholder="Short overview"
            onChange={(e) => setForm({ ...form, overview: e.target.value })}
          />
        </div>

        {/* ELIGIBILITY */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Eligibility</h2>
          <textarea
            rows="4"
            className="textarea"
            placeholder="Eligibility requirements (comma separated)"
            onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
          />
          <input
            className="input mt-4"
            placeholder="Eligible Countries (Nigeria, Ghana...)"
            onChange={(e) => setForm({ ...form, eligibleCountries: e.target.value })}
          />
        </div>

        {/* BENEFITS */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Benefits</h2>
          <textarea
            className="textarea"
            placeholder="Benefits (comma separated)"
            onChange={(e) => setForm({ ...form, benefits: e.target.value })}
          />
        </div>

        {/* REQUIREMENTS */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Requirements</h2>
          <textarea
            className="textarea"
            placeholder="CV, Transcript, etc."
            onChange={(e) => setForm({ ...form, requirements: e.target.value })}
          />
        </div>

        {/* HOW TO APPLY */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">How To Apply</h2>
          <textarea
            rows="4"
            className="textarea"
            placeholder="Explain the application process"
            onChange={(e) => setForm({ ...form, howToApply: e.target.value })}
          />
        </div>

        {/* EXTRA DETAILS */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Extra Details</h2>
          <textarea
            rows="4"
            className="textarea"
            placeholder="Any extra information for this opportunity"
            onChange={(e) => setForm({ ...form, extraDetails: e.target.value })}
          />
        </div>

        {/* OFFICIAL LINK */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Official Link</h2>
          <input
            className="input"
            placeholder="Official link"
            onChange={(e) => setForm({ ...form, officialLink: e.target.value })}
          />
        </div>

        {/* IMAGE */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Image</h2>
          <input
            type="file"
            accept="image/*"
            className="input"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              className="mt-4 rounded-xl shadow w-full max-h-64 object-cover"
            />
          )}
        </div>

        {/* FEATURED / TRENDING / STATUS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-900">Featured</label>
            <input
              type="checkbox"
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-900">Trending</label>
            <input
              type="checkbox"
              onChange={(e) => setForm({ ...form, trending: e.target.checked })}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-900">Status</label>
            <select
              className="input w-full"
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Publish</option>
            </select>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-950 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Create Opportunity
          </button>
        </div>
      </form>
    </div>
  );
}