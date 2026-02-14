'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, ShoppingCart, Users, Target, BarChart3, DollarSign } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SessionData {
  'agent:main:main'?: {
    updatedAt?: number;
    model?: string;
  };
  'agent:main:cron:dda15bec-9560-4403-a0ee-8790d84f8999'?: {
    updatedAt?: number;
    model?: string;
  };
  'agent:main:cron:c1370699-be10-4bdc-974f-6a6cd2bdbb0c'?: {
    updatedAt?: number;
    model?: string;
  };
  [key: string]: any;
}

interface ChannelData {
  name: string;
  code: string;
  description: string;
  revenue: string;
  percentage: number;
  color: string;
  icon: string;
}

interface KPIMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  subtitle: string;
  color: string;
}

export default function Home() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
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
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Channel Breakdown Data (MYAMZTEAM + Magical Brands)
  const channels: ChannelData[] = [
    {
      name: 'Amazon',
      code: 'A',
      description: 'US, CA, MX, EU',
      revenue: '$1.53M',
      percentage: 62,
      color: 'bg-orange-500',
      icon: 'A'
    },
    {
      name: 'Walmart',
      code: 'W', 
      description: 'WFS + 1P',
      revenue: '$518K',
      percentage: 21,
      color: 'bg-blue-500',
      icon: 'W'
    },
    {
      name: 'DTC / Shopify',
      code: 'D',
      description: '6 storefronts',
      revenue: '$296K',
      percentage: 12,
      color: 'bg-purple-500',
      icon: 'D'
    },
    {
      name: 'eBay + Other',
      code: 'E',
      description: 'Marketplace mix',
      revenue: '$123K',
      percentage: 5,
      color: 'bg-red-500',
      icon: 'E'
    }
  ];

  // KPI Metrics
  const kpiMetrics: KPIMetric[] = [
    {
      title: 'TOTAL REVENUE',
      value: '$2.47M',
      change: '+18.3% vs last month',
      changeType: 'positive',
      subtitle: 'Combined channels',
      color: 'border-blue-500/30 bg-blue-500/10'
    },
    {
      title: 'TOTAL ORDERS',
      value: '14,832',
      change: '+12.1% vs last month',
      changeType: 'positive',
      subtitle: 'All platforms',
      color: 'border-emerald-500/30 bg-emerald-500/10'
    },
    {
      title: 'AVG. TACOS',
      value: '11.4%',
      change: '-2.1pp improved',
      changeType: 'positive',
      subtitle: 'Ad spend efficiency',
      color: 'border-orange-500/30 bg-orange-500/10'
    },
    {
      title: 'ACTIVE CLIENTS',
      value: '38',
      change: '+6 new this quarter',
      changeType: 'positive',
      subtitle: 'MYAMZTEAM agency',
      color: 'border-purple-500/30 bg-purple-500/10'
    }
  ];

  // Revenue trend data (12 months)
  const revenueData = [
    { month: 'Jan', value: 1.2 },
    { month: 'Feb', value: 1.1 },
    { month: 'Mar', value: 1.4 },
    { month: 'Apr', value: 1.3 },
    { month: 'May', value: 1.6 },
    { month: 'Jun', value: 1.8 },
    { month: 'Jul', value: 1.7 },
    { month: 'Aug', value: 2.0 },
    { month: 'Sep', value: 2.1 },
    { month: 'Oct', value: 2.3 },
    { month: 'Nov', value: 2.4 },
    { month: 'Dec', value: 2.47 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1f2e] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-400 text-sm">Loading Command Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white">
      {/* Mobile Header */}
      <header className="border-b border-slate-700/50 bg-[#232937]">
        <div className="flex items-center justify-between p-4">
          <button className="w-8 h-8 rounded-full bg-slate-600/50 flex items-center justify-center">
            <span className="text-slate-300">×</span>
          </button>
          <div className="text-center">
            <h1 className="text-white font-medium">enterprise-dashboard</h1>
          </div>
          <button className="w-8 h-8 rounded-full bg-slate-600/50 flex items-center justify-center">
            <span className="text-slate-300">⋯</span>
          </button>
        </div>
      </header>

      {/* Command Center Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 font-bold">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Command<br/>Center
              </h1>
              <p className="text-slate-400 text-sm">
                Enterprise<br/>Intelligence
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="text-emerald-400 text-sm font-medium">Live Data</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-slate-700/50 border border-slate-600/50">
              <span className="text-slate-300 text-sm">Feb<br/>2026</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">GA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Breakdown */}
      <div className="px-6 mb-8">
        <div className="bg-[#232937] rounded-2xl p-6 border border-slate-700/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Channel Breakdown</h2>
            <span className="text-blue-400 text-sm font-medium">MTD</span>
          </div>
          
          <div className="space-y-5">
            {channels.map((channel, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg ${channel.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{channel.icon}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-lg">{channel.name}</div>
                    <div className="text-slate-400 text-sm">{channel.description}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-bold text-xl">{channel.revenue}</div>
                  <div className="text-emerald-400 text-sm">{channel.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="px-6 mb-8">
        <div className="bg-[#232937] rounded-2xl p-6 border border-slate-700/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Top Products</h2>
            <span className="text-blue-400 text-sm">By Revenue</span>
          </div>
          
          <div className="flex justify-between text-slate-400 text-sm mb-4">
            <span>PRODUCT</span>
            <span>REVENUE STATUS</span>
          </div>
          
          {/* Product list would go here */}
          <div className="h-32 flex items-center justify-center">
            <span className="text-slate-500 text-sm">Product data loading...</span>
          </div>
        </div>
      </div>

      {/* Operations & Intelligence Label */}
      <div className="px-6 mb-4">
        <h3 className="text-slate-500 text-xs font-medium tracking-wider uppercase">
          OPERATIONS & INTELLIGENCE
        </h3>
      </div>

      {/* Key Performance Indicators */}
      <div className="px-6 mb-8">
        <div className="bg-[#232937] rounded-2xl p-6 border border-slate-700/30">
          <h2 className="text-slate-400 text-sm font-medium mb-6 tracking-wider uppercase">
            KEY PERFORMANCE INDICATORS
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {kpiMetrics.map((metric, index) => (
              <div key={index} className={`p-4 rounded-2xl border ${metric.color}`}>
                <div className="text-slate-400 text-xs font-medium mb-2 uppercase">
                  {metric.title}
                </div>
                <div className="text-white text-3xl font-bold mb-2">
                  {metric.value}
                </div>
                <div className={`text-sm flex items-center gap-1 ${
                  metric.changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  <span>{metric.changeType === 'positive' ? '▲' : '▼'}</span>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="px-6 pb-8">
        <div className="bg-[#232937] rounded-2xl p-6 border border-slate-700/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-bold">Revenue Trend — 12 Month</h2>
            <span className="text-blue-400 text-sm">All Channels</span>
          </div>
          
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Progress indicator */}
          <div className="w-full h-1 bg-slate-700 rounded-full mt-4">
            <div className="w-4/5 h-full bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}