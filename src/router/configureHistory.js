import { createBrowserHistory, createHashHistory } from 'history'

export default function configureHistory() {
  return window.matchMedia('(display-mode: standalone)').matches
    ? createHashHistory()
    : createBrowserHistory()
}
