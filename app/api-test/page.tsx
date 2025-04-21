'use client';

import React, { useState } from 'react';

export default function ApiTestPage() {
  const [inputText, setInputText] = useState('');
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseData(null);
    
    try {
      let response;
      
      if (method === 'GET') {
        const url = `/api/echo?text=${encodeURIComponent(inputText)}`;
        response = await fetch(url);
      } else {
        response = await fetch('/api/echo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputText }),
        });
      }
      
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error calling API:', error);
      setResponseData({ error: 'Failed to call API' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">API Echo Test</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-1">
              Enter text to echo:
            </label>
            <input
              type="text"
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type something..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Request Method:
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={method === 'GET'}
                  onChange={() => setMethod('GET')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2">GET</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={method === 'POST'}
                  onChange={() => setMethod('POST')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2">POST</span>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">API Response</h2>
        
        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : responseData ? (
          <div>
            <h3 className="font-medium text-lg mb-2">Response Data:</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-gray-500">Send a request to see the response</p>
        )}
      </div>
    </div>
  );
}