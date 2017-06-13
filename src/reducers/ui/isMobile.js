export default function(state) {
  return state === undefined ? window.innerWidth < 768 : state
}
