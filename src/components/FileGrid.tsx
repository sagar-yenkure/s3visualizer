import React from "react";
import { FileItem } from "./FileItem";
import { S3Object } from "../types";
import GridLoader from "./GridLoader";
import GridEmpty from "./GridEmpty";

interface FileGridProps {
  objects: S3Object[];
  loading: boolean;
  onFolderClick: (folder: S3Object) => void;
}

export const FileGrid: React.FC<FileGridProps> = ({
  objects,
  loading,
  onFolderClick,
}) => {
  if (loading) return <GridLoader />;
  if (objects?.length === 0) return <GridEmpty />;

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {objects.map((object) => (
          <FileItem
            key={object.key}
            object={object}
            onClick={object.isFolder ? onFolderClick : undefined}
          />
        ))}
      </div>
    </div>
  );
};
