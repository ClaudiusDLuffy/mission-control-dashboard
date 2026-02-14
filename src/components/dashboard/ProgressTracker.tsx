'use client';

import { TrendingUp, Target, Zap, Calendar, Award, BarChart3 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { GoalCategoryData, DashboardStats } from '@/types';

interface ProgressTrackerProps {
  goalCategories: GoalCategoryData[];
  stats: DashboardStats;
}

// Sample weekly progress data
const weeklyProgressData = [
  { day: 'Mon', completed: 12, planned: 15 },
  { day: 'Tue', completed: 18, planned: 20 },
  { day: 'Wed', completed: 15, planned: 18 },
  { day: 'Thu', completed: 22, planned: 22 },
  { day: 'Fri', completed: 25, planned: 24 },
  { day: 'Sat', completed: 19, planned: 16 },
  { day: 'Sun', completed: 14, planned: 12 }
];

// Sample monthly data
const monthlyData = [
  { month: 'Oct', myamzteam: 65, magical: 80, fitness: 85, brand: 35, ai: 60, faith: 85 },
  { month: 'Nov', myamzteam: 70, magical: 82, fitness: 88, brand: 40, ai: 65, faith: 87 },
  { month: 'Dec', myamzteam: 75, magical: 85, fitness: 90, brand: 45, ai: 70, faith: 88 }
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function ProgressTracker({ goalCategories, stats }: ProgressTrackerProps) {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return TrendingUp;
      case 'Zap': return Zap;
      case 'Target': return Target;
      case 'User': return Target;
      case 'Bot': return Target;
      case 'Heart': return Award;
      default: return Target;
    }
  };

  const pieData = goalCategories.map((category, index) => ({
    name: category.name,
    value: category.progress,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="space-y-8">
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-2xl">🔥</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.streak}</div>
          <div className="text-sm text-slate-400">Day Streak</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-2xl">⚡</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.productivity}%</div>
          <div className="text-sm text-slate-400">Productivity</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-2xl">📈</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.completionRate}%</div>
          <div className="text-sm text-slate-400">Completion Rate</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-2xl">🎯</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.inProgressTasks}</div>
          <div className="text-sm text-slate-400">Active Tasks</div>
        </div>
      </div>

      {/* Goal Categories Progress */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Goal Category Progress</h2>
            <p className="text-slate-400">Real-time tracking across all life domains</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Calendar className="w-4 h-4" />
            <span>Updated 2 minutes ago</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Progress Bars */}
          <div className="space-y-6">
            {goalCategories.map((category, index) => {
              const IconComponent = getIconComponent(category.icon);
              const progressColor = COLORS[index % COLORS.length];
              
              return (
                <div key={category.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${progressColor}20` }}>
                        <IconComponent className="w-4 h-4" style={{ color: progressColor }} />
                      </div>
                      <div>
                        <div className="font-medium text-white">{category.name}</div>
                        <div className="text-xs text-slate-400">{category.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">{category.progress}%</div>
                      <div className="text-xs text-emerald-400">+{category.weeklyProgress}% this week</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 relative"
                      style={{ 
                        width: `${category.progress}%`,
                        backgroundColor: progressColor
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                    </div>
                  </div>

                  {/* Task Stats */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{category.tasks.completed}/{category.tasks.total} tasks completed</span>
                    <span>{category.tasks.inProgress} in progress</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pie Chart */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-white mb-6">Overall Progress Distribution</h3>
            <div className="w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }} 
                  />
                  <span className="text-slate-400">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Performance Chart */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Weekly Performance</h2>
            <p className="text-slate-400">Task completion vs. planning accuracy</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <span className="text-sm text-slate-400">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-slate-400">Planned</span>
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyProgressData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey="planned"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="completed"
                stackId="2"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">3-Month Progress Trend</h2>
            <p className="text-slate-400">Goal category evolution over time</p>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Line type="monotone" dataKey="myamzteam" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              <Line type="monotone" dataKey="magical" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="fitness" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
              <Line type="monotone" dataKey="brand" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
              <Line type="monotone" dataKey="ai" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
              <Line type="monotone" dataKey="faith" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6">
          {goalCategories.map((category, index) => (
            <div key={category.id} className="text-center">
              <div 
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div className="text-xs text-slate-400">{category.name.split(' ')[0]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}