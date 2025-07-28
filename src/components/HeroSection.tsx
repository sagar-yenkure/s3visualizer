"use client";

import {
  ArrowRight,
  CloudOff,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b h-screen from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center ">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AWS S3 File Manager
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A secure, beautiful interface to manage your AWS S3 storage. Connect
            directly with complete privacy and control.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href={"/credentials"}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <button
              onClick={() =>
                document
                  .getElementById("demo")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex hover:cursor-pointer items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              View Demo
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-2 text-sm text-gray-600">
        {/* Row 1 */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            No sign-up required
          </span>
          <span className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600" />
            100% Client-side
          </span>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-2">
            <CloudOff className="w-4 h-4 text-blue-600" />
            No backend storage
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            Fast & Lightweight
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
