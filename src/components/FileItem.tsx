"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Folder, File, MoreVertical} from "lucide-react";
import { S3Object } from "../types";
import { fileTypeMap } from "@/constants";
import { FileActionMenu } from "./FileMenu";

interface FileItemProps {
  object: S3Object;
  onClick?: (object: S3Object) => void;
}

export const FileItem: React.FC<FileItemProps> = ({ object, onClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getFileMeta = (name: string, isFolder: boolean) => {
    if (isFolder) return { icon: Folder, color: "text-blue-500" };
    const ext = name.split(".").pop()?.toLowerCase() || "";
    return fileTypeMap[ext] || { icon: File, color: "text-gray-500" };
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const { icon: IconComponent, color: iconColor } = getFileMeta(
    object.name,
    object.isFolder
  );

  return (
    <div
      className="group relative bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={() => onClick?.(object)}
    >
      <div className="p-4">
        <div className="flex items-center justify-center h-16 mb-3">
          <IconComponent className={`w-10 h-10 ${iconColor}`} />
        </div>

        <div className="text-center">
          <p
            className="text-sm font-medium text-gray-900 truncate mb-1"
            title={object.name}
          >
            {object.name}
          </p>

          {!object.isFolder && (
            <div className="text-xs text-gray-500 space-y-1">
              <p>{formatFileSize(object.size)}</p>
              <p>{format(object.lastModified, "MMM d, yyyy")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Context Menu Button */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-1 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors"
        >
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </button>

        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <FileActionMenu object={object} setShowMenu={setShowMenu} />
          </>
        )}
      </div>
    </div>
  );
};
