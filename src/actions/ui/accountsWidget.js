export const TOGGLE_GROUP_COLLAPSE = 'TOGGLE_GROUP_COLLAPSE'
export function toggleGroupCollapse(group) {
  return {
    type: TOGGLE_GROUP_COLLAPSE,
    group
  }
}
