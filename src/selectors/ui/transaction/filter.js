import format from 'date-fns/format'

export const getDateLabel = state => {
  const { dateStart, dateEnd } = state.ui.transaction.filter
  return dateStart !== dateEnd
    ? `${format(dateStart, 'DD MMM')} — ${format(dateEnd, 'DD MMM')}`
    : format(dateStart, 'DD MMM')
}
