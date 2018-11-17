import { TransationKindT } from '../../entities/Transaction';

export const getTagOptions = state =>
  state.entities.tags[state.ui.form.transaction.kind].map(tag => ({
    key: tag,
    value: tag,
    text: tag
  }));

export const getAllTagsOptions = state =>
  [
    ...new Set([
      ...state.entities.tags[TransationKindT.Expense],
      ...state.entities.tags[TransationKindT.Income]
    ])
  ].map(tag => ({
    key: tag,
    value: tag,
    text: tag
  }));
