const offset = new Date().getTimezoneOffset()

export function toUtcTimestamp(date) {
  const timestamp = date instanceof Date ? date.getTime() : date
  return timestamp - offset * 60 * 1000
}

export function toLocalTimestamp(date) {
  const timestamp = date instanceof Date ? date.getTime() : date
  return timestamp + offset * 60 * 1000
}
