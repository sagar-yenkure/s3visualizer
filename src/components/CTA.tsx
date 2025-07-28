import { Cloud } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto text-center px-6 sm:px-10">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          Ready to Manage Your S3 Files?
        </h3>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Get started instantly with powerful tools and secure access to your
          AWS S3 buckets.
        </p>
        <div className="flex justify-center">
          <Link
            href={"/credentials"}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-3 focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            <Cloud className="w-5 h-5" />
            <span>Connect Your Bucket Now</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
