'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { StatsOverview } from '@/components/dashboard/StatsOverview'
import { GoalCategories } from '@/components/dashboard/GoalCategories'
import { TasksSection } from '@/components/dashboard/TasksSection'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { mockDashboardData } from '@/data/mockData'
import type { Task, GoalCategoryData, DashboardStats } from '@/types'

export default function MissionControl() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [goalCategories, setGoalCategories] = useState<GoalCategoryData[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load mock data (replace with real data loading later)
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate loading
      const data = mockDashboardData()
      setTasks(data.tasks)
      setGoalCategories(data.goalCategories)
      setStats(data.stats)
      setLoading(false)
    }

    loadData()
  }, [])

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    }
    setTasks(prev => [...prev, newTask])
  }

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ))
  }

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-slate-400 mt-4">Initializing Mission Control...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-purple-900/20 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative">
        <DashboardHeader />
        
        <main className="container mx-auto px-6 py-8 space-y-8">
          {/* Stats Overview */}
          <StatsOverview stats={stats!} />
          
          {/* Goal Categories */}
          <GoalCategories categories={goalCategories} />
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tasks Section */}
            <div className="lg:col-span-2">
              <TasksSection 
                tasks={tasks}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
            </div>
            
            {/* Quick Actions */}
            <div>
              <QuickActions onAddTask={addTask} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}