import { useState } from 'react'
import { CheckCircle2, Clock, AlertCircle, User, Bot, Trash2, Calendar, Tag } from 'lucide-react'
import type { Task } from '@/types'
import { cn } from '@/lib/utils'

interface TasksSectionProps {
  tasks: Task[]
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
}

export function TasksSection({ tasks, onUpdateTask, onDeleteTask }: TasksSectionProps) {
  const [filter, setFilter] = useState<'all' | 'chief-of-staff' | 'personal'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all')

  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.type !== filter) return false
    if (statusFilter !== 'all' && task.status !== statusFilter) return false
    return true
  })

  const chiefOfStaffTasks = tasks.filter(t => t.type === 'chief-of-staff')
  const personalTasks = tasks.filter(t => t.type === 'personal')

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-400" />
      case 'todo':
        return <AlertCircle className="w-5 h-5 text-slate-400" />
    }
  }

  const getStatusBadge = (status: Task['status']) => {
    const colors = {
      completed: 'bg-emerald-400/10 text-emerald-400',
      'in-progress': 'bg-blue-400/10 text-blue-400',
      todo: 'bg-slate-400/10 text-slate-400'
    }
    return colors[status]
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500 bg-red-500/5'
      case 'high':
        return 'border-l-orange-500 bg-orange-500/5'
      case 'medium':
        return 'border-l-blue-500 bg-blue-500/5'
      case 'low':
        return 'border-l-slate-500 bg-slate-500/5'
    }
  }

  const formatTimeEstimate = (minutes?: number) => {
    if (!minutes) return null
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const toggleTaskStatus = (task: Task) => {
    const statusFlow = {
      'todo': 'in-progress',
      'in-progress': 'completed',
      'completed': 'todo'
    } as const

    onUpdateTask(task.id, { 
      status: statusFlow[task.status],
      completedAt: statusFlow[task.status] === 'completed' ? new Date() : undefined
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Task Management</h2>
          <p className="text-slate-400">Track Claudius work and your action items</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-2">
          {(['all', 'chief-of-staff', 'personal'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-colors',
                filter === f 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
              )}
            >
              {f === 'chief-of-staff' ? 'Chief of Staff' : f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="ml-1 text-xs opacity-75">
                ({f === 'all' ? tasks.length : tasks.filter(t => t.type === f).length})
              </span>
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {(['all', 'todo', 'in-progress', 'completed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-colors',
                statusFilter === s 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
              )}
            >
              {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Bot className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">Claudius Tasks</span>
              </div>
              <div className="text-2xl font-bold text-white">{chiefOfStaffTasks.length}</div>
              <div className="text-xs text-slate-400">
                {chiefOfStaffTasks.filter(t => t.status === 'completed').length} completed
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-white">Personal Tasks</span>
              </div>
              <div className="text-2xl font-bold text-white">{personalTasks.length}</div>
              <div className="text-xs text-slate-400">
                {personalTasks.filter(t => t.status === 'completed').length} completed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No tasks match the current filters</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                'bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-lg p-4',
                'border-l-4 hover:bg-slate-900/70 transition-colors group',
                getPriorityColor(task.priority)
              )}
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <button
                  onClick={() => toggleTaskStatus(task)}
                  className="mt-0.5 hover:scale-110 transition-transform"
                >
                  {getStatusIcon(task.status)}
                </button>

                {/* Task Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={cn(
                        'font-semibold',
                        task.status === 'completed' 
                          ? 'text-slate-400 line-through' 
                          : 'text-white'
                      )}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-sm text-slate-400 mt-1">{task.description}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={cn('px-2 py-1 text-xs rounded-full', getStatusBadge(task.status))}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Task Meta */}
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      {task.type === 'chief-of-staff' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span>{task.type === 'chief-of-staff' ? 'Claudius' : 'Personal'}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <span>{task.category.replace('-', ' ')}</span>
                    </div>
                    
                    {task.estimatedTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeEstimate(task.estimatedTime)}</span>
                      </div>
                    )}
                    
                    {task.dueDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{task.dueDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {task.tags && task.tags.length > 0 && (
                    <div className="flex gap-1">
                      {task.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs bg-slate-800/50 text-slate-400 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}