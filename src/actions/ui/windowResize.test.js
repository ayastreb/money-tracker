import { WINDOW_RESIZE, windowResize } from './windowResize'

it('creates WINDOW_RESIZE action', () => {
  expect(windowResize()).toEqual({
    type: WINDOW_RESIZE
  })
})
