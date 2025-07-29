import { FolderPlus, RefreshCw, Upload } from "lucide-react";
import { DemoFileGrid } from "./DemoFileGrid";
import { Breadcrumb } from "./Breadcrumb";

const DemoSection = () => {
  return (
    <section id="demo" className="py-18 bg-gray-50">
      <div id="demo" className="relative max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Mock Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">S3</span>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      my-storage-bucket
                    </h2>
                    <p className="text-xs text-gray-500">us-east-1</p>
                  </div>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs border border-gray-200">
                    <FolderPlus className="w-3 h-3" />
                    <span>New Folder</span>
                  </button>
                  <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs">
                    <Upload className="w-3 h-3" />
                    <span>Upload</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mock Breadcrumb */}
            <div className="px-4 py-2 bg-gray-50">
              <div className="flex items-center space-x-1 text-xs">
                <Breadcrumb currentPath="Documents" onPathChange={() => {}} />
              </div>
            </div>
          </div>

          {/* Mock File Grid */}
          <DemoFileGrid />
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
