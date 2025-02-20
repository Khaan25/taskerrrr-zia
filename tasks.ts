import { Task } from './lib/types'
import { generateId } from './lib/utils'

const taskData = [
  {
    title: 'Write project proposal',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Fix login page bug',
    status: 'not_started',
    priority: 'none',
  },
  {
    title: 'Design homepage layout',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    title: 'Update API documentation',
    status: 'completed',
    priority: 'medium',
  },
  {
    title: 'Refactor user authentication',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    title: 'Optimize database queries',
    status: 'not_started',
    priority: 'low',
  },
  {
    title: 'Review PR #345',
    status: 'completed',
    priority: 'urgent',
  },
  {
    title: 'Implement dark mode',
    status: 'completed',
    priority: 'urgent',
  },
  {
    title: 'Schedule team meeting',
    status: 'completed',
    priority: 'low',
  },
  {
    title: 'Prepare monthly report',
    status: 'in_progress',
    priority: 'none',
  },
  {
    title: 'Fix CSS styling issue',
    status: 'completed',
    priority: 'medium',
  },
  {
    title: 'Set up CI/CD pipeline',
    status: 'not_started',
    priority: 'medium',
  },
  {
    title: 'Test new feature deployment',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    title: 'Debug performance issues',
    status: 'completed',
    priority: 'none',
  },
  {
    title: 'Create marketing email template',
    status: 'in_progress',
    priority: 'urgent',
  },
  {
    title: 'Write unit tests for authentication',
    status: 'not_started',
    priority: 'medium',
  },
  {
    title: 'Optimize frontend rendering',
    status: 'completed',
    priority: 'low',
  },
  {
    title: 'Update dependency versions',
    status: 'completed',
    priority: 'urgent',
  },
  {
    title: 'Research competitor products',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Draft feature roadmap',
    status: 'completed',
    priority: 'high',
  },
  {
    title: 'Create onboarding guide',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    title: 'Prepare client presentation',
    status: 'completed',
    priority: 'low',
  },
  {
    title: 'Configure analytics tracking',
    status: 'in_progress',
    priority: 'none',
  },
  {
    title: 'Conduct code review session',
    status: 'completed',
    priority: 'high',
  },
  {
    title: 'Fix mobile responsiveness issues',
    status: 'not_started',
    priority: 'none',
  },
  {
    title: 'Improve error handling',
    status: 'completed',
    priority: 'none',
  },
  {
    title: 'Set up monitoring alerts',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Design new logo',
    status: 'in_progress',
    priority: 'low',
  },
  {
    title: 'Analyze customer feedback',
    status: 'completed',
    priority: 'high',
  },
  {
    title: 'Write blog post on best practices',
    status: 'not_started',
    priority: 'none',
  },
  {
    title: 'Document REST API endpoints',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Refactor checkout flow',
    status: 'not_started',
    priority: 'urgent',
  },
  {
    title: 'Optimize image loading',
    status: 'completed',
    priority: 'medium',
  },
  {
    title: 'Update security policies',
    status: 'not_started',
    priority: 'none',
  },
  {
    title: 'Develop user profile page',
    status: 'completed',
    priority: 'urgent',
  },
  {
    title: 'Fix broken links in footer',
    status: 'in_progress',
    priority: 'none',
  },
  {
    title: 'Set up automated email responses',
    status: 'completed',
    priority: 'none',
  },
  {
    title: 'Improve site accessibility',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Create A/B test experiment',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    title: 'Conduct usability testing',
    status: 'not_started',
    priority: 'high',
  },
  {
    title: 'Write post-mortem for outage',
    status: 'completed',
    priority: 'none',
  },
  {
    title: 'Fix pagination issues',
    status: 'not_started',
    priority: 'high',
  },
  {
    title: 'Build dashboard charts',
    status: 'in_progress',
    priority: 'low',
  },
  {
    title: 'Write test cases for search functionality',
    status: 'in_progress',
    priority: 'urgent',
  },
  {
    title: 'Improve onboarding flow',
    status: 'in_progress',
    priority: 'low',
  },
  {
    title: 'Optimize SQL queries',
    status: 'completed',
    priority: 'medium',
  },
  {
    title: 'Deploy new microservice',
    status: 'in_progress',
    priority: 'none',
  },
  {
    title: 'Fix UI inconsistencies',
    status: 'not_started',
    priority: 'none',
  },
  {
    title: 'Update payment gateway integration',
    status: 'in_progress',
    priority: 'low',
  },
  {
    title: 'Investigate slow API response times',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Prepare for product launch',
    status: 'in_progress',
    priority: 'low',
  },
  {
    title: 'Write user documentation',
    status: 'completed',
    priority: 'low',
  },
  {
    title: 'Update README file',
    status: 'not_started',
    priority: 'medium',
  },
  {
    title: 'Fix session expiration bug',
    status: 'in_progress',
    priority: 'urgent',
  },
  {
    title: 'Develop chat feature',
    status: 'completed',
    priority: 'medium',
  },
  {
    title: 'Research AI integration',
    status: 'not_started',
    priority: 'low',
  },
  {
    title: 'Improve website SEO',
    status: 'completed',
    priority: 'urgent',
  },
  {
    title: 'Analyze error logs',
    status: 'in_progress',
    priority: 'urgent',
  },
  {
    title: 'Redesign settings page',
    status: 'completed',
    priority: 'low',
  },
  {
    title: 'Enhance form validation',
    status: 'in_progress',
    priority: 'low',
  },
  {
    title: 'Update email templates',
    status: 'not_started',
    priority: 'low',
  },
  {
    title: 'Set up feature flags',
    status: 'not_started',
    priority: 'low',
  },
  {
    title: 'Fix typos in UI copy',
    status: 'in_progress',
    priority: 'low',
  },
  {
    title: 'Refactor old legacy code',
    status: 'not_started',
    priority: 'high',
  },
  {
    title: 'Prepare training slides',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Create FAQ section',
    status: 'completed',
    priority: 'low',
  },
  {
    title: 'Fix timezone issues',
    status: 'not_started',
    priority: 'none',
  },
  {
    title: 'Add 2FA authentication',
    status: 'not_started',
    priority: 'none',
  },
  {
    title: 'Implement search autocomplete',
    status: 'completed',
    priority: 'high',
  },
  {
    title: 'Improve cache strategy',
    status: 'completed',
    priority: 'urgent',
  },
  {
    title: 'Update terms of service',
    status: 'completed',
    priority: 'none',
  },
  {
    title: 'Research new frontend framework',
    status: 'completed',
    priority: 'medium',
  },
  {
    title: 'Enhance error messages',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    title: 'Fix memory leak issue',
    status: 'not_started',
    priority: 'medium',
  },
  {
    title: 'Develop new admin panel',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Review customer support tickets',
    status: 'completed',
    priority: 'high',
  },
  {
    title: 'Run load tests',
    status: 'completed',
    priority: 'urgent',
  },
  {
    title: 'Write Cypress tests',
    status: 'completed',
    priority: 'high',
  },
  {
    title: 'Create interactive tutorial',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Fix API CORS issues',
    status: 'completed',
    priority: 'none',
  },
  {
    title: 'Enhance keyboard navigation',
    status: 'completed',
    priority: 'urgent',
  },
  {
    title: 'Update user avatars',
    status: 'in_progress',
    priority: 'none',
  },
  {
    title: 'Test backup recovery',
    status: 'not_started',
    priority: 'urgent',
  },
  {
    title: 'Update mobile app version',
    status: 'not_started',
    priority: 'low',
  },
  {
    title: 'Monitor server logs',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    title: 'Fix infinite scroll bug',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    title: 'Improve site speed',
    status: 'in_progress',
    priority: 'none',
  },
  {
    title: 'Write migration script',
    status: 'completed',
    priority: 'high',
  },
  {
    title: 'Develop feature toggles',
    status: 'completed',
    priority: 'medium',
  },
  {
    title: 'Refactor modal components',
    status: 'in_progress',
    priority: 'low',
  },
  {
    title: 'Conduct A11y audit',
    status: 'completed',
    priority: 'high',
  },
  {
    title: 'Test WebSocket connections',
    status: 'not_started',
    priority: 'medium',
  },
  {
    title: 'Optimize database indexing',
    status: 'completed',
    priority: 'medium',
  },
  {
    title: 'Fix missing translations',
    status: 'in_progress',
    priority: 'urgent',
  },
  {
    title: 'Investigate 500 errors',
    status: 'completed',
    priority: 'none',
  },
  {
    title: 'Update dark mode styling',
    status: 'completed',
    priority: 'medium',
  },
  {
    title: 'Review legal compliance',
    status: 'in_progress',
    priority: 'none',
  },
  {
    title: 'Write changelog updates',
    status: 'completed',
    priority: 'none',
  },
  {
    title: 'Deploy security patches',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Refactor Redux state',
    status: 'completed',
    priority: 'high',
  },
  {
    title: 'Fix sidebar navigation',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Improve touch gestures',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    title: 'Update typography guidelines',
    status: 'not_started',
    priority: 'low',
  },
  {
    title: 'Test push notifications',
    status: 'not_started',
    priority: 'low',
  },
  {
    title: 'Fix dropdown positioning',
    status: 'not_started',
    priority: 'low',
  },
  {
    title: 'Develop new analytics dashboard',
    status: 'completed',
    priority: 'urgent',
  },
  {
    title: 'Reduce bundle size',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Refactor date parsing functions',
    status: 'in_progress',
    priority: 'urgent',
  },
  {
    title: 'Improve modal animations',
    status: 'in_progress',
    priority: 'urgent',
  },
  {
    title: 'Run penetration tests',
    status: 'not_started',
    priority: 'high',
  },
  {
    title: 'Implement JWT authentication',
    status: 'in_progress',
    priority: 'high',
  },
  {
    title: 'Improve logging strategy',
    status: 'in_progress',
    priority: 'none',
  },
  {
    title: 'Optimize Redis caching',
    status: 'not_started',
    priority: 'high',
  },
] as const

// Generate tasks with IDs when accessed, not when imported
export const tasks: Task[] = taskData.map((task, index) => ({
  // id: generateId(),
  id: generateId() + index.toString(),
  ...task,
}))
