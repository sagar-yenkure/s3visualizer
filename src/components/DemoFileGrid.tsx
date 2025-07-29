"use client";

import React from "react";
import { FileGrid } from "./FileGrid";
import { demoObjects } from "@/constants";

export const DemoFileGrid: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-2xl overflow-hidden">
      <FileGrid
        objects={demoObjects}
        loading={false}
        onFolderClick={() => {}}
      />
    </div>
  );
};
