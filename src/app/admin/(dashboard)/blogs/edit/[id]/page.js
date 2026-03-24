import { getBlog } from "../../blogaction";
import EditBlogForm from "./EditBlogForm";

export default async function EditPage({ params }) {
  const { id } = await params; // ✅ IMPORTANT (unwrap params)

  if (!id) {
    return <div>Invalid blog ID</div>;
  }

  const blog = await getBlog(id);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return <EditBlogForm blog={blog} />;
}