import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-10 px-6 text-gray-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <div className="">
            <Image
              src="/sglogo2.png"
              alt="ScholarshipGround Logo"
              width={150}
              height={50}
            />
          </div>
          <h2 className="text-white text-xl font-bold -mt-20">
            ScholarshipGround
          </h2>
          <p className="text-sm leading-relaxed">
            Discover fully funded scholarships for undergraduate, master's, and PhD students worldwide. We connect you to verified opportunities from top universities.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/scholarships" className="hover:text-white transition">All Scholarships</Link>
            </li>
            <li>
              <Link href="/scholarships?degree=BSc" className="hover:text-white transition">Undergraduate</Link>
            </li>
            <li>
              <Link href="/scholarships?degree=MSc" className="hover:text-white transition">Masters</Link>
            </li>
            <li>
              <Link href="/scholarships?degree=PhD" className="hover:text-white transition">PhD</Link>
            </li>
          </ul>
        </div>

        {/* STUDY DESTINATIONS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Study Destinations</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/scholarships?country=USA" className="hover:text-white transition">Study in United States</Link></li>
            <li><Link href="/scholarships?country=UK" className="hover:text-white transition">Study in UK</Link></li>
            <li><Link href="/scholarships?country=Canada" className="hover:text-white transition">Study in Canada</Link></li>
            <li><Link href="/scholarships?country=Germany" className="hover:text-white transition">Study in Germany</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} ScholarshipGround. All rights reserved.</p>
        <p className="mt-2">Built for students seeking global scholarship opportunities.</p>
      </div>
    </footer>
  );
}