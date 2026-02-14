'use client';

import { useState } from 'react';
import { Task, Executive } from '@/types/executive';
import { Calendar, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';

interface TaskBoardProps {
  tasks: Task[];
  executives: Executive[];
  selectedExecutive: string | null;
}

export default function TaskBoard({ tasks, executives, selectedExecutive }: TaskBoardProps) {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const filteredTasks = selectedExecutive 
    ? tasks.filter(task => task.assignedTo === selectedExecutive)
    : tasks;

  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  const getExecutiveById = (id: string) => executives.find(exec => exec.id === id);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-500/10';
      case 'medium': return 'border-yellow-400 bg-yellow-500/10';
      case 'low': return 'border-emerald-400 bg-emerald-500/10';
      default: return 'border-slate-400 bg-slate-500/10';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-400';
      case 'medium': return 'bg-yellow-400';
      case 'low': return 'bg-emerald-400';
      default: return 'bg-slate-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  const toggleTaskExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const executive = getExecutiveById(task.assignedTo);
    const isExpanded = expandedTasks.has(task.id);
    const overdue = isOverdue(task.dueDate, task.status);

    return (
      <div className={`task-card ${getPriorityColor(task.priority)} ${overdue ? 'ring-1 ring-red-400' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getPriorityDot(task.priority)}`} />
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wide">
              {task.priority}
            </span>
          </div>
          {executive && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                {executive.avatar}
              </div>
            </div>
          )}
        </div>

        <h3 className="text-white font-semibold text-lg mb-2 leading-tight">
          {task.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className={overdue ? 'text-red-400' : ''}>
                {formatDate(task.dueDate)}
              </span>
            </div>
            {task.estimatedHours && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{task.estimatedHours}h</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => toggleTaskExpansion(task.id)}
          className="flex items-center justify-between w-full text-left text-slate-300 hover:text-white transition-colors"
        >
          <span className="text-sm">
            {isExpanded ? 'Less details' : 'More details'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-600/50 animate-fade-in">
            <p className="text-slate-300 text-sm mb-3 leading-relaxed">
              {task.description}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="bg-slate-700/50 px-2 py-1 rounded">
                {task.category}
              </span>
              <span className="bg-slate-700/50 px-2 py-1 rounded">
                Created {formatDate(task.createdAt)}
              </span>
              {task.completedAt && (
                <span className="bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded">
                  Completed {formatDate(task.completedAt)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const selectedExec = selectedExecutive ? getExecutiveById(selectedExecutive) : null;

  return (
    <div className="task-board">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {selectedExec ? `${selectedExec.name}'s Tasks` : 'Executive Task Board'}
          </h2>
          <p className="text-slate-400">
            {selectedExec ? `Managing ${filteredTasks.length} tasks` : `${filteredTasks.length} total tasks across all executives`}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* In Progress Column */}
        <div className="task-column">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              <h3 className="text-xl font-semibold text-white">In Progress</h3>
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                {inProgressTasks.length}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <p>No tasks in progress</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Column */}
        <div className="task-column">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-400 rounded-full" />
              <h3 className="text-xl font-semibold text-white">Completed</h3>
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                {completedTasks.length}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            {completedTasks.length > 0 ? (
              completedTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8" />
                </div>
                <p>No completed tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}