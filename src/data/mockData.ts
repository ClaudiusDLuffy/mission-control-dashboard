import type { Task, GoalCategoryData, DashboardStats } from '@/types'

export function mockDashboardData() {
  const goalCategories: GoalCategoryData[] = [
    {
      id: 'myamzteam-growth',
      name: 'MYAMZTEAM Growth',
      description: 'Scale agency, land clients, operations, brand building',
      color: 'from-emerald-500 to-teal-600',
      icon: 'TrendingUp',
      progress: 75,
      weeklyProgress: 15,
      tasks: { total: 12, completed: 9, inProgress: 2, overdue: 1 },
      metrics: [
        { name: 'New Clients', value: '3', change: 12 },
        { name: 'Revenue', value: '$45K', change: 28 },
        { name: 'Team Size', value: '8', change: 6 }
      ]
    },
    {
      id: 'magical-brands',
      name: 'Magical Brands',
      description: 'International expansion, marketplace innovation',
      color: 'from-purple-500 to-indigo-600',
      icon: 'Zap',
      progress: 85,
      weeklyProgress: 8,
      tasks: { total: 8, completed: 7, inProgress: 1, overdue: 0 },
      metrics: [
        { name: 'Countries', value: '22', change: 0 },
        { name: 'Growth', value: '15%', change: 3 },
        { name: 'Efficiency', value: '92%', change: 5 }
      ]
    },
    {
      id: 'fitness-ironman',
      name: 'Fitness & Ironman',
      description: 'Training, races, nutrition, get leaner',
      color: 'from-red-500 to-orange-600',
      icon: 'Zap',
      progress: 90,
      weeklyProgress: 12,
      tasks: { total: 15, completed: 13, inProgress: 2, overdue: 0 },
      metrics: [
        { name: 'Weight', value: '195 lbs', change: -2 },
        { name: 'Races', value: '3', change: 100 },
        { name: 'Training', value: '6x/week', change: 0 }
      ]
    },
    {
      id: 'personal-brand',
      name: 'Personal Brand',
      description: 'Social media, transformation story, content',
      color: 'from-blue-500 to-cyan-600',
      icon: 'User',
      progress: 45,
      weeklyProgress: 25,
      tasks: { total: 10, completed: 4, inProgress: 4, overdue: 2 },
      metrics: [
        { name: 'Followers', value: '2.5K', change: 15 },
        { name: 'Engagement', value: '4.2%', change: 8 },
        { name: 'Content', value: '12/week', change: 20 }
      ]
    },
    {
      id: 'ai-automation',
      name: 'AI & Automation',
      description: 'Tools, workflows, efficiency systems',
      color: 'from-violet-500 to-purple-600',
      icon: 'Bot',
      progress: 70,
      weeklyProgress: 18,
      tasks: { total: 6, completed: 4, inProgress: 2, overdue: 0 },
      metrics: [
        { name: 'Tools', value: '8', change: 33 },
        { name: 'Time Saved', value: '15h/week', change: 25 },
        { name: 'ROI', value: '340%', change: 12 }
      ]
    },
    {
      id: 'faith-growth',
      name: 'Faith & Growth',
      description: 'Spiritual growth, life with Alyssa, values',
      color: 'from-amber-500 to-yellow-600',
      icon: 'Heart',
      progress: 88,
      weeklyProgress: 5,
      tasks: { total: 4, completed: 3, inProgress: 1, overdue: 0 },
      metrics: [
        { name: 'Study Days', value: '7/7', change: 0 },
        { name: 'Reflection', value: 'Daily', change: 0 },
        { name: 'Growth', value: 'Strong', change: 10 }
      ]
    }
  ]

  const tasks: Task[] = [
    // Chief of Staff Tasks (Claudius)
    {
      id: '1',
      title: 'Draft LinkedIn posts about Ironman transformation',
      description: 'Create 3 compelling posts showcasing the 284→195 lb journey',
      status: 'completed',
      type: 'chief-of-staff',
      category: 'personal-brand',
      priority: 'high',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      completedAt: new Date(),
      estimatedTime: 45,
      tags: ['content', 'social-media']
    },
    {
      id: '2',
      title: 'Research CPG brands for MYAMZTEAM outreach',
      description: 'Identify top 15 pet accessories brands for agency pipeline',
      status: 'in-progress',
      type: 'chief-of-staff',
      category: 'myamzteam-growth',
      priority: 'urgent',
      dueDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
      createdAt: new Date(),
      estimatedTime: 90,
      tags: ['research', 'outreach', 'cpg']
    },
    {
      id: '3',
      title: 'Create workout tracking template',
      description: 'Build comprehensive Ironman training log template',
      status: 'todo',
      type: 'chief-of-staff',
      category: 'fitness-ironman',
      priority: 'medium',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      estimatedTime: 30,
      tags: ['fitness', 'tracking', 'template']
    },
    
    // Personal Tasks (Gustavo)
    {
      id: '4',
      title: 'Client onboarding call - PetCo',
      description: 'Kick-off meeting for new MYAMZTEAM client',
      status: 'todo',
      type: 'personal',
      category: 'myamzteam-growth',
      priority: 'high',
      dueDate: new Date(Date.now() + 8 * 60 * 60 * 1000),
      createdAt: new Date(),
      estimatedTime: 60,
      tags: ['client', 'meeting']
    },
    {
      id: '5',
      title: 'Morning swim training - 3000m',
      description: '3x1000m sets, focus on technique and pacing',
      status: 'completed',
      type: 'personal',
      category: 'fitness-ironman',
      priority: 'high',
      dueDate: new Date(),
      createdAt: new Date(),
      completedAt: new Date(),
      estimatedTime: 90,
      tags: ['training', 'swim']
    },
    {
      id: '6',
      title: 'Record transformation story video',
      description: 'Film main video for YouTube about 90lb weight loss journey',
      status: 'in-progress',
      type: 'personal',
      category: 'personal-brand',
      priority: 'medium',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      estimatedTime: 120,
      tags: ['video', 'content', 'transformation']
    }
  ]

  const stats: DashboardStats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
    overdueKinks: tasks.filter(t => t.dueDate && t.dueDate < new Date() && t.status !== 'completed').length,
    completionRate: 85,
    productivity: 92,
    streak: 14
  }

  return { tasks, goalCategories, stats }
}