"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { FileUploadItem } from "../types";
import { uploadToS3 } from "@/services/S3Service";

interface FileUploaderProps {
  currentPath: string;
  onClose: () => void;
  onUploadComplete: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  currentPath,
  onClose,
  onUploadComplete,
}) => {
  const [uploadItems, setUploadItems] = useState<FileUploadItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newItems: FileUploadItem[] = acceptedFiles.map((file) => ({
      file,
      progress: { loaded: 0, total: file.size, percentage: 0 },
      status: "pending",
    }));

    setUploadItems((prev) => [...prev, ...newItems]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removeFile = (index: number) => {
    setUploadItems((prev) => prev.filter((_, i) => i !== index));
  };

  const startUpload = async () => {
    if (uploadItems.length === 0) return;

    setIsUploading(true);

    for (let i = 0; i < uploadItems.length; i++) {
      const item = uploadItems[i];
      if (item.status !== "pending") continue;

      try {
        setUploadItems((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: "uploading" } : item
          )
        );

        const key = currentPath
          ? `${currentPath}${item.file.name}`
          : item.file.name;

        await uploadToS3(item.file, key, (progress) => {
          setUploadItems((prev) =>
            prev.map((item, idx) => (idx === i ? { ...item, progress } : item))
          );
        });

        setUploadItems((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: "completed" } : item
          )
        );
      } catch (error) {
        setUploadItems((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? {
                  ...item,
                  status: "error",
                  error:
                    error instanceof Error ? error.message : "Upload failed",
                }
              : item
          )
        );
      }
    }

    setIsUploading(false);

    // Check if all uploads completed successfully
    const allCompleted = uploadItems.every(
      (item) => item.status === "completed"
    );
    if (allCompleted) {
      setTimeout(() => {
        onUploadComplete();
      }, 1000);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Upload Files</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Drop Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-blue-600">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  Drag & drop files here, or click to select
                </p>
                <p className="text-sm text-gray-400">
                  Support for all file types
                </p>
              </div>
            )}
          </div>

          {/* File List */}
          {uploadItems.length > 0 && (
            <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
              {uploadItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <File className="w-5 h-5 text-gray-500 flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(item.file.size)}
                    </p>

                    {item.status === "uploading" && (
                      <div className="mt-1">
                        <div className="bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${item.progress.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.progress.percentage}%
                        </p>
                      </div>
                    )}

                    {item.status === "error" && (
                      <p className="text-xs text-red-500 mt-1">{item.error}</p>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    {item.status === "completed" && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {item.status === "error" && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    {item.status === "pending" && (
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {uploadItems.length} file{uploadItems.length !== 1 ? "s" : ""}{" "}
            selected
          </p>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={startUpload}
              disabled={uploadItems.length === 0 || isUploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isUploading ? "Uploading..." : "Upload Files"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
