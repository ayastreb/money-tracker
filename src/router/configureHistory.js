import { createBrowserHistory, createMemoryHistory } from 'history'

export default function configureHistory() {
  return window.matchMedia('(display-mode: standalone)').matches
    ? createMemoryHistory()
    : createBrowserHistory()
}
