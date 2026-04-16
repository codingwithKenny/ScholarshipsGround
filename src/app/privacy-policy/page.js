import Navbar from "../components/Navbar";

export const metadata = {
  title: "Privacy Policy | ScholarshipGround",
  description: "Privacy Policy for ScholarshipGround website.",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
        <Navbar/>
      <h1 className="text-3xl font-bold  mt-20 mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At ScholarshipGround, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect:
        <br />• Email address (newsletter subscription)
        <br />• Usage data (pages visited, time spent)
        <br />• Cookies and analytics data
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
      <p className="mb-4">
        We use your data to:
        <br />• Improve website experience
        <br />• Send scholarship updates (if subscribed)
        <br />• Analyze traffic and performance
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies</h2>
      <p className="mb-4">
        We use cookies to improve user experience and track website performance through tools like Google Analytics.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
      <p className="mb-4">
        We may use:
        <br />• Google Analytics
        <br />• Google AdSense
        <br />• Email newsletter services
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Protection</h2>
      <p className="mb-4">
        We do not sell or share your personal data with unauthorized third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
      <p className="mb-4">
        You can request to update or delete your data by contacting us.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact</h2>
      <p>
        If you have questions, contact us at: <strong>support@scholarshipground.com</strong>
      </p>
    </div>
  );
}