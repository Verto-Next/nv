'use client';

import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

interface UserCount {
  username: string;
  count: number;
}

export default function ChartsPage() {
  const [userData, setUserData] = useState<UserCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const response = await fetch('/api/user-counts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch user count data');
        }
        
        const result = await response.json();
        setUserData(result.data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching user counts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCounts();
  }, []);

  const getBarChartOptions = (): EChartsOption => {
    // Prepare data for chart
    const names = userData.map(item => item.username);
    const counts = userData.map(item => item.count);

    return {
      title: {
        text: 'User Count by Username',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: names,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: 'Count',
        nameLocation: 'middle',
        nameGap: 30
      },
      series: [
        {
          name: 'User Count',
          type: 'bar',
          barWidth: '60%',
          data: counts,
          itemStyle: {
            color: function(params: any) {
              // Generate colors based on index
              const colorList = [
                '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
                '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
              ];
              return colorList[params.dataIndex % colorList.length];
            }
          }
        }
      ]
    };
  };

  const getPieChartOptions = (): EChartsOption => {
    // Prepare data for chart
    const pieData = userData.map(item => ({
      name: item.username,
      value: item.count
    }));

    return {
      title: {
        text: 'User Distribution',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'User Count',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="font-bold">Error Loading Chart Data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!userData.length) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <h2 className="font-bold">No Data Available</h2>
          <p>There is no user data available to display in the chart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">User Statistics Charts</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ReactECharts 
            option={getBarChartOptions()} 
            style={{ height: '400px' }}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ReactECharts 
            option={getPieChartOptions()} 
            style={{ height: '400px' }}
          />
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">User Count Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b p-3 text-left">Username</th>
                <th className="border-b p-3 text-left">Count</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-b p-3">{item.username}</td>
                  <td className="border-b p-3">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}