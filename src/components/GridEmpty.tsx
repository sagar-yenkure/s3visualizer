import { FileX } from 'lucide-react'
import React from 'react'

const GridEmpty = () => {
  return (
    <div className="p-16 text-center">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <FileX className="w-10 h-10 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      No files or folders
    </h3>
    <p className="text-gray-500">
      Upload files or create folders to get started
    </p>
  </div>
  )
}

export default GridEmpty