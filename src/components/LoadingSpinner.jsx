import React from 'react'

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-gray-800 border-solid border-gray-300"></div>
    </div>
  )
}

export default LoadingSpinner
