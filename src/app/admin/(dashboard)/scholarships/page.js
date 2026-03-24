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
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Scholarships
          </h1>
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
            <p className="text-gray-500 text-lg">
              No scholarships added yet
            </p>

            <Link
              href="/admin/scholarships/create"
              className="inline-block mt-6 bg-gradient-to-r from-blue-950 to-teal-500 text-white px-6 py-3 rounded-lg font-medium shadow hover:scale-105 transition"
            >
              Create First Scholarship
            </Link>
          </div>

        ) : (

          <table className="w-full">

            {/* Table Header */}
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Country</th>
                <th className="px-6 py-4 text-left">Deadline</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y">

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

                    {/* Country */}
                    <td className="px-6 py-4 text-gray-600">
                      {sch.country}
                    </td>

                    {/* Deadline */}
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(
                        sch.deadline
                      ).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}
                      >
                        {sch.status}
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

        )}

      </div>
    </div>
  );
}