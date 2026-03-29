import Link from "next/link";

export default function TitleList({ title, items, icon }) {
  if (!items?.length) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={item.id} className="flex gap-3">
            {/* Numbering */}
            <span className="font-bold text-gray-400">
              {index + 1}
            </span>

            <Link
              href={`/scholarships/${item.slug}`}
              className="text-sm text-gray-800 hover:text-blue-700 hover:underline line-clamp-2"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}