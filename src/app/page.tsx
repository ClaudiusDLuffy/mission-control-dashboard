'use client';

import { useEffect, useState } from 'react';
import { Activity, Zap, Brain, Clock, TrendingUp, Shield } from 'lucide-react';

interface SessionData {
  'agent:main:main'?: {
    updatedAt?: number;
    model?: string;
  };
  [key: string]: any;
}

export default function Home() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

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
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatLastUpdate = (timestamp?: number) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center relative overflow-hidden">
        {/* Elite Loading Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-emerald-600/5" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(59,130,246,0.15)_0%,_transparent_50%)]" />
        </div>
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Initializing Mission Control
          </h2>
          <p className="text-slate-400 mt-2">Connecting to OpenClaw intelligence systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      {/* Elite Background System */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-emerald-600/5" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(59,130,246,0.15)_0%,_transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(147,51,234,0.15)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_100%,_rgba(16,185,129,0.1)_0%,_transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Mission Control
              </h1>
              <p className="text-slate-400 font-medium">
                Gustavo Quintero • Director & Ironman
              </p>
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-full border backdrop-blur-sm $\{
                connectionStatus === 'connected' 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : connectionStatus === 'error'
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse $\{
                    connectionStatus === 'connected' ? 'bg-emerald-400' 
                    : connectionStatus === 'error' ? 'bg-red-400' 
                    : 'bg-yellow-400'
                  }`} />
                  <span className="text-sm font-medium capitalize">{connectionStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="relative z-10 container mx-auto px-8 py-12">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* OpenClaw Connection */}
          <div className="glass-card p-8 group">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-colors">
                <Brain className="w-7 h-7 text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">AI</div>
                <div className="text-sm text-emerald-400 font-medium">Active</div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">OpenClaw Intelligence</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-emerald-400 font-medium">✅ Operational</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Sync</span>
                  <span className="text-white">
                    {formatLastUpdate(sessionData?.['agent:main:main']?.updatedAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Model</span>
                  <span className="text-blue-400 font-medium">
                    {sessionData?.['agent:main:main']?.model?.split('/')[1] || 'Claude'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="glass-card p-8 group">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-colors">
                <Activity className="w-7 h-7 text-purple-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {sessionData ? Object.keys(sessionData).length : 0}
                </div>
                <div className="text-sm text-purple-400 font-medium">Sessions</div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">Active Processes</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex justify-between">
                  <span>Morning Edge</span>
                  <span className="text-green-400">✓ 6:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Chief of Staff</span>
                  <span className="text-green-400">✓ 6:05 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Web Intel</span>
                  <span className="text-green-400">✓ Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Performance */}
          <div className="glass-card p-8 group">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 group-hover:from-emerald-500/30 group-hover:to-emerald-600/30 transition-colors">
                <TrendingUp className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">97%</div>
                <div className="text-sm text-emerald-400 font-medium">Uptime</div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">Performance Metrics</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <span className="text-green-400">< 2s</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Accuracy</span>
                  <span className="text-green-400">99.8%</span>
                </div>
                <div className="flex justify-between">
                  <span>Tasks Completed</span>
                  <span className="text-blue-400">24/24</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Status */}
        <div className="glass-card p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">System Intelligence</h2>
            </div>
            <div className="text-sm text-slate-400">
              Real-time OpenClaw data stream
            </div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
            <pre className="text-sm text-slate-300 overflow-auto max-h-96 leading-relaxed">
{JSON.stringify(sessionData, null, 2)}
            </pre>
          </div>
        </div>

        {/* Command Center Footer */}
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-slate-400 mb-2">
            <span className="text-blue-400 font-semibold">Mission Control 2.0</span> • 
            Built for transformation • From 284 lbs to Ironman
          </p>
          <p className="text-xs text-slate-500">
            "I can do all things through Christ who strengthens me." — Philippians 4:13
          </p>
        </div>
      </main>
    </div>
  );
}