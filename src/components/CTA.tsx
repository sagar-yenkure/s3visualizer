import { CheckCircle, Cloud } from "lucide-react";
import React from "react";

const CTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Ready to Manage Your S3 Files?
        </h3>
        <p className="text-xl text-gray-600 mb-8">
          Start managing your AWS S3 files with complete security and powerful
          features in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2">
            <Cloud className="w-5 h-5" />
            <span>Connect Your Bucket Now</span>
          </button>
          <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-300 hover:shadow-lg transition-all duration-200">
            Learn More
          </button>
        </div>

        <div className="mt-12 flex justify-center items-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>No Account Required</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>100% Free</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Instant Setup</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
