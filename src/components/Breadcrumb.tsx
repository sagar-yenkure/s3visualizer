import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  currentPath: string;
  onPathChange: (path: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPath, onPathChange }) => {
  const pathSegments = currentPath ? currentPath.split('/').filter(Boolean) : [];

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <button
        onClick={() => onPathChange('')}
        className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Root</span>
      </button>

      {pathSegments.map((segment, index) => {
        const path = pathSegments.slice(0, index + 1).join('/') + '/';
        const isLast = index === pathSegments.length - 1;

        return (
          <React.Fragment key={path}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => onPathChange(path)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isLast
                  ? 'text-blue-600 bg-blue-50 cursor-default'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              disabled={isLast}
            >
              {segment}
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
};