'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/sessions/latest`);
        const data = await response.json();
        setSessionData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-2xl">Loading your Mission Control...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Mission Control Dashboard</h1>
        <p className="text-gray-400">Gustavo Quintero • Director & Ironman</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">OpenClaw Connection</h2>
          <p className="text-green-400">✅ Connected</p>
          <p className="text-sm text-gray-400 mt-2">
            Last updated: {sessionData ? new Date(sessionData['agent:main:main']?.updatedAt).toLocaleString() : 'N/A'}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
          <p className="text-3xl font-bold">{sessionData ? Object.keys(sessionData).length : 0}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Model</h2>
          <p className="text-sm">{sessionData?.['agent:main:main']?.model || 'N/A'}</p>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Raw Session Data</h2>
        <pre className="text-xs overflow-auto max-h-96 bg-gray-900 p-4 rounded">
          {JSON.stringify(sessionData, null, 2)}
        </pre>
      </div>
    </div>
  );
}
