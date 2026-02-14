export interface Executive {
  id: string;
  name: string;
  title: string;
  role: string;
  avatar: string;
  email: string;
  reportsTo?: string;
  directReports?: string[];
  department: string;
  status: 'active' | 'busy' | 'offline';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  status: 'in-progress' | 'completed';
  dueDate: string;
  createdAt: string;
  completedAt?: string;
  category: string;
  estimatedHours?: number;
}

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  completionRate: number;
  executiveStats: {
    [executiveId: string]: {
      total: number;
      completed: number;
      inProgress: number;
    };
  };
}