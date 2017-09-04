export const getTagOptions = state =>
  state.entities.tags[state.ui.form.transaction.kind].map(tag => ({
    key: tag,
    value: tag,
    text: tag
  }))
