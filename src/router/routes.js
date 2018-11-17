import Dashboard from '../containers/Dashboard';
import Transactions from '../containers/Transactions';
import Accounts from '../containers/Accounts';
import Reports from '../containers/Reports';
import Settings from '../containers/Settings';
import WorkInProgress from '../containers/WorkInProgress';

export default [
  {
    path: '/',
    exact: true,
    label: 'Dashboard',
    icon: 'newspaper',
    component: Dashboard
  },
  {
    path: '/transactions/:accountId?',
    link: '/transactions',
    exact: false,
    label: 'Transactions',
    icon: 'exchange',
    component: Transactions
  },
  {
    path: '/accounts',
    exact: false,
    label: 'Accounts',
    icon: 'credit card',
    component: Accounts
  },
  {
    path: '/reports',
    exact: false,
    label: 'Reports',
    icon: 'line chart',
    component: Reports
  },
  {
    path: '/budget',
    exact: false,
    label: 'Budget',
    icon: 'shopping basket',
    component: WorkInProgress
  },
  {
    path: '/settings',
    exact: true,
    label: 'Settings',
    icon: 'options',
    component: Settings
  }
];
