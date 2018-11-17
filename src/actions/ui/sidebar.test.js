import { toggleSidebar } from './sidebar';

it('creates TOGGLE_SIDEBAR action', () => {
  expect(toggleSidebar()).toEqual({ type: 'TOGGLE_SIDEBAR' });
});
