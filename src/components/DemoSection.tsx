import { Cloud, FileText, ImageIcon, Music, Video } from "lucide-react";
import React from "react";
import { DemoFileGrid } from "./DemoFileGrid";

const DemoSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Beautiful, Intuitive Interface
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience a modern, clean interface that makes managing your S3
            files a pleasure
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-800">
                my-awesome-bucket
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>Documents</span>
              </div>
              <div className="flex items-center space-x-1">
                <ImageIcon className="w-4 h-4" />
                <span>Images</span>
              </div>
              <div className="flex items-center space-x-1">
                <Video className="w-4 h-4" />
                <span>Videos</span>
              </div>
              <div className="flex items-center space-x-1">
                <Music className="w-4 h-4" />
                <span>Audio</span>
              </div>
            </div>
          </div>
          <DemoFileGrid />
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
