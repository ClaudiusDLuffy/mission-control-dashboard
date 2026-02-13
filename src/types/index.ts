export type TaskStatus = 'todo' | 'in-progress' | 'completed'
export type TaskType = 'chief-of-staff' | 'personal'
export type Priority = 'low' | 'medium' | 'high' | 'urgent'

export type GoalCategory = 
  | 'myamzteam-growth'
  | 'magical-brands' 
  | 'fitness-ironman'
  | 'personal-brand'
  | 'ai-automation'
  | 'faith-growth'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  type: TaskType
  category: GoalCategory
  priority: Priority
  dueDate?: Date
  createdAt: Date
  completedAt?: Date
  estimatedTime?: number // in minutes
  tags?: string[]
}

export interface GoalCategoryData {
  id: GoalCategory
  name: string
  description: string
  color: string
  icon: string
  progress: number // 0-100
  weeklyProgress: number
  tasks: {
    total: number
    completed: number
    inProgress: number
    overdue: number
  }
  metrics?: {
    name: string
    value: string
    change: number
  }[]
}

export interface DashboardStats {
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  overdueKinks: number
  completionRate: number
  productivity: number // 0-100
  streak: number // days
}