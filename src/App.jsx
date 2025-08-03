import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        AI Interview Simulator
      </h1>

      <select className="mb-4 p-2 border border-gray-300 rounded">
        <option>Frontend Developer</option>
        <option>Product Manager</option>
        <option>Data Analyst</option>
      </select>

      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-6">
        Start Interview
      </button>

      <div className="w-full max-w-xl bg-white shadow-md rounded p-4 space-y-4">
        <div className="text-sm text-gray-500">[Interviewer] Tell me about yourself.</div>
        <div className="text-right text-sm text-gray-800">[You] I'm a frontend developer with a focus on React.</div>
      </div>

      <div className="mt-4 w-full max-w-xl flex">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-l"
          placeholder="Type your response..."
        />
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}

