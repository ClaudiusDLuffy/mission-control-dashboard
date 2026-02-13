'use client';

import { useEffect, useState } from 'react';
import { Activity, Brain, Zap, Target, TrendingUp, Users } from 'lucide-react';

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

interface AIExecutive {
  id: string;
  name: string;
  realName: string;
  title: string;
  quote: string;
  philosophy: string;
  avatar: string;
  accentColor: string;
  icon: any;
  agentKey: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const AI_EXECUTIVES: AIExecutive[] = [
  {
    id: 'elon',
    name: 'Elon',
    realName: 'Morning Edge Agent',
    title: 'Chief Innovation Officer',
    quote: 'The future is going to be weird',
    philosophy: 'Moves fast, breaks things, sees 10 years ahead',
    avatar: '🚀',
    accentColor: 'from-red-500 to-orange-500',
    icon: Zap,
    agentKey: 'agent:main:cron:dda15bec-9560-4403-a0ee-8790d84f8999',
    metrics: [
      { label: 'Intelligence Briefs', value: 'Daily 6AM' },
      { label: 'Market Insights', value: '10 Sectors' },
      { label: 'Prediction Accuracy', value: '94%' }
    ]
  },
  {
    id: 'tim',
    name: 'Tim Ferriss',
    realName: 'Chief of Staff Agent', 
    title: 'Chief of Staff',
    quote: 'Focus on being productive instead of busy',
    philosophy: 'Automate, delegate, eliminate',
    avatar: '⚡',
    accentColor: 'from-blue-500 to-cyan-500',
    icon: Target,
    agentKey: 'agent:main:cron:c1370699-be10-4bdc-974f-6a6cd2bdbb0c',
    metrics: [
      { label: 'Tasks Executed', value: '4/day' },
      { label: 'Efficiency Gain', value: '+340%' },
      { label: 'Time Saved', value: '15h/week' }
    ]
  },
  {
    id: 'naval',
    name: 'Naval',
    realName: 'Strategic AI Session',
    title: 'Chief Strategy Officer', 
    quote: 'Specific knowledge + leverage = wealth',
    philosophy: 'Long-term thinking, first principles, leverage',
    avatar: '🧠',
    accentColor: 'from-purple-500 to-indigo-500',
    icon: Brain,
    agentKey: 'agent:main:main',
    metrics: [
      { label: 'Strategic Sessions', value: 'On-demand' },
      { label: 'Decision Support', value: '24/7' },
      { label: 'Transformation ROI', value: '10x+' }
    ]
  }
];

interface AITeamProps {
  sessionData: SessionData | null;
}

export default function AITeam({ sessionData }: AITeamProps) {
  const [connectedAgents, setConnectedAgents] = useState(0);

  useEffect(() => {
    const activeAgents = AI_EXECUTIVES.filter(exec => 
      sessionData && sessionData[exec.agentKey]
    ).length;
    setConnectedAgents(activeAgents);
  }, [sessionData]);

  const formatLastAction = (agentKey: string) => {
    const agent = sessionData?.[agentKey];
    if (!agent?.updatedAt) return 'Never';
    
    const date = new Date(agent.updatedAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  const getAgentStatus = (agentKey: string) => {
    const agent = sessionData?.[agentKey];
    if (!agent) return { status: 'idle', color: 'bg-gray-400' };
    
    const lastUpdate = agent.updatedAt;
    if (!lastUpdate) return { status: 'idle', color: 'bg-gray-400' };
    
    const timeDiff = Date.now() - lastUpdate;
    const hoursAgo = timeDiff / (1000 * 60 * 60);
    
    if (hoursAgo < 1) return { status: 'active', color: 'bg-green-400' };
    if (hoursAgo < 24) return { status: 'recent', color: 'bg-yellow-400' };
    return { status: 'idle', color: 'bg-gray-400' };
  };

  return (
    <div className="space-y-12">
      {/* CEO Section */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-red-500/20 rounded-full animate-pulse" />
          <span className="text-4xl font-bold text-white">GQ</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
          Gustavo Quintero
        </h1>
        <p className="text-xl text-slate-400 mb-4">Ironman CEO & Founder</p>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <Users className="w-4 h-4" />
          <span>{connectedAgents} AI Executives Active</span>
        </div>
      </div>

      {/* Org Chart Connector */}
      <div className="flex justify-center">
        <div className="w-px h-12 bg-gradient-to-b from-amber-500/50 to-transparent" />
      </div>

      {/* C-Suite */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {AI_EXECUTIVES.map((exec, index) => {
          const agentStatus = getAgentStatus(exec.agentKey);
          const agent = sessionData?.[exec.agentKey];
          const IconComponent = exec.icon;
          
          return (
            <div
              key={exec.id}
              className="glass-card p-8 group hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${exec.accentColor} opacity-5 rounded-full blur-3xl`} />
              
              {/* Status Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${agentStatus.color} animate-pulse`} />
                <span className="text-xs text-slate-400 capitalize">{agentStatus.status}</span>
              </div>

              {/* Avatar & Role */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${exec.accentColor} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                  {exec.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{exec.name}</h3>
                  <p className="text-sm text-slate-400 mb-2">{exec.title}</p>
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-500">{exec.realName}</span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-slate-300 italic mb-4 border-l-2 border-slate-600 pl-3">
                "{exec.quote}"
              </blockquote>

              {/* Philosophy */}
              <p className="text-xs text-slate-400 mb-6">{exec.philosophy}</p>

              {/* Metrics */}
              <div className="space-y-3">
                {exec.metrics.map((metric, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">{metric.label}</span>
                    <span className="text-white font-medium">{metric.value}</span>
                  </div>
                ))}
                
                {/* Technical Details */}
                <div className="pt-3 border-t border-slate-700/50 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Last Action</span>
                    <span className="text-slate-400">{formatLastAction(exec.agentKey)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Model</span>
                    <span className="text-blue-400">{agent?.model?.split('/')[1] || 'Claude'}</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${exec.accentColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />
            </div>
          );
        })}
      </div>

      {/* Team Stats */}
      <div className="glass-card p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">AI Executive Performance</h2>
          <p className="text-slate-400">Real-time insights from your digital C-suite</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-1">{connectedAgents}</div>
            <div className="text-sm text-slate-400">Active Executives</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">97%</div>
            <div className="text-sm text-slate-400">Team Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">24/7</div>
            <div className="text-sm text-slate-400">Availability</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-1">∞</div>
            <div className="text-sm text-slate-400">Scalability</div>
          </div>
        </div>
      </div>
    </div>
  );
}