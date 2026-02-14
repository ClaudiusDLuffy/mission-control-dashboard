'use client';

import { useEffect, useState } from 'react';
import { Activity, TrendingUp, Target, Users, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import AITeam from '../components/AITeam';
import { mockDashboardData } from '../data/mockData';

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

interface KPICard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: any;
  subtitle: string;
}

export default function Home() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  
  // Dashboard data
  const [dashboardData, setDashboardData] = useState(mockDashboardData());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/sessions/latest`);
        const data = await response.json();
        setSessionData(data);
        setConnectionStatus('connected');
      } catch (error) {
        console.error('Error fetching data:', error);
        setConnectionStatus('error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  // Enterprise KPI Cards Data
  const kpiCards: KPICard[] = [
    {
      title: 'OPERATIONS EFFICIENCY',
      value: '94.7%',
      change: '+2.3%',
      changeType: 'positive',
      icon: Activity,
      subtitle: 'Task completion rate across all systems'
    },
    {
      title: 'REVENUE PIPELINE',
      value: '$127.5K',
      change: '+18.2%',
      changeType: 'positive', 
      icon: TrendingUp,
      subtitle: 'MYAMZTEAM + Magical Brands combined'
    },
    {
      title: 'AI INTELLIGENCE SCORE',
      value: '8.9/10',
      change: '+0.4',
      changeType: 'positive',
      icon: Zap,
      subtitle: 'System automation & decision support'
    },
    {
      title: 'ACTIVE OBJECTIVES',
      value: '12',
      change: '-2',
      changeType: 'positive',
      icon: Target,
      subtitle: 'High-priority initiatives in progress'
    },
    {
      title: 'TRANSFORMATION INDEX',
      value: '195 lbs',
      change: '-90 lbs',
      changeType: 'positive',
      icon: CheckCircle2,
      subtitle: 'Physical & business transformation'
    },
    {
      title: 'SYSTEM UPTIME',
      value: '99.8%',
      change: '0.0%',
      changeType: 'neutral',
      icon: Users,
      subtitle: 'AI agents & infrastructure status'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-slate-200">Initializing Command Center</h2>
          <p className="text-slate-400 text-sm mt-1">Enterprise Intelligence Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-[#1a1f2e]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">
                KEY PERFORMANCE INDICATORS
              </h1>
              <p className="text-slate-400 text-sm font-medium mt-1">
                Command Center Enterprise Intelligence • Live Data • {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">LIVE</span>
              </div>
              <div className="text-xs text-slate-500">
                <div>OPERATIONS & INTELLIGENCE</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {kpiCards.map((kpi, index) => (
            <div key={index} className="enterprise-kpi-card group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <kpi.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-300 tracking-wider mb-1">
                      {kpi.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {kpi.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Change Indicator */}
                <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                  kpi.changeType === 'positive' 
                    ? 'text-emerald-400 bg-emerald-500/10' 
                    : kpi.changeType === 'negative'
                    ? 'text-red-400 bg-red-500/10'
                    : 'text-slate-400 bg-slate-500/10'
                }`}>
                  {kpi.changeType === 'positive' ? '↗' : kpi.changeType === 'negative' ? '↘' : '→'}
                  {kpi.change}
                </div>
              </div>
              
              {/* Value */}
              <div className="mb-4">
                <div className="text-3xl font-bold text-white mb-1">
                  {kpi.value}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${75 + index * 5}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Operations Status */}
          <div className="enterprise-panel">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">OPERATIONS STATUS</h2>
              <div className="text-xs text-slate-400">Real-time monitoring</div>
            </div>
            
            <div className="space-y-4">
              {[
                { system: 'MYAMZTEAM Operations', status: 'OPERATIONAL', uptime: '99.9%', color: 'emerald' },
                { system: 'Magical Brands Pipeline', status: 'OPERATIONAL', uptime: '98.7%', color: 'emerald' },
                { system: 'AI Intelligence Network', status: 'OPERATIONAL', uptime: '99.8%', color: 'emerald' },
                { system: 'Training Systems', status: 'MAINTENANCE', uptime: '95.2%', color: 'yellow' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.color === 'emerald' ? 'bg-emerald-400' :
                      item.color === 'yellow' ? 'bg-yellow-400' : 'bg-red-400'
                    }`} />
                    <span className="text-sm font-medium text-white">{item.system}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400">{item.uptime}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                      item.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Intelligence Summary */}
          <div className="enterprise-panel">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">INTELLIGENCE SUMMARY</h2>
              <div className="text-xs text-slate-400">Last updated: {new Date().toLocaleTimeString()}</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div>
                  <div className="text-sm font-medium text-white">Active AI Executives</div>
                  <div className="text-xs text-slate-400">Elon, Tim Ferriss, Naval</div>
                </div>
                <div className="text-2xl font-bold text-blue-400">3</div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div>
                  <div className="text-sm font-medium text-white">Decisions Processed</div>
                  <div className="text-xs text-slate-400">Today's AI recommendations</div>
                </div>
                <div className="text-2xl font-bold text-emerald-400">47</div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div>
                  <div className="text-sm font-medium text-white">Automation Score</div>
                  <div className="text-xs text-slate-400">Process efficiency rating</div>
                </div>
                <div className="text-2xl font-bold text-purple-400">92%</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Team Status - Minimized */}
        <div className="enterprise-panel">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">AI EXECUTIVE TEAM STATUS</h2>
            <div className="text-xs text-slate-400">Command & Control Network</div>
          </div>
          
          <AITeam sessionData={sessionData} />
        </div>
      </main>
    </div>
  );
}