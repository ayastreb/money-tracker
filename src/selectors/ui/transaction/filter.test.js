import { getDateLabel, getVisiblePages } from './filter'

it('returns date label for same day', () => {
  const date = new Date('2017-09-25')
  const state = {
    ui: { transaction: { filter: { dateStart: date, dateEnd: date } } }
  }
  expect(getDateLabel(state)).toEqual('25 September')
})

it('returns date label for different days', () => {
  const dateStart = new Date('2017-09-20')
  const dateEnd = new Date('2017-09-25')
  const state = {
    ui: { transaction: { filter: { dateStart, dateEnd } } }
  }
  expect(getDateLabel(state)).toEqual('20 Sep — 25 Sep')
})

describe('pager', () => {
  it('returns pages', () => {
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 0, totalRows: 18, perPage: 20 } },
          isMobile: false
        }
      })
    ).toEqual([0])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 0, totalRows: 18, perPage: 10 } },
          isMobile: false
        }
      })
    ).toEqual([0, 1])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 0, totalRows: 18, perPage: 5 } },
          isMobile: false
        }
      })
    ).toEqual([0, 1, 2, 3])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 2, totalRows: 18, perPage: 5 } },
          isMobile: false
        }
      })
    ).toEqual([0, 1, 2, 3])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 3, totalRows: 18, perPage: 5 } },
          isMobile: false
        }
      })
    ).toEqual([0, 1, 2, 3])
  })

  it('skips pages on the left and right', () => {
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 0, totalRows: 50, perPage: 5 } },
          isMobile: true
        }
      })
    ).toEqual([0, 1, 2, 3, 4])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 1, totalRows: 50, perPage: 5 } },
          isMobile: true
        }
      })
    ).toEqual([0, 1, 2, 3, 4])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 2, totalRows: 50, perPage: 5 } },
          isMobile: true
        }
      })
    ).toEqual([0, 1, 2, 3, 4])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 3, totalRows: 50, perPage: 5 } },
          isMobile: true
        }
      })
    ).toEqual([1, 2, 3, 4, 5])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 4, totalRows: 50, perPage: 5 } },
          isMobile: true
        }
      })
    ).toEqual([2, 3, 4, 5, 6])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 5, totalRows: 50, perPage: 5 } },
          isMobile: true
        }
      })
    ).toEqual([3, 4, 5, 6, 7])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 6, totalRows: 50, perPage: 5 } },
          isMobile: true
        }
      })
    ).toEqual([4, 5, 6, 7, 8])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 7, totalRows: 50, perPage: 5 } },
          isMobile: true
        }
      })
    ).toEqual([5, 6, 7, 8, 9])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 8, totalRows: 50, perPage: 5 } },
          isMobile: true
        }
      })
    ).toEqual([5, 6, 7, 8, 9])
    expect(
      getVisiblePages({
        ui: {
          transaction: { filter: { page: 9, totalRows: 50, perPage: 5 } },
          isMobile: true
        }
      })
    ).toEqual([5, 6, 7, 8, 9])
  })
})
