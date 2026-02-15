'use client';

import { useState, useEffect } from 'react';
import { aiDreamTeam, aiAgentTasks, agentMetrics, recentDeliverables } from '@/data/aiDreamTeam';
import { Crown, Zap, Brain, Target, FileText, TrendingUp, Clock, CheckCircle2, Download } from 'lucide-react';

export default function AICommandCenter() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'deliverables'>('overview');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = selectedAgent 
    ? aiAgentTasks.filter(task => task.assignedTo === selectedAgent)
    : aiAgentTasks;

  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');
  const totalTasks = filteredTasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  const getAgentIcon = (agentId: string) => {
    switch (agentId) {
      case 'gustavo': return Crown;
      case 'claudius': return Brain;
      case 'elon': return Zap;
      case 'tim': return Target;
      case 'naval': return TrendingUp;
      default: return Brain;
    }
  };

  const getAgentColor = (agentId: string) => {
    switch (agentId) {
      case 'gustavo': return 'from-amber-500 via-orange-500 to-red-500';
      case 'claudius': return 'from-blue-500 via-cyan-500 to-teal-500';
      case 'elon': return 'from-red-500 via-orange-500 to-yellow-500';
      case 'tim': return 'from-blue-500 via-indigo-500 to-purple-500';
      case 'naval': return 'from-purple-500 via-pink-500 to-rose-500';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen ai-command-bg flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400/30 border-b-purple-400 rounded-full animate-spin animate-reverse mx-auto"></div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Dream Team Command Center
          </h2>
          <p className="text-slate-300">Initializing elite AI executive systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ai-command-bg">
      {/* Premium Header */}
      <header className="premium-header">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl relative">
                <Crown className="w-8 h-8 text-white" />
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-2">
                  AI Dream Team
                </h1>
                <p className="text-slate-300 text-lg">Elite Executive Intelligence Squadron</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 rounded-full backdrop-blur-sm">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                <span className="text-emerald-300 font-semibold">LIVE OPERATIONS</span>
              </div>
              <div className="text-slate-400">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Command Dashboard */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Total Tasks */}
          <div className="premium-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-400/30">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{totalTasks}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Total Tasks</div>
              </div>
            </div>
            <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" style={{width: '100%'}} />
            </div>
          </div>

          {/* Completion Rate */}
          <div className="premium-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/30">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{completionRate}%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Success Rate</div>
              </div>
            </div>
            <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse" style={{width: `${completionRate}%`}} />
            </div>
          </div>

          {/* Active Agents */}
          <div className="premium-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{aiDreamTeam.length - 1}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">AI Agents</div>
              </div>
            </div>
            <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{width: '100%'}} />
            </div>
          </div>

          {/* Deliverables */}
          <div className="premium-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-orange-400/30">
                <FileText className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{recentDeliverables.length}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Today's Output</div>
              </div>
            </div>
            <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse" style={{width: '100%'}} />
            </div>
          </div>
        </div>

        {/* AI Dream Team Org Chart */}
        <div className="premium-panel mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-3">
              AI Dream Team Structure
            </h2>
            <p className="text-slate-400">Click any agent to view their active tasks</p>
          </div>

          {/* CEO Level */}
          <div className="flex justify-center mb-16">
            <div 
              className={`agent-card ceo-card ${selectedAgent === 'gustavo' ? 'selected' : ''}`}
              onClick={() => setSelectedAgent(selectedAgent === 'gustavo' ? null : 'gustavo')}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 relative shadow-2xl shadow-orange-500/30">
                GQ
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl blur opacity-30 animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Gustavo Quintero</h3>
              <p className="text-slate-300 text-sm mb-2">Chief Executive Officer</p>
              <p className="text-xs text-slate-400">Ironman • Entrepreneur</p>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="flex justify-center mb-8">
            <div className="w-px h-16 bg-gradient-to-b from-orange-500/60 to-transparent"></div>
          </div>
          <div className="flex justify-center mb-8">
            <div className="w-80 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>
          </div>

          {/* AI Executive Level */}
          <div className="flex justify-center gap-12">
            {aiDreamTeam.filter(agent => agent.reportsTo === 'gustavo').map((agent) => {
              const IconComponent = getAgentIcon(agent.id);
              const metrics = agentMetrics[agent.id as keyof typeof agentMetrics];
              
              return (
                <div 
                  key={agent.id}
                  className={`agent-card ${selectedAgent === agent.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${getAgentColor(agent.id)} rounded-xl flex items-center justify-center text-white text-xl mb-4 relative shadow-2xl`}>
                    {agent.id === 'claudius' ? (
                      <span className="text-lg">🤖</span>
                    ) : (
                      <IconComponent className="w-8 h-8" />
                    )}
                    <div className={`absolute -inset-1 bg-gradient-to-br ${getAgentColor(agent.id)} rounded-xl blur opacity-20 animate-pulse`}></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
                  <p className="text-slate-300 text-sm mb-2">{agent.title}</p>
                  <p className="text-xs text-slate-400 mb-3">{agent.role}</p>
                  
                  {metrics && (
                    <div className="text-center">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-400">Tasks</span>
                        <span className="text-white font-medium">{metrics.tasksCompleted + metrics.tasksInProgress}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Success</span>
                        <span className="text-emerald-400 font-medium">{metrics.successRate}%</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Board */}
        <div className="premium-panel">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                {selectedAgent ? `${aiDreamTeam.find(a => a.id === selectedAgent)?.name}'s Tasks` : 'All Agent Tasks'}
              </h2>
              <p className="text-slate-400">{filteredTasks.length} tasks • {completionRate}% completion rate</p>
            </div>
            {selectedAgent && (
              <button
                onClick={() => setSelectedAgent(null)}
                className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-xl transition-all duration-300 font-medium"
              >
                Show All Tasks
              </button>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* In Progress */}
            <div className="task-column">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold text-white">In Progress</h3>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                  {inProgressTasks.length}
                </span>
              </div>
              
              <div className="space-y-4">
                {inProgressTasks.map(task => {
                  const agent = aiDreamTeam.find(a => a.id === task.assignedTo);
                  const IconComponent = getAgentIcon(task.assignedTo);
                  
                  return (
                    <div key={task.id} className="task-card-premium">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            task.priority === 'high' ? 'bg-red-400' :
                            task.priority === 'medium' ? 'bg-yellow-400' : 'bg-emerald-400'
                          }`}></div>
                          <span className={`text-xs font-bold uppercase tracking-wide ${
                            task.priority === 'high' ? 'text-red-400' :
                            task.priority === 'medium' ? 'text-yellow-400' : 'text-emerald-400'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        {agent && (
                          <div className={`w-8 h-8 bg-gradient-to-br ${getAgentColor(agent.id)} rounded-lg flex items-center justify-center text-white text-sm relative`}>
                            {agent.id === 'claudius' ? '🤖' : <IconComponent className="w-4 h-4" />}
                          </div>
                        )}
                      </div>
                      
                      <h4 className="text-white font-semibold text-lg mb-2 leading-tight">{task.title}</h4>
                      <p className="text-slate-300 text-sm mb-4 leading-relaxed">{task.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                        <span className="bg-slate-700/50 px-2 py-1 rounded">{task.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Completed */}
            <div className="task-column">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
                <h3 className="text-xl font-bold text-white">Completed</h3>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                  {completedTasks.length}
                </span>
              </div>
              
              <div className="space-y-4">
                {completedTasks.map(task => {
                  const agent = aiDreamTeam.find(a => a.id === task.assignedTo);
                  const IconComponent = getAgentIcon(task.assignedTo);
                  
                  return (
                    <div key={task.id} className="task-card-premium completed">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-bold uppercase tracking-wide text-emerald-400">
                            COMPLETED
                          </span>
                        </div>
                        {agent && (
                          <div className={`w-8 h-8 bg-gradient-to-br ${getAgentColor(agent.id)} rounded-lg flex items-center justify-center text-white text-sm relative opacity-75`}>
                            {agent.id === 'claudius' ? '🤖' : <IconComponent className="w-4 h-4" />}
                          </div>
                        )}
                      </div>
                      
                      <h4 className="text-slate-300 font-semibold text-lg mb-2 leading-tight">{task.title}</h4>
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{task.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Completed {task.completedAt ? new Date(task.completedAt).toLocaleDateString() : 'Today'}</span>
                        </div>
                        <span className="bg-slate-700/30 px-2 py-1 rounded">{task.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Deliverables */}
        <div className="premium-panel mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                Recent Deliverables
              </h2>
              <p className="text-slate-400">AI-generated content and analysis delivered today</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDeliverables.map(deliverable => {
              const agent = aiDreamTeam.find(a => a.id === deliverable.agent);
              const IconComponent = getAgentIcon(deliverable.agent);
              
              return (
                <div key={deliverable.id} className="deliverable-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-br ${getAgentColor(deliverable.agent)} rounded-lg flex items-center justify-center text-white relative`}>
                      {deliverable.agent === 'claudius' ? '🤖' : <IconComponent className="w-5 h-5" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        deliverable.type === 'pdf' ? 'bg-red-500/20 text-red-400' :
                        deliverable.type === 'analysis' ? 'bg-blue-500/20 text-blue-400' :
                        deliverable.type === 'content' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {deliverable.type.toUpperCase()}
                      </span>
                      {deliverable.fileUrl && (
                        <button className="p-1 hover:bg-slate-700/50 rounded">
                          <Download className="w-4 h-4 text-slate-400" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <h4 className="text-white font-semibold mb-2">{deliverable.title}</h4>
                  <p className="text-slate-400 text-sm mb-3 leading-relaxed">{deliverable.summary}</p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>by {agent?.name}</span>
                    <span>{new Date(deliverable.deliveredAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}