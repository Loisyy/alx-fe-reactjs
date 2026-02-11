import React from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-500 text-center mb-8">
          Recipe Sharing Platform
        </h1>
        <p className="text-center text-gray-700 text-lg">
          Welcome to the Recipe Sharing Platform! This is a test to verify Tailwind CSS integration.
        </p>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Tailwind CSS is working! ✓
          </h2>
          <p className="text-gray-600">
            You can see the styled components with Tailwind utility classes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App