import React from 'react';

export default function MainContent({ children }) {
  return (
    <main className="ml-64 pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {children}
      </div>
    </main>
  );
}