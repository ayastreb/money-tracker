export default function(state) {
  return state === undefined
    ? window.matchMedia('(max-width: 768px)').matches
    : state
}
