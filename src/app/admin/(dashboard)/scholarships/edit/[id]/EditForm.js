"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateScholarship } from "../../action";
import RichMarkdownEditor from "@/app/components/RichMarkdownEditor";

export default function EditForm({ scholarship }) {
  const router = useRouter();

  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    ...scholarship,
    deadline: scholarship.deadline
      ? new Date(scholarship.deadline).toISOString().split("T")[0]
      : "",
    eligibility: scholarship.eligibility.join("\n"),
    eligibleCountries: scholarship.eligibleCountries.join("\n"),
    benefits: scholarship.benefits.join("\n"),
    requirements: scholarship.requirements.join("\n"),
  });

  const isScholarship = form.category === "SCHOLARSHIP";
  const isFellowship = form.category === "FELLOWSHIP";
  const isGrant = form.category === "GRANT";
  const isJob = form.category === "JOB";
  const isInternship = form.category === "INTERNSHIP";
  const isTraining = form.category === "TRAINING";
  const isGuide = form.category === "GUIDE"; // ✅ added

  const showFunding =
    !isGuide && (isScholarship || isFellowship || isGrant);
  const showSalary = !isGuide && isJob;
  const showDuration =
    !isGuide && (isInternship || isTraining);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    if (imageFile) formData.append("image", imageFile);

    await updateScholarship(scholarship.id, formData);
    router.push("/admin/scholarships");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-500 p-8 rounded-2xl text-white">
        <h1 className="text-3xl font-bold">Edit Opportunity</h1>
        <p className="opacity-90 mt-2">
          Update opportunity details and publish status
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-8"
      >
        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* ALWAYS SHOW */}
          <div>
            <label className="label">Title</label>
            <input
              className="input-modern"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="label">Category</label>
            <select
              className="input-modern"
              value={form.category || ""}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option value="SCHOLARSHIP">Scholarship</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="GRANT">Grant</option>
              <option value="FELLOWSHIP">Fellowship</option>
              <option value="ENTREPRENEURSHIP">Entrepreneurship</option>
              <option value="TRAINING">Training</option>
              <option value="JOB">Job</option>
              <option value="GUIDE">Guide</option>
            </select>
          </div>

          {/* HIDE FOR GUIDE */}
          {!isGuide && (
            <>
              <div>
                <label className="label">Country</label>
                <input
                  className="input-modern"
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="label">
                  {isScholarship ? "University" : "Organization"}
                </label>
                <input
                  className="input-modern"
                  value={form.university || form.organization || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      university: e.target.value,
                      organization: e.target.value,
                    })
                  }
                />
              </div>

              {isScholarship && (
                <div>
                  <label className="label">Degree</label>
                  <input
                    className="input-modern"
                    value={form.degree || ""}
                    onChange={(e) =>
                      setForm({ ...form, degree: e.target.value })
                    }
                  />
                </div>
              )}

              {showFunding && (
                <div>
                  <label className="label">Funding Type</label>
                  <select
                    className="input-modern"
                    value={form.fundingType || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        fundingType: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Funding Type</option>
                    <option value="FULLY_FUNDED">Fully Funded</option>
                    <option value="PARTIALLY_FUNDED">Partially Funded</option>
                    <option value="TUITION_ONLY">Tuition Only</option>
                    <option value="SELF_FUNDED">Self Funded</option>
                  </select>
                </div>
              )}

              {isGrant && (
                <div>
                  <label className="label">Amount</label>
                  <input
                    className="input-modern"
                    value={form.amount || ""}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                  />
                </div>
              )}

              {showSalary && (
                <div>
                  <label className="label">Salary</label>
                  <input
                    className="input-modern"
                    value={form.salary || ""}
                    onChange={(e) =>
                      setForm({ ...form, salary: e.target.value })
                    }
                  />
                </div>
              )}

              {showDuration && (
                <div>
                  <label className="label">Duration</label>
                  <input
                    className="input-modern"
                    value={form.duration || ""}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                  />
                </div>
              )}

              <div>
                <label className="label">Deadline</label>
                <input
                  type="date"
                  className="input-modern"
                  value={form.deadline || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      deadline: e.target.value,
                    })
                  }
                />
              </div>
            </>
          )}
        </div>

        {/* CONTENT */}
        <div className="space-y-4">
          <div>
            <label className="label">
              {isGuide ? "Guide Content" : "Overview"}
            </label>
            <RichMarkdownEditor
              value={form.overview || ""}
              onChange={(value) =>
                setForm({ ...form, overview: value || "" })
              }
            />
          </div>

          {/* HIDE FOR GUIDE */}
          {!isGuide && (
            <>
              <div>
                <label className="label">Extra Details</label>
                <RichMarkdownEditor
                  value={form.extraDetails || ""}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      extraDetails: value || "",
                    })
                  }
                />
              </div>

              <div>
                <label className="label">Eligibility</label>
                <textarea
                  className="textarea-modern"
                  value={form.eligibility || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      eligibility: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="label">Eligible Countries</label>
                <input
                  className="input-modern"
                  value={form.eligibleCountries || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      eligibleCountries: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="label">Benefits</label>
                <textarea
                  className="textarea-modern"
                  value={form.benefits || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      benefits: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="label">Requirements</label>
                <textarea
                  className="textarea-modern"
                  value={form.requirements || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      requirements: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="label">How To Apply</label>
                <RichMarkdownEditor
                  value={form.howToApply || ""}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      howToApply: value || "",
                    })
                  }
                />
              </div>

              <div>
                <label className="label">
                  Official Application Link
                </label>
                <input
                  className="input-modern"
                  value={form.officialLink || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      officialLink: e.target.value,
                    })
                  }
                />
              </div>
            </>
          )}
        </div>

        {/* IMAGE */}
        <div>
          <label className="label">Image</label>
          <input
            type="file"
            onChange={(e) =>
              setImageFile(e.target.files[0])
            }
          />
        </div>

        {/* FLAGS */}
        <div className="flex gap-6">
          <label>
            <input
              type="checkbox"
              checked={form.featured || false}
              onChange={(e) =>
                setForm({
                  ...form,
                  featured: e.target.checked,
                })
              }
            />{" "}
            Featured
          </label>

          {!isGuide && (
            <label>
              <input
                type="checkbox"
                checked={form.trending || false}
                onChange={(e) =>
                  setForm({
                    ...form,
                    trending: e.target.checked,
                  })
                }
              />{" "}
              Trending
            </label>
          )}
        </div>

        {/* STATUS */}
        <div>
          <label className="label">Status</label>
          <select
            className="input-modern"
            value={form.status || "DRAFT"}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-950 to-teal-500 text-white py-3 rounded-xl font-semibold"
        >
          Update Opportunity
        </button>
      </form>
    </div>
  );
}