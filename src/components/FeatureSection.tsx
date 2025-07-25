import {
  Download,
  Eye,
  FolderPlus,
  Shield,
  Trash2,
  Upload,
} from "lucide-react";
import React from "react";

const FeatureSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for S3 Management
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make managing your AWS S3 files
            effortless and secure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Browse Files & Folders
            </h4>
            <p className="text-gray-600">
              Navigate through your S3 bucket structure with an intuitive,
              visual interface that makes finding files effortless.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Download Files
            </h4>
            <p className="text-gray-600">
              Download individual files or entire folders with a single click.
              Support for all file types and sizes.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Upload Files
            </h4>
            <p className="text-gray-600">
              Drag and drop files or browse to upload. Support for multiple
              files and large uploads with progress tracking.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
              <FolderPlus className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Create Folders
            </h4>
            <p className="text-gray-600">
              Organize your files by creating new folders directly in your S3
              bucket through our interface.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-6">
              <Trash2 className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Delete Files & Folders
            </h4>
            <p className="text-gray-600">
              Remove unwanted files and folders with confirmation dialogs to
              prevent accidental deletions.
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Browser-Only Security
            </h4>
            <p className="text-gray-600">
              Your AWS credentials are stored locally in your browser and never
              transmitted to our servers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
