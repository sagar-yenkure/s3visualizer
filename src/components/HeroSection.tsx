import { Cloud, Shield } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Manage Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              AWS S3{" "}
            </span>
            Files Securely
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            A powerful, secure file manager for your AWS S3 buckets. Your API
            keys never leave your browser, ensuring maximum security while
            providing full file management capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2">
              <Cloud className="w-5 h-5" />
              <span>Connect Your S3 Bucket</span>
            </button>
            <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-300 hover:shadow-lg transition-all duration-200">
              View Demo
            </button>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-full px-6 py-3 flex items-center space-x-3 shadow-lg">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-green-800 font-medium">
              100% Client-Side Security
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
