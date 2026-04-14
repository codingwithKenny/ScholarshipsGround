"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createScholarship } from "../action";
import RichMarkdownEditor from "@/app/components/RichMarkdownEditor";

export default function CreateOpportunity() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    category: "SCHOLARSHIP",
    country: "",
    university: "",
    organization: "",
    degree: "",
    fundingType: "",
    amount: "",
    salary: "",
    duration: "",
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
    noDeadline: false,
  });

  const [imageFile, setImageFile] = useState(null);

  const isScholarship = form.category === "SCHOLARSHIP";
  const isFellowship = form.category === "FELLOWSHIP";
  const isGrant = form.category === "GRANT";
  const isJob = form.category === "JOB";
  const isInternship = form.category === "INTERNSHIP";
  const isTraining = form.category === "TRAINING";

  const showFunding = isScholarship || isFellowship || isGrant;
  const showSalary = isJob;
  const showDuration = isInternship || isTraining;

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imageFile) formData.append("image", imageFile);
       formData.set("noDeadline", form.noDeadline);

    await createScholarship(formData);
    router.push("/admin/scholarships");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-500 p-8 rounded-2xl text-white">
        <h1 className="text-3xl font-bold">Create Opportunity</h1>
        <p className="opacity-90 mt-2">
          Add scholarships, internships, jobs, grants, and more
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-8">

        {/* BASIC INFO */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">

            <label className="flex flex-col">
              Title *
              <input
                className="input"
                placeholder="Opportunity Title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>

            <label className="flex flex-col">
              Category *
              <select
                className="input"
                value={form.category}
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
            </label>

            <label className="flex flex-col">
              Country *
              <input
                className="input"
                placeholder="Country"
                required
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </label>

            {/* Scholarship-specific fields */}
            {isScholarship && (
              <>
                <label className="flex flex-col">
                  University
                  <input
                    className="input"
                    placeholder="University Name"
                    value={form.university}
                    onChange={(e) => setForm({ ...form, university: e.target.value })}
                  />
                </label>

                <label className="flex flex-col">
                  Degree
                  <input
                    className="input"
                    placeholder="BSc, MSc, PhD..."
                    value={form.degree}
                    onChange={(e) => setForm({ ...form, degree: e.target.value })}
                  />
                </label>
              </>
            )}

            {/* Other categories */}
            {!isScholarship && (
              <label className="flex flex-col">
                Organization
                <input
                  className="input"
                  placeholder="Organization Name"
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                />
              </label>
            )}

            {/* Funding */}
            {showFunding && (
              <label className="flex flex-col">
                Funding Type
                <select
                  className="input"
                  value={form.fundingType}
                  onChange={(e) => setForm({ ...form, fundingType: e.target.value })}
                >
                  <option value="">Select Funding Type</option>
                  <option value="FULLY_FUNDED">Fully Funded</option>
                  <option value="PARTIALLY_FUNDED">Partially Funded</option>
                  <option value="TUITION_ONLY">Tuition Only</option>
                  <option value="SELF_FUNDED">Self Funded</option>
                </select>
              </label>
            )}

            {/* Grant Amount */}
            {isGrant && (
              <label className="flex flex-col">
                Amount
                <input
                  className="input"
                  placeholder="Grant Amount ($5000)"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
              </label>
            )}

            {/* Job Salary */}
            {showSalary && (
              <label className="flex flex-col">
                Salary
                <input
                  className="input"
                  placeholder="Salary ($60,000/year)"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                />
              </label>
            )}

            {/* Duration */}
            {showDuration && (
              <label className="flex flex-col">
                Duration
                <input
                  className="input"
                  placeholder="3 months, 6 months..."
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                />
              </label>
            )}

            {/* Deadline */}
           <label className="flex flex-col">
  Deadline

  <input
    type="date"
    className="input"
    value={form.deadline}
    disabled={form.noDeadline}
    onChange={(e) =>
      setForm({ ...form, deadline: e.target.value })
    }
  />

  <label className="flex items-center gap-2 mt-2 text-sm text-gray-600">
   <input
  type="checkbox"
  checked={form.noDeadline}
  onChange={(e) =>
    setForm((prev) => ({
      ...prev,
      noDeadline: e.target.checked,
      deadline: e.target.checked ? "" : prev.deadline,
    }))
  }
/>
    No specific deadline (Rolling / Always open)
  </label>

  <span className="text-xs text-gray-400 mt-1">
    Select a date OR mark as ongoing opportunity
  </span>
</label>
          </div>
        </div>

        {/* OVERVIEW */}
        <label className="flex flex-col">
          Overview
          <RichMarkdownEditor
  value={form.overview}
  onChange={(value) => setForm({ ...form, overview: value || "" })}
/>
        </label>

        {/* ELIGIBILITY */}
        <label className="flex flex-col">
          Eligibility
          <textarea
            className="textarea"
            placeholder="Eligibility criteria, one per line"
            value={form.eligibility}
            onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
          />
        </label>

        {/* Eligible Countries */}
        <label className="flex flex-col">
          Eligible Countries
          <textarea
            className="textarea"
            placeholder="Comma separated countries (e.g., Nigeria, Ghana)"
            value={form.eligibleCountries}
            onChange={(e) => setForm({ ...form, eligibleCountries: e.target.value })}
          />
        </label>

        {/* BENEFITS */}
        <label className="flex flex-col">
          Benefits
          <textarea
            className="textarea"
            placeholder="Benefits, one per line"
            value={form.benefits}
            onChange={(e) => setForm({ ...form, benefits: e.target.value })}
          />
        </label>

        {/* REQUIREMENTS */}
        <label className="flex flex-col">
          Requirements
          <textarea
            className="textarea"
            placeholder="Requirements, one per line"
            value={form.requirements}
            onChange={(e) => setForm({ ...form, requirements: e.target.value })}
          />
        </label>

        {/* HOW TO APPLY */}
        <label className="flex flex-col">
          How To Apply
          <RichMarkdownEditor
  value={form.howToApply}
  onChange={(value) => setForm({ ...form, howToApply: value || "" })}
/>
        </label>

        {/* EXTRA DETAILS */}
        <label className="flex flex-col">
          Extra Details
          <RichMarkdownEditor
  value={form.extraDetails}
  onChange={(value) =>
    setForm({ ...form, extraDetails: value || "" })
  }
/>
        </label>

        {/* OFFICIAL LINK */}
        <label className="flex flex-col">
          Official Link
          <input
            className="input"
            placeholder="https://official-link.com"
            value={form.officialLink}
            onChange={(e) => setForm({ ...form, officialLink: e.target.value })}
          />
        </label>

        {/* IMAGE */}
        <label className="flex flex-col">
  Image Upload
  <div
    className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition relative"
  >
    {imageFile ? (
      <img
        src={URL.createObjectURL(imageFile)}
        alt="Preview"
        className="max-h-40 object-contain rounded-md"
      />
    ) : (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 014-4h10a4 4 0 014 4v4H3v-4zM16 5l-4-4-4 4m4-4v16"
          />
        </svg>
        <p className="text-gray-500">Click or drag to upload an image</p>
      </>
    )}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImageFile(e.target.files[0])}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
  </div>
</label>

        {/* FLAGS */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.trending}
              onChange={(e) => setForm({ ...form, trending: e.target.checked })}
            />
            Trending
          </label>
        </div>

        {/* STATUS */}
        <label className="flex flex-col">
          Status
          <select
            className="input"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Publish</option>
          </select>
        </label>

        {/* SUBMIT */}
        <button className="bg-gradient-to-r from-blue-900 to-teal-500 text-white px-6 py-3 rounded-xl">
          Create Opportunity
        </button>
      </form>
    </div>
  );
}