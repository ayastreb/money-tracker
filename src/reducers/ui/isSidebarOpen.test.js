import reducer from './isSidebarOpen';
import { toggleSidebar } from '../../actions/ui/sidebar';

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual(false);
});

it('toggles sidebar open flag', () => {
  expect(reducer(false, toggleSidebar())).toEqual(true);
  expect(reducer(true, toggleSidebar())).toEqual(false);
});
