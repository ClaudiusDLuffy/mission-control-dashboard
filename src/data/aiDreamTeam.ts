import { Executive, Task } from '@/types/executive';

// Real AI Dream Team Structure
export const aiDreamTeam: Executive[] = [
  {
    id: 'gustavo',
    name: 'Gustavo Quintero',
    title: 'Chief Executive Officer',
    role: 'CEO & Ironman',
    avatar: 'GQ',
    email: 'gustavo@company.com',
    department: 'Executive',
    status: 'active',
    directReports: ['claudius', 'elon', 'tim', 'naval']
  },
  {
    id: 'claudius',
    name: 'Claudius',
    title: 'Chief of Staff',
    role: 'AI Chief of Staff',
    avatar: '🤖',
    email: 'claudius@ai.team',
    reportsTo: 'gustavo',
    department: 'Operations',
    status: 'active',
    directReports: []
  },
  {
    id: 'elon',
    name: 'Elon',
    title: 'Chief Innovation Officer',
    role: 'Morning Edge Agent',
    avatar: '🚀',
    email: 'elon@ai.team',
    reportsTo: 'gustavo',
    department: 'Innovation',
    status: 'active',
    directReports: []
  },
  {
    id: 'tim',
    name: 'Tim Ferriss',
    title: 'Chief Efficiency Officer',
    role: 'Productivity Systems',
    avatar: '⚡',
    email: 'tim@ai.team',
    reportsTo: 'gustavo',
    department: 'Efficiency',
    status: 'active',
    directReports: []
  },
  {
    id: 'naval',
    name: 'Naval',
    title: 'Chief Strategy Officer',
    role: 'Strategic AI Session',
    avatar: '🧠',
    email: 'naval@ai.team',
    reportsTo: 'gustavo',
    department: 'Strategy',
    status: 'active',
    directReports: []
  }
];

// Real AI Agent Tasks
export const aiAgentTasks: Task[] = [
  // Gustavo's Strategic Tasks
  {
    id: 'ceo-1',
    title: 'AI Dream Team Optimization Review',
    description: 'Review AI agent performance metrics and optimize delegation strategies for maximum efficiency',
    assignedTo: 'gustavo',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-20',
    createdAt: '2026-02-14',
    category: 'Strategic',
    estimatedHours: 4
  },
  {
    id: 'ceo-2',
    title: 'Mission Control Dashboard Enhancement',
    description: 'Direct improvements to executive command center for better AI integration',
    assignedTo: 'gustavo',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-15',
    createdAt: '2026-02-14',
    category: 'Product',
    estimatedHours: 2
  },

  // Claudius (Chief of Staff) Tasks  
  {
    id: 'claudius-1',
    title: 'Daily Task List Generation',
    description: 'Generate and deliver daily power moves with 4 strategic tasks, quick wins, and content ideas',
    assignedTo: 'claudius',
    priority: 'high',
    status: 'completed',
    dueDate: '2026-02-14',
    createdAt: '2026-02-14',
    completedAt: '2026-02-14',
    category: 'Operations',
    estimatedHours: 1
  },
  {
    id: 'claudius-2',
    title: 'Mission Control Dashboard Development',
    description: 'Build executive command center with AI Dream Team integration and task visualization',
    assignedTo: 'claudius',
    priority: 'high',
    status: 'completed',
    dueDate: '2026-02-14',
    createdAt: '2026-02-14',
    completedAt: '2026-02-14',
    category: 'Technology',
    estimatedHours: 6
  },
  {
    id: 'claudius-3',
    title: 'Valentine\'s Day Content Strategy',
    description: 'Create comprehensive content series showcasing transformation story and relationship with Alyssa',
    assignedTo: 'claudius',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-02-15',
    createdAt: '2026-02-14',
    category: 'Content',
    estimatedHours: 3
  },
  {
    id: 'claudius-4',
    title: 'MYAMZTEAM Automation Workflow',
    description: 'Research and build client onboarding automation using Zapier/Sintra AI with 30-day checklist',
    assignedTo: 'claudius',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-16',
    createdAt: '2026-02-14',
    category: 'Automation',
    estimatedHours: 4
  },

  // Elon (Morning Edge Agent) Tasks
  {
    id: 'elon-1',
    title: 'Daily Intelligence Brief - Feb 14',
    description: 'Delivered comprehensive morning intelligence covering AI/tech, e-commerce, market trends, and triathlon updates',
    assignedTo: 'elon',
    priority: 'high',
    status: 'completed',
    dueDate: '2026-02-14',
    createdAt: '2026-02-14',
    completedAt: '2026-02-14',
    category: 'Intelligence',
    estimatedHours: 1.5
  },
  {
    id: 'elon-2',
    title: 'Weekly Market Analysis',
    description: 'Analyze competitive landscape and emerging opportunities in AI, e-commerce, and business automation',
    assignedTo: 'elon',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-02-17',
    createdAt: '2026-02-14',
    category: 'Research',
    estimatedHours: 2
  },
  {
    id: 'elon-3',
    title: 'Claude Opus 4.6 Impact Assessment',
    description: 'Evaluate new AI model capabilities and integration opportunities for business operations',
    assignedTo: 'elon',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-02-18',
    createdAt: '2026-02-14',
    category: 'Technology',
    estimatedHours: 3
  },

  // Tim Ferriss (Efficiency Systems) Tasks
  {
    id: 'tim-1',
    title: 'CPG Brand Research List',
    description: 'Compile 25 high-potential CPG brands ($5-50M revenue) for MYAMZTEAM outreach with contact info',
    assignedTo: 'tim',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-16',
    createdAt: '2026-02-14',
    category: 'Business Development',
    estimatedHours: 4
  },
  {
    id: 'tim-2',
    title: 'Content Pipeline Organization',
    description: 'Set up systematic folder structure for batch content creation and workflow optimization',
    assignedTo: 'tim',
    priority: 'low',
    status: 'completed',
    dueDate: '2026-02-14',
    createdAt: '2026-02-14',
    completedAt: '2026-02-14',
    category: 'Systems',
    estimatedHours: 0.5
  },
  {
    id: 'tim-3',
    title: 'Ironman Nutrition Strategy',
    description: 'Create comprehensive race nutrition protocols for 70.3 and full Ironman distances at current weight',
    assignedTo: 'tim',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-02-18',
    createdAt: '2026-02-14',
    category: 'Athletics',
    estimatedHours: 3
  },

  // Naval (Strategic Planning) Tasks
  {
    id: 'naval-1',
    title: 'LinkedIn Content Strategy',
    description: 'Develop transformation story content focusing on systems over motivation philosophy',
    assignedTo: 'naval',
    priority: 'medium',
    status: 'completed',
    dueDate: '2026-02-14',
    createdAt: '2026-02-14',
    completedAt: '2026-02-14',
    category: 'Strategy',
    estimatedHours: 1
  },
  {
    id: 'naval-2',
    title: 'AI Integration Strategy',
    description: 'Develop long-term strategy for AI agent integration across MYAMZTEAM and Magical Brands operations',
    assignedTo: 'naval',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-22',
    createdAt: '2026-02-14',
    category: 'Strategy',
    estimatedHours: 8
  },
  {
    id: 'naval-3',
    title: 'Competitive Positioning Analysis',
    description: 'Analyze market position and develop strategic differentiation for agency services',
    assignedTo: 'naval',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-02-20',
    createdAt: '2026-02-14',
    category: 'Analysis',
    estimatedHours: 5
  }
];

// Agent Performance Metrics
export const agentMetrics = {
  claudius: {
    tasksCompleted: 2,
    tasksInProgress: 2,
    successRate: 100,
    averageCompletionTime: '4.2h',
    specialty: 'Operations & Development'
  },
  elon: {
    tasksCompleted: 1,
    tasksInProgress: 2,
    successRate: 100,
    averageCompletionTime: '1.5h',
    specialty: 'Intelligence & Research'
  },
  tim: {
    tasksCompleted: 1,
    tasksInProgress: 2,
    successRate: 100,
    averageCompletionTime: '2.8h',
    specialty: 'Systems & Efficiency'
  },
  naval: {
    tasksCompleted: 1,
    tasksInProgress: 2,
    successRate: 100,
    averageCompletionTime: '3.1h',
    specialty: 'Strategy & Analysis'
  }
};

// Recent Deliverables
export interface Deliverable {
  id: string;
  title: string;
  agent: string;
  deliveredAt: string;
  type: 'pdf' | 'analysis' | 'content' | 'automation';
  summary: string;
  fileUrl?: string;
}

export const recentDeliverables: Deliverable[] = [
  {
    id: 'del-1',
    title: 'The Morning Edge - Daily Intelligence Brief',
    agent: 'elon',
    deliveredAt: '2026-02-14T06:08:00-05:00',
    type: 'pdf',
    summary: 'Claude Opus 4.6 release, Amazon A91 algorithm update, crypto trends, AI infrastructure investment analysis',
    fileUrl: '/deliverables/morning-edge-2026-02-14.pdf'
  },
  {
    id: 'del-2', 
    title: 'Daily Power Moves Task List',
    agent: 'claudius',
    deliveredAt: '2026-02-14T06:11:00-05:00',
    type: 'analysis',
    summary: '4 strategic tasks including Valentine\'s content, MYAMZTEAM automation, Ironman nutrition, CPG research',
    fileUrl: '/deliverables/daily-tasks-2026-02-14.pdf'
  },
  {
    id: 'del-3',
    title: 'LinkedIn Transformation Post',
    agent: 'naval',
    deliveredAt: '2026-02-14T06:11:00-05:00',
    type: 'content',
    summary: '284 lbs to Ironman transformation story focusing on systems over motivation philosophy'
  }
];