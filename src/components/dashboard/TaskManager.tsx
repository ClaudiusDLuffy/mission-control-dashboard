'use client';

import { useState, useMemo } from 'react';
import { CheckCircle2, Clock, AlertTriangle, Plus, Filter, Calendar, User, Bot } from 'lucide-react';
import type { Task, TaskStatus, Priority } from '@/types';

interface TaskManagerProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, status: TaskStatus) => void;
  onAddTask: () => void;
}

export default function TaskManager({ tasks, onTaskUpdate, onAddTask }: TaskManagerProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'chief-of-staff' | 'personal'>('all');

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by tab
    if (activeTab === 'active') {
      filtered = filtered.filter(task => task.status !== 'completed');
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(task => task.status === 'completed');
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(task => task.type === typeFilter);
    }

    return filtered.sort((a, b) => {
      // Sort by status, then priority, then due date
      const statusOrder = { 'urgent': 0, 'in-progress': 1, 'todo': 2, 'completed': 3 };
      const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'low': 3 };
      
      if (a.status !== b.status) {
        return (statusOrder[a.status as keyof typeof statusOrder] || 4) - (statusOrder[b.status as keyof typeof statusOrder] || 4);
      }
      
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      
      return 0;
    });
  }, [tasks, activeTab, priorityFilter, typeFilter]);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-400" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-400" />;
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffMs < 0) {
      return { text: 'Overdue', color: 'text-red-400' };
    } else if (diffHours < 24) {
      return { text: `${diffHours}h`, color: 'text-orange-400' };
    } else if (diffDays < 7) {
      return { text: `${diffDays}d`, color: 'text-yellow-400' };
    } else {
      return { text: date.toLocaleDateString(), color: 'text-slate-400' };
    }
  };

  const activeTasksCount = tasks.filter(t => t.status !== 'completed').length;
  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  return (
    <div className="glass-card p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Mission Control Tasks</h2>
          <p className="text-slate-400">
            {completionRate}% completion rate • {activeTasksCount} active • {completedTasksCount} completed
          </p>
        </div>
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-slate-700/50">
        {/* Status Tabs */}
        <div className="flex rounded-lg bg-slate-800/50 p-1">
          {[
            { id: 'active', label: 'Active', count: activeTasksCount },
            { id: 'completed', label: 'Completed', count: completedTasksCount },
            { id: 'all', label: 'All', count: tasks.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          
          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
            className="bg-slate-800 border border-slate-600 text-white rounded-md px-3 py-1 text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">🔴 Urgent</option>
            <option value="high">🟡 High</option>
            <option value="medium">🟢 Medium</option>
            <option value="low">⚫ Low</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="bg-slate-800 border border-slate-600 text-white rounded-md px-3 py-1 text-sm"
          >
            <option value="all">All Types</option>
            <option value="chief-of-staff">🤖 Claudius</option>
            <option value="personal">👤 Personal</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-400">No tasks found</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const dueInfo = task.dueDate ? formatDueDate(task.dueDate) : null;
            const isOverdue = task.dueDate && task.dueDate < new Date() && task.status !== 'completed';
            
            return (
              <div
                key={task.id}
                className={`p-4 rounded-lg border transition-all hover:border-slate-600 ${
                  task.status === 'completed'
                    ? 'bg-slate-800/30 border-slate-700/50'
                    : isOverdue
                    ? 'bg-red-900/20 border-red-500/30'
                    : 'bg-slate-800/50 border-slate-700/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <button
                    onClick={() => {
                      const newStatus = task.status === 'completed' ? 'todo' : 'completed';
                      onTaskUpdate(task.id, newStatus);
                    }}
                    className="mt-1 hover:scale-110 transition-transform"
                  >
                    {getStatusIcon(task.status)}
                  </button>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className={`font-medium ${
                        task.status === 'completed' 
                          ? 'text-slate-400 line-through' 
                          : 'text-white'
                      }`}>
                        {task.title}
                      </h3>

                      {/* Task Meta */}
                      <div className="flex items-center gap-2 text-xs">
                        {/* Type Icon */}
                        {task.type === 'chief-of-staff' ? (
                          <Bot className="w-4 h-4 text-blue-400" />
                        ) : (
                          <User className="w-4 h-4 text-amber-400" />
                        )}

                        {/* Priority Badge */}
                        <span className={`px-2 py-1 rounded-full border text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>

                        {/* Due Date */}
                        {dueInfo && (
                          <div className={`flex items-center gap-1 ${dueInfo.color}`}>
                            <Calendar className="w-3 h-3" />
                            <span>{dueInfo.text}</span>
                          </div>
                        )}

                        {/* Estimate */}
                        {task.estimatedTime && (
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span>{task.estimatedTime}m</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {task.description && (
                      <p className={`text-sm mb-2 ${
                        task.status === 'completed' ? 'text-slate-500' : 'text-slate-300'
                      }`}>
                        {task.description}
                      </p>
                    )}

                    {/* Tags */}
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}