import { handleActions } from 'redux-actions'
import {
  openImportFile,
  discardImportFile,
  startDataImport,
  importFileReadSuccess,
  importLineProcessed,
  importFailure
} from '../../actions/ui/dataImport'

const initialState = {
  isFileSelected: false,
  file: undefined,
  error: '',
  isProcessing: false,
  linesToProcess: Infinity,
  linesProcessed: 0
}

export default handleActions(
  {
    [openImportFile]: (state, action) => ({
      ...state,
      isFileSelected: true,
      file: action.payload
    }),
    [discardImportFile]: state => ({
      ...state,
      isFileSelected: false,
      file: undefined
    }),
    [startDataImport]: state => ({ ...state, isProcessing: true }),
    [importFileReadSuccess]: (state, action) => ({
      ...state,
      linesToProcess: action.payload
    }),
    [importLineProcessed]: (state, action) => ({
      ...state,
      linesProcessed: action.payload
    }),
    [importFailure]: (state, action) => ({
      ...state,
      isFileSelected: false,
      isProcessing: false,
      file: undefined,
      error: action.payload.message
    })
  },
  initialState
)
