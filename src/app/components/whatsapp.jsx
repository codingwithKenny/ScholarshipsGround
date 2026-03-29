export default function WhatsAppCommunity({ links }) {
  const WHATSAPP_LINKS = links || {
    community: "https://chat.whatsapp.com/EnMAWNlw9Cr66sGSKmy0nR",
    qa: "https://chat.whatsapp.com/FvWfWl74z29GJfOuU6XKpG?mode=hqctcli",
    tips: "https://chat.whatsapp.com/KUCXywxuI3A7YT4jS2QqL1?mode=gi_t",
  };

  return (
    <div className="bg-gradient-to-r from-blue-950 to-teal-600 text-white h-82 p-6 rounded-2xl shadow-lg">
      <h3 className="font-bold text-lg mb-2">
        💬 Join Our WhatsApp Community
      </h3>

      <p className="text-sm mb-4 text-green-100">
        Don’t miss scholarships, deadlines & insider tips. Join the right group below 👇
      </p>

      <div className="space-y-3">

        {/* Q&A GROUP */}
        <a
          href={WHATSAPP_LINKS.qa}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white text-green-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:scale-105 hover:bg-gray-100 transition"
        >
          ❓ Have Questions? Join Q&A Group
        </a>

        {/* TIPS GROUP */}
        <a
          href={WHATSAPP_LINKS.tips}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white text-green-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:scale-105 hover:bg-gray-100 transition"
        >
          🔔 Get Daily Tips & Reminders
        </a>

        {/* MAIN COMMUNITY */}
        <a
          href={WHATSAPP_LINKS.community}
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-white text-white px-4 py-2 rounded-lg text-sm text-center hover:bg-white hover:text-green-600 transition"
        >
          🌍 Join Full Community
        </a>
      </div>
    </div>
  );
}