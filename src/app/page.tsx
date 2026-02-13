'use client';

import { useEffect, useState } from 'react';
import { Activity, Zap, Brain, Clock, TrendingUp, Shield, Crown } from 'lucide-react';
import AITeam from '@/components/AITeam';

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
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8 text-amber-400" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  AI Dream Team
                </h1>
              </div>
              <p className="text-slate-400 font-medium">
                Your Elite AI Executive Squadron • Mission Control HQ
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

      {/* AI Dream Team Dashboard */}
      <main className="relative z-10 container mx-auto px-8 py-12">
        {/* AI Dream Team Org Chart */}
        <AITeam sessionData={sessionData} />

        {/* Technical Debug Panel (Collapsible) */}
        <details className="mt-16">
          <summary className="cursor-pointer text-slate-400 hover:text-white transition-colors mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Technical Debug Panel</span>
          </summary>
          <div className="glass-card p-6">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <pre className="text-xs text-slate-300 overflow-auto max-h-64 leading-relaxed">
{JSON.stringify(sessionData, null, 2)}
              </pre>
            </div>
          </div>
        </details>

        {/* Command Center Footer */}
        <div className="text-center py-12 mt-16 border-t border-white/10">
          <p className="text-slate-400 mb-2">
            <span className="text-amber-400 font-semibold">AI Dream Team</span> • 
            Elite Executive Squadron • From 284 lbs to Ironman CEO
          </p>
          <p className="text-xs text-slate-500">
            "I can do all things through Christ who strengthens me." — Philippians 4:13
          </p>
        </div>
      </main>
    </div>
  );
}