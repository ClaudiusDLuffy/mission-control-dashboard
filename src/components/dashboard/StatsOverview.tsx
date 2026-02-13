import { TrendingUp, Target, Clock, Zap, Flame, CheckCircle2 } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import type { DashboardStats } from '@/types'
import { cn } from '@/lib/utils'

interface StatsOverviewProps {
  stats: DashboardStats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const taskData = [
    { name: 'Completed', value: stats.completedTasks, color: '#10b981' },
    { name: 'In Progress', value: stats.inProgressTasks, color: '#3b82f6' },
    { name: 'Todo', value: stats.totalTasks - stats.completedTasks - stats.inProgressTasks, color: '#6b7280' }
  ]

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.totalTasks.toString(),
      subtitle: 'Active projects',
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      change: null
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      subtitle: 'This month',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      change: '+12%'
    },
    {
      title: 'Productivity',
      value: `${stats.productivity}%`,
      subtitle: 'Overall efficiency',
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      change: '+8%'
    },
    {
      title: 'Daily Streak',
      value: stats.streak.toString(),
      subtitle: 'Days consistent',
      icon: Flame,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      change: null
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {/* Stat Cards */}
      {statCards.map((stat, index) => (
        <div
          key={stat.title}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 hover:bg-slate-900/70 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={cn('p-2 rounded-lg', stat.bgColor)}>
              <stat.icon className={cn('w-5 h-5', stat.color)} />
            </div>
            {stat.change && (
              <span className="text-xs text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded">
                {stat.change}
              </span>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-sm text-slate-400">{stat.title}</p>
            <p className="text-xs text-slate-500">{stat.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Task Distribution Chart */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Task Distribution</h3>
            <p className="text-sm text-slate-400">Current workload</p>
          </div>
          <Clock className="w-5 h-5 text-slate-400" />
        </div>
        
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={55}
                paddingAngle={2}
                dataKey="value"
              >
                {taskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-2 mt-4">
          {taskData.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-300">{item.name}</span>
              </div>
              <span className="text-slate-400 font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}