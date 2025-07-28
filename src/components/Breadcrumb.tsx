import React from "react";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  currentPath: string;
  onPathChange: (path: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentPath,
  onPathChange,
}) => {
  const pathSegments = currentPath
    ? currentPath.split("/").filter(Boolean)
    : [];

  return (
    <nav className="flex flex-wrap items-center text-sm space-x-2 px-2">
      <button
        onClick={() => onPathChange("")}
        className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shrink-0"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Root</span>
      </button>

      {pathSegments.map((segment, index) => {
        const path = pathSegments.slice(0, index + 1).join("/") + "/";
        const isLast = index === pathSegments.length - 1;

        return (
          <React.Fragment key={path}>
            <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            <button
              onClick={() => onPathChange(path)}
              className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                isLast
                  ? "text-blue-600 bg-blue-50 cursor-default"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              disabled={isLast}
            >
              <span className="truncate max-w-[100px] inline-block">
                {segment}
              </span>
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
};
