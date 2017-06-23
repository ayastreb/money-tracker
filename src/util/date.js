const pad = value => (value < 10 ? `0${value}` : value)
const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export const formatInternal = date =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export const formatShort = date =>
  `${pad(date.getDate())} ${month[date.getMonth()]}`
