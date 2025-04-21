'use client';

import React from 'react';
import { DataItem } from '@/types/data';

interface DataTableProps {
  data: DataItem[];
}

export default function DataTable({ data }: DataTableProps) {
  return (
    <div className="overflow-x-auto border rounded shadow">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b p-3 text-left">ID</th>
            <th className="border-b p-3 text-left">Name</th>
            <th className="border-b p-3 text-left">Description</th>
            {/* Add or modify columns based on your actual data structure */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border-b p-3">{item.id}</td>
              <td className="border-b p-3">{item.name}</td>
              <td className="border-b p-3">{item.description}</td>
              {/* Add or modify cells based on your actual data structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}