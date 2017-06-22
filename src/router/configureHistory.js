import { createBrowserHistory, createHashHistory } from 'history'

/**
 * When app is launched from home screen on Android - we need to use hash history.
 * @see https://ayastreb.me/react-router-in-home-screen-pwa/
 */
export default function configureHistory() {
  return window.matchMedia('(display-mode: standalone)').matches
    ? createHashHistory()
    : createBrowserHistory()
}
