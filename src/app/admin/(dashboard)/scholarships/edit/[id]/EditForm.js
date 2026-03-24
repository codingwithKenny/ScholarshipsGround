"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateScholarship } from "../../action";

export default function EditForm({ scholarship }) {
  const router = useRouter();

  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
  ...scholarship,
  deadline: scholarship.deadline.toISOString().split("T")[0],

  eligibility: scholarship.eligibility.join("\n"),
  eligibleCountries: scholarship.eligibleCountries.join("\n"),
  benefits: scholarship.benefits.join("\n"),
  requirements: scholarship.requirements.join("\n"),
});

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("country", form.country);
    formData.append("university", form.university || "");
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

    await updateScholarship(scholarship.id, formData);

    router.push("/admin/scholarships");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Scholarship
        </h1>
        <p className="text-gray-500 mt-1">
          Update scholarship details and publish status
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="label">Title</label>
            <input
              value={form.title}
              className="input-modern"
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
          </div>

          {/* Country + University */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="label">Country</label>
              <input
                value={form.country}
                className="input-modern"
                onChange={(e) =>
                  setForm({ ...form, country: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">University</label>
              <input
                value={form.university || ""}
                className="input-modern"
                onChange={(e) =>
                  setForm({ ...form, university: e.target.value })
                }
              />
            </div>

          </div>

          {/* Degree + Funding */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="label">Degree</label>
              <input
                value={form.degree}
                className="input-modern"
                onChange={(e) =>
                  setForm({ ...form, degree: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">Funding Type</label>

              <select
                value={form.fundingType}
                className="input-modern"
                onChange={(e) =>
                  setForm({ ...form, fundingType: e.target.value })
                }
              >
                <option value="FULLY_FUNDED">Fully Funded</option>
                <option value="PARTIALLY_FUNDED">Partially Funded</option>
                <option value="TUITION_ONLY">Tuition Only</option>
                <option value="SELF_FUNDED">Self Funded</option>
              </select>

            </div>

          </div>

          {/* Deadline */}
          <div>
            <label className="label">Deadline</label>
            <input
              type="date"
              value={form.deadline}
              className="input-modern"
              onChange={(e) =>
                setForm({ ...form, deadline: e.target.value })
              }
            />
          </div>

          {/* Overview */}
          <div>
            <label className="label">Overview</label>

            <textarea
              rows="4"
              value={form.overview || ""}
              className="textarea-modern"
              onChange={(e) =>
                setForm({ ...form, overview: e.target.value })
              }
            />
          </div>

          {/* Eligibility */}
          <div>
            <label className="label">Eligibility</label>

            <textarea
              value={form.eligibility}
              rows="4"
              className="textarea-modern"
              onChange={(e) =>
                setForm({ ...form, eligibility: e.target.value })
              }
            />
          </div>

          {/* Eligible Countries */}
          <div>
            <label className="label">Eligible Countries</label>

            <input
              value={form.eligibleCountries}
              className="input-modern"
              placeholder="Nigeria, Ghana, India..."
              onChange={(e) =>
                setForm({
                  ...form,
                  eligibleCountries: e.target.value,
                })
              }
            />
          </div>

          {/* Benefits */}
          <div>
            <label className="label">Benefits</label>

            <textarea
              rows="4"
              value={form.benefits}
              className="textarea-modern"
              onChange={(e) =>
                setForm({ ...form, benefits: e.target.value })
              }
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="label">Requirements</label>

            <textarea
              value={form.requirements}
              className="textarea-modern"
              onChange={(e) =>
                setForm({
                  ...form,
                  requirements: e.target.value,
                })
              }
            />
          </div>

          {/* How To Apply */}
          <div>
            <label className="label">How To Apply</label>

            <textarea
              rows="4"
              value={form.howToApply || ""}
              className="textarea-modern"
              onChange={(e) =>
                setForm({ ...form, howToApply: e.target.value })
              }
            />
          </div>

          {/* Official Link */}
          <div>
            <label className="label">Official Application Link</label>

            <input
              value={form.officialLink || ""}
              className="input-modern"
              onChange={(e) =>
                setForm({ ...form, officialLink: e.target.value })
              }
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="label">Scholarship Image</label>

            <input
              type="file"
              accept="image/*"
              className="input-modern"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            {!imageFile && form.image && (
              <img
                src={form.image}
                className="mt-4 rounded-xl w-full max-h-56 object-cover"
              />
            )}

            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                className="mt-4 rounded-xl w-full max-h-56 object-cover"
              />
            )}
          </div>

          {/* Status */}
          <div>
            <label className="label">Status</label>

            <select
              value={form.status}
              className="input-modern"
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-950 to-teal-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition"
            >
              Update Scholarship
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}