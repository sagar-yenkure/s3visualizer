"use client";

import React from "react";
import { Download, Trash2, CopyIcon } from "lucide-react";
import toast from "react-hot-toast";
import { AWSCredentials, S3Object } from "../types";
import { useDeleteS3Object, useDownloadFile } from "@/features/S3Feature";
import { getAwsCredentials } from "@/lib/getAwsCredentials";

interface FileActionMenuProps {
  object: S3Object;
  setShowMenu: (v: boolean) => void;
}

export const FileActionMenu = ({
  object,
  setShowMenu,
}: FileActionMenuProps) => {
  const AWS_CREDENTIALS: AWSCredentials = JSON.parse(
    getAwsCredentials() || "{}"
  );
  const { mutateAsync: deleteS3Object } = useDeleteS3Object();
  const { mutateAsync: downloadFile } = useDownloadFile();

  const handleDownload = () => {
    downloadFile({ key: object.key, credentials: AWS_CREDENTIALS });
    setShowMenu(false);
  };

  const handleDelete = async () => {
    toast.promise(
      deleteS3Object(
        { key: object.key, credentials: AWS_CREDENTIALS },
        { onSuccess: () => setShowMenu(false) }
      ),
      { loading: "Deleting..." }
    );
  };

  const handleCopyURL = () => {
    const url = `https://${AWS_CREDENTIALS.bucketName}.s3.${AWS_CREDENTIALS.region}.amazonaws.com/${object.key}`;

    toast.promise(navigator.clipboard.writeText(url), {
      loading: "Copying URL...",
      success: "URL copied to clipboard!",
      error: "Failed to copy URL.",
    });
  };

  return (
    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[120px]">
      {!object.isFolder && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="w-full hover:cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyURL();
            }}
            className="w-full hover:cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <CopyIcon className="w-4 h-4" />
            Copy URL
          </button>
        </>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="w-full hover:cursor-pointer px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  );
};