import { Executive, Task } from '@/types/executive';

export const executives: Executive[] = [
  {
    id: 'ceo',
    name: 'Gustavo Quintero',
    title: 'Chief Executive Officer',
    role: 'CEO',
    avatar: 'GQ',
    email: 'gustavo@company.com',
    department: 'Executive',
    status: 'active',
    directReports: ['coo', 'cfo', 'cto']
  },
  {
    id: 'coo',
    name: 'Sarah Martinez',
    title: 'Chief Operating Officer',
    role: 'COO',
    avatar: 'SM',
    email: 'sarah@company.com',
    reportsTo: 'ceo',
    department: 'Operations',
    status: 'active',
    directReports: ['ops-manager']
  },
  {
    id: 'cfo',
    name: 'Michael Chen',
    title: 'Chief Financial Officer',
    role: 'CFO',
    avatar: 'MC',
    email: 'michael@company.com',
    reportsTo: 'ceo',
    department: 'Finance',
    status: 'busy',
    directReports: ['finance-manager']
  },
  {
    id: 'cto',
    name: 'Elena Rodriguez',
    title: 'Chief Technology Officer',
    role: 'CTO',
    avatar: 'ER',
    email: 'elena@company.com',
    reportsTo: 'ceo',
    department: 'Technology',
    status: 'active',
    directReports: ['dev-lead']
  },
  {
    id: 'ops-manager',
    name: 'David Kim',
    title: 'Operations Manager',
    role: 'Operations Manager',
    avatar: 'DK',
    email: 'david@company.com',
    reportsTo: 'coo',
    department: 'Operations',
    status: 'active'
  },
  {
    id: 'finance-manager',
    name: 'Lisa Thompson',
    title: 'Finance Manager',
    role: 'Finance Manager',
    avatar: 'LT',
    email: 'lisa@company.com',
    reportsTo: 'cfo',
    department: 'Finance',
    status: 'active'
  }
];

export const tasks: Task[] = [
  // CEO Tasks
  {
    id: 'task-1',
    title: 'Q1 Strategic Planning Review',
    description: 'Review and approve Q1 strategic initiatives and resource allocation plans',
    assignedTo: 'ceo',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-20',
    createdAt: '2026-02-10',
    category: 'Strategic',
    estimatedHours: 8
  },
  {
    id: 'task-2',
    title: 'Board Presentation Prep',
    description: 'Prepare quarterly board presentation with key metrics and projections',
    assignedTo: 'ceo',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-25',
    createdAt: '2026-02-12',
    category: 'Governance',
    estimatedHours: 6
  },
  {
    id: 'task-3',
    title: 'Leadership Team Alignment',
    description: 'Conduct leadership alignment session on company priorities',
    assignedTo: 'ceo',
    priority: 'medium',
    status: 'completed',
    dueDate: '2026-02-14',
    createdAt: '2026-02-08',
    completedAt: '2026-02-14',
    category: 'Leadership',
    estimatedHours: 4
  },

  // COO Tasks
  {
    id: 'task-4',
    title: 'Process Optimization Initiative',
    description: 'Implement new operational efficiency measures across departments',
    assignedTo: 'coo',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-28',
    createdAt: '2026-02-11',
    category: 'Operations',
    estimatedHours: 16
  },
  {
    id: 'task-5',
    title: 'Vendor Contract Negotiations',
    description: 'Complete contract renewals with key service providers',
    assignedTo: 'coo',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-02-22',
    createdAt: '2026-02-09',
    category: 'Procurement',
    estimatedHours: 12
  },
  {
    id: 'task-6',
    title: 'Team Productivity Analysis',
    description: 'Analyze Q4 productivity metrics and identify improvement areas',
    assignedTo: 'coo',
    priority: 'low',
    status: 'completed',
    dueDate: '2026-02-15',
    createdAt: '2026-02-05',
    completedAt: '2026-02-13',
    category: 'Analytics',
    estimatedHours: 8
  },

  // CFO Tasks
  {
    id: 'task-7',
    title: 'Financial Forecast Update',
    description: 'Update financial projections for next 12 months based on current trends',
    assignedTo: 'cfo',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-21',
    createdAt: '2026-02-12',
    category: 'Finance',
    estimatedHours: 10
  },
  {
    id: 'task-8',
    title: 'Budget Variance Analysis',
    description: 'Complete Q1 budget variance analysis and recommendations',
    assignedTo: 'cfo',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-02-19',
    createdAt: '2026-02-10',
    category: 'Finance',
    estimatedHours: 6
  },
  {
    id: 'task-9',
    title: 'Tax Strategy Review',
    description: 'Review tax optimization strategies with external advisors',
    assignedTo: 'cfo',
    priority: 'medium',
    status: 'completed',
    dueDate: '2026-02-12',
    createdAt: '2026-02-01',
    completedAt: '2026-02-12',
    category: 'Tax',
    estimatedHours: 4
  },

  // CTO Tasks
  {
    id: 'task-10',
    title: 'Infrastructure Scaling Plan',
    description: 'Develop plan for scaling technical infrastructure to support growth',
    assignedTo: 'cto',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-26',
    createdAt: '2026-02-11',
    category: 'Infrastructure',
    estimatedHours: 20
  },
  {
    id: 'task-11',
    title: 'Security Audit Implementation',
    description: 'Implement recommendations from recent security audit',
    assignedTo: 'cto',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-23',
    createdAt: '2026-02-08',
    category: 'Security',
    estimatedHours: 15
  },
  {
    id: 'task-12',
    title: 'Development Team Expansion',
    description: 'Complete hiring plan and job descriptions for development team growth',
    assignedTo: 'cto',
    priority: 'medium',
    status: 'completed',
    dueDate: '2026-02-14',
    createdAt: '2026-02-07',
    completedAt: '2026-02-14',
    category: 'HR',
    estimatedHours: 8
  },

  // Operations Manager Tasks
  {
    id: 'task-13',
    title: 'Workflow Documentation',
    description: 'Document and standardize key operational workflows',
    assignedTo: 'ops-manager',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-02-27',
    createdAt: '2026-02-13',
    category: 'Documentation',
    estimatedHours: 12
  },
  {
    id: 'task-14',
    title: 'Quality Control Review',
    description: 'Review and update quality control processes',
    assignedTo: 'ops-manager',
    priority: 'low',
    status: 'completed',
    dueDate: '2026-02-16',
    createdAt: '2026-02-09',
    completedAt: '2026-02-15',
    category: 'Quality',
    estimatedHours: 6
  },

  // Finance Manager Tasks
  {
    id: 'task-15',
    title: 'Monthly Financial Reports',
    description: 'Prepare comprehensive monthly financial reports for leadership',
    assignedTo: 'finance-manager',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-18',
    createdAt: '2026-02-12',
    category: 'Reporting',
    estimatedHours: 8
  },
  {
    id: 'task-16',
    title: 'Expense Category Analysis',
    description: 'Analyze expense categories and identify cost optimization opportunities',
    assignedTo: 'finance-manager',
    priority: 'medium',
    status: 'completed',
    dueDate: '2026-02-13',
    createdAt: '2026-02-06',
    completedAt: '2026-02-13',
    category: 'Analysis',
    estimatedHours: 5
  }
];