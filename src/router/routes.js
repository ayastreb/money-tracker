import Dashboard from '../containers/Dashboard'
import WorkInProgress from '../containers/WorkInProgress'

export default [
  {
    path: '/',
    exact: true,
    label: 'Dashboard',
    icon: 'newspaper',
    component: Dashboard
  },
  {
    path: '/transactions',
    exact: false,
    label: 'Transactions',
    icon: 'exchange',
    component: WorkInProgress
  },
  {
    path: '/accounts',
    exact: false,
    label: 'Accounts',
    icon: 'credit card',
    component: WorkInProgress
  },
  {
    path: '/budget',
    exact: false,
    label: 'Budget',
    icon: 'shopping basket',
    component: WorkInProgress
  },
  {
    path: '/reports',
    exact: false,
    label: 'Reports',
    icon: 'line chart',
    component: WorkInProgress
  },
  {
    path: '/settings',
    exact: true,
    label: 'Settings',
    icon: 'options',
    component: WorkInProgress
  }
]
