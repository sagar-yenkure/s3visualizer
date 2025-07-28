"use client";

import React, { useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { FileGrid } from "./FileGrid";
import { FileUploader } from "./FileUploader";
import { CreateFolderModal } from "./CreateFolderModal";
import { AWSCredentials, S3Object } from "../types";
import { Upload, FolderPlus, LogOut, RefreshCw } from "lucide-react";
import {
  useCreateS3Folder,
  useDeleteS3Object,
  useDownloadFile,
  useListS3Objects,
} from "@/features/S3Feature";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const FileExplorer = ({
  AWS_CREDENTIALS,
}: {
  AWS_CREDENTIALS: AWSCredentials;
}) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string>("");
  const [modals, setModals] = useState({
    uploader: false,
    createFolder: false,
  });

  // List objects hook
  const {
    data: objects = [],
    isLoading: loading,
    isError,
    refetch,
  } = useListS3Objects(currentPath, AWS_CREDENTIALS);

  //  Create folder
  const { mutateAsync: createS3Folder } = useCreateS3Folder();
  //  Delete file/folder
  const { mutateAsync: deleteS3Object } = useDeleteS3Object();
  // Download file
  const { mutateAsync: downloadFile } = useDownloadFile();

  const handlePathChange = (newPath: string) => setCurrentPath(newPath);

  const handleFolderCreate = async (folderName: string) => {
    const folderPath = currentPath
      ? `${currentPath}${folderName}/`
      : `${folderName}/`;
    try {
      await createS3Folder({
        folderPath: folderPath,
        credentials: AWS_CREDENTIALS,
      });
      setModals((prev) => ({ ...prev, createFolder: false }));
      refetch();
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  };

  const handleFileUpload = async () => {
    refetch();
    setModals((prev) => ({ ...prev, uploader: false }));
  };

  const handleObjectDelete = async (object: S3Object) => {
    toast.promise(
      deleteS3Object({ key: object.key, credentials: AWS_CREDENTIALS }),
      {
        loading: "deleting...",
      }
    );
  };

  const handleObjetDownload = (key: string) => {
    downloadFile({ key, credentials: AWS_CREDENTIALS });
  };

  const handleDisconnect = () => {
    localStorage.removeItem("aws-s3-credentials");
    router.push("/");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Bucket Info */}
              <div className="flex items-start md:items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S3</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {AWS_CREDENTIALS.bucketName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {AWS_CREDENTIALS.region}
                  </p>
                </div>
                <button
                  onClick={() => refetch()}
                  disabled={loading}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
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
                  onClick={() =>
                    setModals((prev) => ({ ...prev, createFolder: true }))
                  }
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>New Folder</span>
                </button>

                <button
                  onClick={() =>
                    setModals((prev) => ({ ...prev, uploader: true }))
                  }
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </button>

                <button
                  onClick={handleDisconnect}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-3">
            <Breadcrumb
              currentPath={currentPath}
              onPathChange={handlePathChange}
            />
          </div>
        </header>

        {/* File Grid or Error */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          {isError ? (
            <div className="p-8 text-center">
              <p className="text-red-600">Failed to load objects.</p>
              <button
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <FileGrid
              objects={objects}
              loading={loading}
              onFolderClick={(folder) => handlePathChange(folder.path)}
              onFileDelete={handleObjectDelete}
              onFileDownload={handleObjetDownload}
            />
          )}
        </div>

        {/* Modals */}
        {modals.uploader && (
          <FileUploader
            currentPath={currentPath}
            onClose={() => setModals((prev) => ({ ...prev, uploader: false }))}
            onUploadComplete={handleFileUpload}
          />
        )}
        {modals.createFolder && (
          <CreateFolderModal
            onClose={() =>
              setModals((prev) => ({ ...prev, createFolder: false }))
            }
            onConfirm={handleFolderCreate}
          />
        )}
      </div>
    </section>
  );
};
