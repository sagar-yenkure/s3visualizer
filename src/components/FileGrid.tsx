import React from 'react';
import { FileItem } from './FileItem';
import { S3Object } from '../types';
import { FileX } from 'lucide-react';

interface FileGridProps {
  objects: S3Object[];
  loading: boolean;
  onFolderClick: (folder: S3Object) => void;
  onFileDelete: (object: S3Object) => void;
}

export const FileGrid: React.FC<FileGridProps> = ({
  objects,
  loading,
  onFolderClick,
  onFileDelete,
}) => {
  if (loading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-24 mb-3"></div>
              <div className="bg-gray-200 rounded h-4 mb-2"></div>
              <div className="bg-gray-200 rounded h-3 w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (objects.length === 0) {
    return (
      <div className="p-16 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileX className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No files or folders</h3>
        <p className="text-gray-500">Upload files or create folders to get started</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {objects.map((object) => (
          <FileItem
            key={object.key}
            object={object}
            onClick={object.isFolder ? onFolderClick : undefined}
            onDelete={onFileDelete}
          />
        ))}
      </div>
    </div>
  );
};