import { useState } from 'react'
import { Plus, User, Bot, Zap, Target, Calendar, Tag, Clock } from 'lucide-react'
import type { Task, GoalCategory, TaskType, Priority } from '@/types'
import { cn } from '@/lib/utils'

interface QuickActionsProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
}

export function QuickActions({ onAddTask }: QuickActionsProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'personal' as TaskType,
    category: 'myamzteam-growth' as GoalCategory,
    priority: 'medium' as Priority,
    estimatedTime: '',
    dueDate: ''
  })

  const goalCategories = [
    { id: 'myamzteam-growth', name: 'MYAMZTEAM Growth' },
    { id: 'magical-brands', name: 'Magical Brands' },
    { id: 'fitness-ironman', name: 'Fitness & Ironman' },
    { id: 'personal-brand', name: 'Personal Brand' },
    { id: 'ai-automation', name: 'AI & Automation' },
    { id: 'faith-growth', name: 'Faith & Growth' }
  ]

  const quickTemplates = [
    {
      title: 'Research new AI tools',
      description: 'Find automation tools for e-commerce',
      type: 'chief-of-staff' as TaskType,
      category: 'ai-automation' as GoalCategory,
      priority: 'medium' as Priority,
      estimatedTime: 60,
      icon: Bot
    },
    {
      title: 'Draft content for LinkedIn',
      description: 'Create transformation story posts',
      type: 'chief-of-staff' as TaskType,
      category: 'personal-brand' as GoalCategory,
      priority: 'high' as Priority,
      estimatedTime: 45,
      icon: Bot
    },
    {
      title: 'Client outreach call',
      description: 'Schedule meeting with prospect',
      type: 'personal' as TaskType,
      category: 'myamzteam-growth' as GoalCategory,
      priority: 'high' as Priority,
      estimatedTime: 30,
      icon: User
    },
    {
      title: 'Training session',
      description: 'Complete workout for today',
      type: 'personal' as TaskType,
      category: 'fitness-ironman' as GoalCategory,
      priority: 'high' as Priority,
      estimatedTime: 90,
      icon: Zap
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return

    const task: Omit<Task, 'id' | 'createdAt'> = {
      title: formData.title,
      description: formData.description || undefined,
      status: 'todo',
      type: formData.type,
      category: formData.category,
      priority: formData.priority,
      estimatedTime: formData.estimatedTime ? parseInt(formData.estimatedTime) : undefined,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined
    }

    onAddTask(task)
    setFormData({
      title: '',
      description: '',
      type: 'personal',
      category: 'myamzteam-growth',
      priority: 'medium',
      estimatedTime: '',
      dueDate: ''
    })
    setShowForm(false)
  }

  const useTemplate = (template: typeof quickTemplates[0]) => {
    setFormData({
      title: template.title,
      description: template.description,
      type: template.type,
      category: template.category,
      priority: template.priority,
      estimatedTime: template.estimatedTime.toString(),
      dueDate: ''
    })
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Quick Actions</h2>
        <p className="text-sm text-slate-400">Fast task creation and templates</p>
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add New Task</span>
      </button>

      {/* Task Form */}
      {showForm && (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-lg p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task title..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                placeholder="Additional details..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as TaskType }))}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="personal">Personal</option>
                  <option value="chief-of-staff">Chief of Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Priority }))}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as GoalCategory }))}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {goalCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Time (minutes)</label>
                <input
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: e.target.value }))}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Quick Templates */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Quick Templates</h3>
        <div className="space-y-3">
          {quickTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => useTemplate(template)}
              className="w-full bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-lg p-4 hover:bg-slate-900/70 transition-colors text-left group"
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  'p-2 rounded-lg',
                  template.type === 'chief-of-staff' 
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-emerald-500/10 text-emerald-400'
                )}>
                  <template.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                    {template.title}
                  </h4>
                  <p className="text-sm text-slate-400 mt-1">{template.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {goalCategories.find(c => c.id === template.category)?.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {template.estimatedTime}m
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Focus */}
      <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-amber-400" />
          <h3 className="font-semibold text-amber-400">Today's Focus</h3>
        </div>
        <p className="text-sm text-slate-300 mb-3">
          "I can do all this through him who gives me strength." - Philippians 4:13
        </p>
        <p className="text-xs text-slate-400">
          Focus on MYAMZTEAM growth and personal brand content creation today. 
          Remember your transformation story - discipline changes everything.
        </p>
      </div>
    </div>
  )
}