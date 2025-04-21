'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ApiLog {
  id: number;
  endpoint: string;
  method: string;
  request_data: any;
  response_data: any;
  status_code: number;
  created_at: string;
  user_email: string | null;
  execution_time_ms: number;
}

export default function ApiLogsPage() {
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);
  
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/logs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch logs');
        }
        
        const data = await response.json();
        setLogs(data.logs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLogs();
  }, []);
  
  const viewLogDetails = (log: ApiLog) => {
    setSelectedLog(log);
  };
  
  if (loading) {
    return <div className="p-8 flex justify-center">Loading API logs...</div>;
  }
  
  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }
  
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">API Call History</h1>
      
      <div className="mb-4">
        <Link href="/api-test" className="text-blue-600 hover:underline">
          ← Back to API Test
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Endpoint</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Method</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Time (ms)</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-3 text-center text-gray-500">
                        No API logs found
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{log.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{log.endpoint}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            log.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {log.method}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            log.status_code >= 200 && log.status_code < 300 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {log.status_code}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{log.execution_time_ms}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {new Date(log.created_at).toLocaleDateString()} {new Date(log.created_at).toLocaleTimeString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <button
                            onClick={() => viewLogDetails(log)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {selectedLog ? (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-medium mb-4">Log Details</h2>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Request Data:</h3>
                <pre className="bg-gray-100 p-2 rounded-md text-xs overflow-x-auto max-h-40">
                  {JSON.stringify(selectedLog.request_data, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Response Data:</h3>
                <pre className="bg-gray-100 p-2 rounded-md text-xs overflow-x-auto max-h-48">
                  {JSON.stringify(selectedLog.response_data, null, 2)}
                </pre>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                <p>User: {selectedLog.user_email || 'Anonymous'}</p>
                <p>Time: {selectedLog.execution_time_ms}ms</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-500">Select a log to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}