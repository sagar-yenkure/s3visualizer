import React from "react";

const GridLoader= ({length=6}:{length?:number}) => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {Array.from({ length }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-xl h-24 mb-3"></div>
            <div className="bg-gray-200 rounded h-4 mb-2"></div>
            <div className="bg-gray-200 rounded h-3 w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridLoader;
