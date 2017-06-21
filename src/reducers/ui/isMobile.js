import { WINDOW_RESIZE } from '../../actions/ui/windowResize'
export default function(state, action) {
  switch (action.type) {
    case WINDOW_RESIZE:
      return window.matchMedia('(max-width: 768px)').matches
    default:
      return state === undefined
        ? window.matchMedia('(max-width: 768px)').matches
        : state
  }
}
