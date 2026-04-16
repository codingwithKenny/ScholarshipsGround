import Navbar from "../components/Navbar";

export const metadata = {
  title: "Terms & Conditions | ScholarshipGround",
};

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <Navbar/>
      <h1 className="text-3xl font-bold mt-20 mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        By using ScholarshipGround, you agree to the following terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Website</h2>
      <p className="mb-4">
        This website is for informational purposes only. We do not guarantee scholarship approval.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Content Accuracy</h2>
      <p className="mb-4">
        We try to keep information updated, but we are not responsible for changes made by third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. External Links</h2>
      <p className="mb-4">
        We may link to external websites. We are not responsible for their content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Changes</h2>
      <p className="mb-4">
        We may update these terms at any time.
      </p>
    </div>
  );
}