import { LOAD_MOST_USED_TAGS, USE_TAG } from '../../actions/tags'
import {ADD_TAG} from "../../actions/ui/transactionForm"

export default function(state = { mostUsed: [] }, action) {
  switch (action.type) {
    case LOAD_MOST_USED_TAGS:
      return { ...state, mostUsed: action.tags }
    case USE_TAG:
    case ADD_TAG:
      return state.mostUsed.includes(action.tag)
        ? state
        : { ...state, mostUsed: state.mostUsed.concat(action.tag) }
    default:
      return state
  }
}
