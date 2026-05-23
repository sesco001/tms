import React from 'react';

export default function Dashboard() {
  return (
    <div className="card max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
      <p className="text-slate-600">Order history and profile settings will appear here.</p>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-blue-800">
        Connected to Supabase successfully!
      </div>
    </div>
  );
}
