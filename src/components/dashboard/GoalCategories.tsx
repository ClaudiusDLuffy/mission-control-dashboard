import { TrendingUp, Zap, User, Bot, Heart, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import type { GoalCategoryData } from '@/types'
import { cn } from '@/lib/utils'

interface GoalCategoriesProps {
  categories: GoalCategoryData[]
}

const iconMap = {
  TrendingUp,
  Zap,
  User,
  Bot,
  Heart,
  Activity
}

export function GoalCategories({ categories }: GoalCategoriesProps) {
  const chartData = categories.map(cat => ({
    name: cat.name.split(' ')[0], // First word only for chart
    progress: cat.progress,
    weekly: cat.weeklyProgress,
    color: cat.color
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Goal Categories</h2>
          <p className="text-slate-400">Track progress across all life areas</p>
        </div>
        <div className="text-sm text-slate-400">
          Overall Progress: <span className="text-white font-semibold">77%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap] || TrendingUp
          
          return (
            <div
              key={category.id}
              className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 hover:bg-slate-900/70 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={cn('p-3 rounded-xl bg-gradient-to-br', category.color, 'shadow-lg')}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{category.progress}%</div>
                  <div className="text-xs text-emerald-400 font-medium">
                    +{category.weeklyProgress}% this week
                  </div>
                </div>
              </div>

              {/* Category Info */}
              <div className="space-y-2 mb-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                  <span>Progress</span>
                  <span>{category.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className={cn('h-2 rounded-full bg-gradient-to-r transition-all duration-500', category.color)}
                    style={{ width: `${category.progress}%` }}
                  />
                </div>
              </div>

              {/* Task Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                  <div className="text-sm font-semibold text-white">{category.tasks.completed}</div>
                  <div className="text-xs text-slate-400">Completed</div>
                </div>
                <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                  <div className="text-sm font-semibold text-white">{category.tasks.inProgress}</div>
                  <div className="text-xs text-slate-400">In Progress</div>
                </div>
              </div>

              {/* Metrics */}
              {category.metrics && (
                <div className="space-y-2">
                  {category.metrics.slice(0, 2).map((metric, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{metric.value}</span>
                        {metric.change !== 0 && (
                          <span className={cn(
                            'text-xs px-1.5 py-0.5 rounded',
                            metric.change > 0 
                              ? 'text-emerald-400 bg-emerald-400/10' 
                              : 'text-red-400 bg-red-400/10'
                          )}>
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress Chart */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Weekly Progress</h3>
            <p className="text-sm text-slate-400">Goal category performance this week</p>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                domain={[0, 100]}
              />
              <Bar dataKey="progress" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="url(#gradient)" />
                ))}
              </Bar>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}