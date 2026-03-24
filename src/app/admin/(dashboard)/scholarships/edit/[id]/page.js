import prisma from "@/lib/prisma";
import EditForm from "./EditForm";

export default async function EditScholarship({ params }) {
  const { id } = await params; // 👈 REQUIRED in Next 16

  if (!id) {
    return <div>Invalid scholarship ID</div>;
  }

  const scholarship = await prisma.scholarship.findUnique({
    where: { id },
  });

  if (!scholarship) {
    return <div>Scholarship not found</div>;
  }

  return <EditForm scholarship={scholarship} />;
}