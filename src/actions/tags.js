import { retrieveMostUsedTags, increaseTagUsage } from '../util/storage/tags'
import { MOST_USED_TAGS_LIMIT } from '../constants/tags'

export const LOAD_MOST_USED_TAGS = 'LOAD_MOST_USED_TAGS'
export const LOAD_MOST_USED_TAGS_FAILURE = 'LOAD_MOST_USED_TAGS_FAILURE'
export function loadMostUsedTags(limit = MOST_USED_TAGS_LIMIT) {
  return async dispatch => {
    try {
      const tags = await retrieveMostUsedTags(limit)
      dispatch({ type: LOAD_MOST_USED_TAGS, tags })
    } catch (error) {
      dispatch({ type: LOAD_MOST_USED_TAGS_FAILURE, error })
    }
  }
}

export const USE_TAG = 'USE_TAG'
export const USE_TAG_FAILURE = 'USE_TAG_FAILURE'
export function useTag(tag) {
  return async dispatch => {
    try {
      await increaseTagUsage(tag)
      dispatch({ type: USE_TAG, tag })
    } catch (error) {
      dispatch({ type: USE_TAG_FAILURE, error })
    }
  }
}
