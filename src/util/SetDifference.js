/**
 * Return new set containing set difference of given left and right sets.
 *
 * @param {Set} left
 * @param {Set} right
 * @return {Set}
 */
export default function difference(left, right) {
  const diff = new Set()
  for (const item of left) {
    if (!right.has(item)) diff.add(item)
  }

  return diff
}
