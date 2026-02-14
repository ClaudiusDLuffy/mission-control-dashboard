'use client';

import { Task, Executive } from '@/types/executive';
import { TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react';

interface ProgressSummaryProps {
  tasks: Task[];
  executives: Executive[];
  selectedExecutive: string | null;
}

export default function ProgressSummary({ tasks, executives, selectedExecutive }: ProgressSummaryProps) {
  const filteredTasks = selectedExecutive 
    ? tasks.filter(task => task.assignedTo === selectedExecutive)
    : tasks;

  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate per-executive stats
  const executiveStats = executives.map(exec => {
    const execTasks = selectedExecutive 
      ? (selectedExecutive === exec.id ? filteredTasks : [])
      : tasks.filter(task => task.assignedTo === exec.id);
    const completed = execTasks.filter(task => task.status === 'completed').length;
    const total = execTasks.length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      executive: exec,
      totalTasks: total,
      completedTasks: completed,
      completionRate: rate
    };
  }).filter(stat => stat.totalTasks > 0);

  const selectedExec = selectedExecutive ? executives.find(e => e.id === selectedExecutive) : null;

  // Calculate progress for the circular progress bar
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  return (
    <div className="progress-summary">
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Main Progress Circle */}
        <div className="progress-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              {selectedExec ? `${selectedExec.name}'s Progress` : 'Overall Progress'}
            </h3>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgb(71 85 105)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgb(59 130 246)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{completionRate}%</div>
                  <div className="text-xs text-slate-400">Complete</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-slate-300">
            <p className="text-2xl font-bold text-white mb-1">{completedTasks} of {totalTasks}</p>
            <p className="text-sm">Tasks Completed</p>
          </div>
        </div>

        {/* Task Breakdown */}
        <div className="progress-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Task Breakdown</h3>
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-slate-300">In Progress</span>
              </div>
              <span className="text-xl font-bold text-white">{inProgressTasks}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                <span className="text-slate-300">Completed</span>
              </div>
              <span className="text-xl font-bold text-white">{completedTasks}</span>
            </div>

            {/* Priority breakdown for filtered tasks */}
            <div className="pt-4 border-t border-slate-600/50">
              <div className="text-sm text-slate-400 mb-3">By Priority</div>
              {['high', 'medium', 'low'].map(priority => {
                const count = filteredTasks.filter(task => task.priority === priority).length;
                const color = priority === 'high' ? 'text-red-400' : priority === 'medium' ? 'text-yellow-400' : 'text-emerald-400';
                return (
                  <div key={priority} className="flex justify-between items-center text-sm">
                    <span className={`capitalize ${color}`}>{priority}</span>
                    <span className="text-slate-300">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="progress-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              {selectedExec ? 'Executive Stats' : 'Team Performance'}
            </h3>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          
          <div className="space-y-4">
            {selectedExec ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {selectedExec.avatar}
                </div>
                <h4 className="font-semibold text-white mb-1">{selectedExec.name}</h4>
                <p className="text-sm text-slate-400 mb-4">{selectedExec.title}</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">{totalTasks}</div>
                    <div className="text-xs text-slate-400">Total Tasks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">{completionRate}%</div>
                    <div className="text-xs text-slate-400">Success Rate</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {executiveStats.slice(0, 4).map(stat => (
                  <div key={stat.executive.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        {stat.executive.avatar}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{stat.executive.name}</div>
                        <div className="text-xs text-slate-400">{stat.completedTasks}/{stat.totalTasks} tasks</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{stat.completionRate}%</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {selectedExec ? `${selectedExec.name}'s Task Completion` : 'Overall Team Progress'}
          </h3>
          <span className="text-slate-400 text-sm">{completionRate}% Complete</span>
        </div>
        
        <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${completionRate}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}