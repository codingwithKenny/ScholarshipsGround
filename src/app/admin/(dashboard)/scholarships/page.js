import Link from "next/link";
import DeleteButton from "./DeleteButton";
import prisma from "@/lib/prisma";

export default async function ScholarshipsPage() {
  const scholarships = await prisma.scholarship.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scholarships</h1>
          <p className="text-gray-500 mt-1">
            Manage all scholarships on the platform
          </p>
        </div>

        <Link
          href="/admin/scholarships/create"
          className="bg-gradient-to-r from-blue-950 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
        >
          + Add Scholarship
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {scholarships.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-gray-500 text-lg">No scholarships added yet</p>
            <Link
              href="/admin/scholarships/create"
              className="inline-block mt-6 bg-gradient-to-r from-blue-950 to-teal-500 text-white px-6 py-3 rounded-lg font-medium shadow hover:scale-105 transition"
            >
              Create First Scholarship
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Country</th>
                  <th className="px-6 py-4">Deadline</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {scholarships.map((sch) => {
                  const statusColor =
                    sch.status === "PUBLISHED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700";

                  return (
                    <tr
                      key={sch.id}
                      className="hover:bg-gray-50 transition"
                    >
                      {/* Title */}
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {sch.title}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 text-gray-600 capitalize">
                        {sch.category.toLowerCase().replace("_", " ")}
                      </td>

                      {/* Country */}
                      <td className="px-6 py-4 text-gray-600">
                        {sch.country || "N/A"}
                      </td>

                      {/* Deadline */}
                      <td className="px-6 py-4 text-gray-600">
                        {sch.deadline
                          ? new Date(sch.deadline).toLocaleDateString()
                          : "No deadline"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}
                        >
                          {sch.status.toLowerCase()}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right space-x-4">
                        <Link
                          href={`/admin/scholarships/edit/${sch.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </Link>
                        <DeleteButton id={sch.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}