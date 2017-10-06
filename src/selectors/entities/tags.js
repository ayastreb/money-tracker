import { EXPENSE, INCOME } from '../../entities/Transaction'

export const getTagOptions = state =>
  state.entities.tags[state.ui.form.transaction.kind].map(tag => ({
    key: tag,
    value: tag,
    text: tag
  }))

export const getAllTagsOptions = state =>
  [
    ...new Set([
      ...state.entities.tags[EXPENSE],
      ...state.entities.tags[INCOME]
    ])
  ].map(tag => ({
    key: tag,
    value: tag,
    text: tag
  }))
