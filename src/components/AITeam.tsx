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
  status: string;
  avatar: string;
  accentColor: string;
  icon: any;
  agentKey: string;
  metrics: {
    efficiency: string;
    uptime: string;
    tasks: string;
  };
}

const AI_EXECUTIVES: AIExecutive[] = [
  {
    id: 'elon',
    name: 'ELON',
    realName: 'Morning Edge Agent',
    title: 'Chief Innovation Officer',
    status: 'OPERATIONAL',
    avatar: '🚀',
    accentColor: 'text-orange-400',
    icon: Zap,
    agentKey: 'agent:main:cron:dda15bec-9560-4403-a0ee-8790d84f8999',
    metrics: {
      efficiency: '97.3%',
      uptime: '99.8%',
      tasks: '47'
    }
  },
  {
    id: 'tim',
    name: 'TIM FERRISS',
    realName: 'Chief of Staff Agent', 
    title: 'Chief of Staff',
    status: 'OPERATIONAL',
    avatar: '⚡',
    accentColor: 'text-blue-400',
    icon: Target,
    agentKey: 'agent:main:cron:c1370699-be10-4bdc-974f-6a6cd2bdbb0c',
    metrics: {
      efficiency: '94.1%',
      uptime: '98.9%',
      tasks: '23'
    }
  },
  {
    id: 'naval',
    name: 'NAVAL',
    realName: 'Strategic AI Session',
    title: 'Chief Strategy Officer', 
    status: 'OPERATIONAL',
    avatar: '🧠',
    accentColor: 'text-purple-400',
    icon: Brain,
    agentKey: 'agent:main:main',
    metrics: {
      efficiency: '91.7%',
      uptime: '99.9%',
      tasks: '12'
    }
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
    if (!agent?.updatedAt) return 'OFFLINE';
    
    const date = new Date(agent.updatedAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'ACTIVE';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return 'STANDBY';
  };

  const getAgentStatusColor = (agentKey: string) => {
    const lastAction = formatLastAction(agentKey);
    if (lastAction === 'ACTIVE') return 'bg-emerald-400';
    if (lastAction === 'OFFLINE') return 'bg-red-400';
    return 'bg-yellow-400';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {AI_EXECUTIVES.map((exec, index) => {
        const lastAction = formatLastAction(exec.agentKey);
        const statusColor = getAgentStatusColor(exec.agentKey);
        const IconComponent = exec.icon;
        
        return (
          <div key={exec.id} className="enterprise-kpi-card">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-800/50 border border-slate-600/30 flex items-center justify-center text-xl">
                  {exec.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-wider">
                    {exec.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {exec.title}
                  </div>
                </div>
              </div>
              
              {/* Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statusColor}`} />
                <span className="text-xs font-medium text-slate-300">
                  {lastAction}
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {exec.metrics.efficiency}
                </div>
                <div className="text-xs text-slate-400">
                  Efficiency
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {exec.metrics.uptime}
                </div>
                <div className="text-xs text-slate-400">
                  Uptime
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {exec.metrics.tasks}
                </div>
                <div className="text-xs text-slate-400">
                  Tasks
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${85 + index * 5}%` }}
              />
            </div>

            {/* Technical Info */}
            <div className="mt-3 pt-3 border-t border-slate-700/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{exec.realName}</span>
                <span className="text-slate-400">
                  {sessionData?.[exec.agentKey]?.model?.split('/')[1] || 'Claude'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}