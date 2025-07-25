import { Cloud } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">S3 File Manager</span>
          </div>
          <p className="text-gray-400 text-center md:text-right">
            Built with security and simplicity in mind.
            <br />
            Your files, your control, your browser.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
