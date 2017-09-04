export const getTagOptions = state =>
  state.entities.tags[state.ui.transactionForm.kind].map(tag => ({
    key: tag,
    value: tag,
    text: tag
  }))
