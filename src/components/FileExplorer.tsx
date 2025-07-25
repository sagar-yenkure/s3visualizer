import React, { useState, useEffect, useCallback } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { FileGrid } from "./FileGrid";
import { FileUploader } from "./FileUploader";
import { CreateFolderModal } from "./CreateFolderModal";
import { S3Service } from "../services/S3Service";
import { AWSCredentials, S3Object } from "../types";
import { Upload, FolderPlus, LogOut, RefreshCw } from "lucide-react";

interface FileExplorerProps {
  s3Service: S3Service | null;
  credentials: AWSCredentials | null;
  currentPath: string;
  onPathChange: (path: string) => void;
  onDisconnect: () => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  s3Service,
  credentials,
  currentPath,
  onPathChange,
  onDisconnect,
}) => {
  const [objects, setObjects] = useState<S3Object[]>([]);
  const [loading, setLoading] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadObjects = useCallback(async () => {
    if (!s3Service) return;

    setLoading(true);
    setError(null);

    try {
      const result = await s3Service.listObjects(currentPath);
      setObjects(result);
    } catch (err) {
      setError("Failed to load files and folders");
      console.error("Error loading objects:", err);
    } finally {
      setLoading(false);
    }
  }, [s3Service, currentPath]);

  useEffect(() => {
    loadObjects();
  }, [loadObjects]);

  const handleFolderCreate = async (folderName: string) => {
    if (!s3Service) return;

    try {
      const folderPath = currentPath
        ? `${currentPath}${folderName}/`
        : `${folderName}/`;
      await s3Service.createFolder(folderPath);
      await loadObjects();
      setShowCreateFolder(false);
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  };

  const handleFileUpload = async () => {
    await loadObjects();
    setShowUploader(false);
  };

  const handleObjectDelete = async (object: S3Object) => {
    if (
      !s3Service ||
      !confirm(`Are you sure you want to delete "${object.name}"?`)
    )
      return;

    try {
      await s3Service.deleteObject(object.key);
      await loadObjects();
    } catch (err) {
      console.error("Error deleting object:", err);
    }
  };

  if (!s3Service || !credentials) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 mb-8">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Bucket Info */}
            <div className="flex items-start md:items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">S3</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {credentials.bucketName}
                </h2>
                <p className="text-sm text-gray-500">{credentials.region}</p>
              </div>
              <button
                onClick={loadObjects}
                disabled={loading}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw
                  className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowCreateFolder(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors"
              >
                <FolderPlus className="w-4 h-4" />
                <span>New Folder</span>
              </button>

              <button
                onClick={() => setShowUploader(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>

              <button
                onClick={onDisconnect}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-3">
          <Breadcrumb currentPath={currentPath} onPathChange={onPathChange} />
        </div>
      </header>

      {/* Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        {error ? (
          <div className="p-8 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadObjects}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <FileGrid
            objects={objects}
            loading={loading}
            onFolderClick={(folder) => onPathChange(folder.path)}
            onFileDelete={handleObjectDelete}
          />
        )}
      </div>

      {/* Modals */}
      {showUploader && (
        <FileUploader
          s3Service={s3Service}
          currentPath={currentPath}
          onClose={() => setShowUploader(false)}
          onUploadComplete={handleFileUpload}
        />
      )}

      {showCreateFolder && (
        <CreateFolderModal
          onClose={() => setShowCreateFolder(false)}
          onConfirm={handleFolderCreate}
        />
      )}
    </section>
  );
};
