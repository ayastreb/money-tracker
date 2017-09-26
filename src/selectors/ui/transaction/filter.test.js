import { getDateLabel } from './filter'

it('returns date label for same day', () => {
  const date = new Date('2017-09-25')
  const state = {
    ui: { transaction: { filter: { dateStart: date, dateEnd: date } } }
  }
  expect(getDateLabel(state)).toEqual('25 Sep')
})

it('returns date label for different days', () => {
  const dateStart = new Date('2017-09-20')
  const dateEnd = new Date('2017-09-25')
  const state = {
    ui: { transaction: { filter: { dateStart, dateEnd } } }
  }
  expect(getDateLabel(state)).toEqual('20 Sep — 25 Sep')
})
