"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createScholarship } from "../action";

export default function CreateScholarship() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    country: "",
    university: "",
    degree: "",
    fundingType: "FULLY_FUNDED",
    deadline: "",
    overview: "",
    eligibility: "",
    eligibleCountries: "",
    benefits: "",
    requirements: "",
    howToApply: "",
    officialLink: "",
    status: "DRAFT",
  });

  const [imageFile, setImageFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("country", form.country);
    formData.append("university", form.university);
    formData.append("degree", form.degree);
    formData.append("fundingType", form.fundingType);
    formData.append("deadline", form.deadline);
    formData.append("overview", form.overview);
    formData.append("eligibility", form.eligibility);
    formData.append("eligibleCountries", form.eligibleCountries);
    formData.append("benefits", form.benefits);
    formData.append("requirements", form.requirements);
    formData.append("howToApply", form.howToApply);
    formData.append("officialLink", form.officialLink);
    formData.append("status", form.status);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await createScholarship(formData);

    router.push("/admin/scholarships");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-950 to-teal-500 p-8 rounded-2xl text-white shadow-lg">
        <h1 className="text-3xl font-bold">Create Scholarship</h1>
        <p className="opacity-90 mt-2">
          Add a new scholarship opportunity to the platform
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
              placeholder="Scholarship Title"
              required
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="Country"
              required
              onChange={(e) =>
                setForm({ ...form, country: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="University (Optional)"
              onChange={(e) =>
                setForm({ ...form, university: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="Degree (Bachelors / Masters / PhD)"
              required
              onChange={(e) =>
                setForm({ ...form, degree: e.target.value })
              }
            />

            <select
              className="input"
              onChange={(e) =>
                setForm({ ...form, fundingType: e.target.value })
              }
            >
              <option value="FULLY_FUNDED">Fully Funded</option>
              <option value="PARTIALLY_FUNDED">Partially Funded</option>
              <option value="TUITION_ONLY">Tuition Only</option>
              <option value="SELF_FUNDED">Self Funded</option>
            </select>

            <input
              type="date"
              className="input"
              required
              onChange={(e) =>
                setForm({ ...form, deadline: e.target.value })
              }
            />

          </div>
        </div>

        {/* OVERVIEW */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Scholarship Overview
          </h2>

          <textarea
            rows="4"
            className="textarea"
            placeholder="Short overview of the scholarship"
            onChange={(e) =>
              setForm({ ...form, overview: e.target.value })
            }
          />
        </div>

        {/* ELIGIBILITY */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Eligibility
          </h2>

          <textarea
            rows="4"
            className="textarea"
            placeholder="Eligibility requirements (comma separated)"
            onChange={(e) =>
              setForm({ ...form, eligibility: e.target.value })
            }
          />

          <input
            className="input mt-4"
            placeholder="Eligible Countries (Nigeria, Ghana, India...)"
            onChange={(e) =>
              setForm({ ...form, eligibleCountries: e.target.value })
            }
          />
        </div>

        {/* BENEFITS */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Scholarship Benefits
          </h2>

          <textarea
            className="textarea"
            placeholder="Benefits (comma separated)"
            onChange={(e) =>
              setForm({ ...form, benefits: e.target.value })
            }
          />
        </div>

        {/* REQUIREMENTS */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Application Requirements
          </h2>

          <textarea
            className="textarea"
            placeholder="Requirements (CV, Transcript...)"
            onChange={(e) =>
              setForm({ ...form, requirements: e.target.value })
            }
          />
        </div>

        {/* HOW TO APPLY */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            How To Apply
          </h2>

          <textarea
            rows="4"
            className="textarea"
            placeholder="Explain the application process"
            onChange={(e) =>
              setForm({ ...form, howToApply: e.target.value })
            }
          />
        </div>

        {/* OFFICIAL LINK */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Official Application Link
          </h2>

          <input
            className="input"
            placeholder="Official scholarship link"
            onChange={(e) =>
              setForm({ ...form, officialLink: e.target.value })
            }
          />
        </div>

        {/* IMAGE */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Scholarship Image
          </h2>

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

        {/* STATUS */}
        <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">

          <div>
            <h3 className="font-semibold text-gray-900">
              Publish Status
            </h3>
            <p className="text-sm text-gray-500">
              Choose whether this scholarship is visible
            </p>
          </div>

          <select
            className="input w-40"
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Publish</option>
          </select>

        </div>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-950 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Create Scholarship
          </button>
        </div>

      </form>
    </div>
  );
}