import { createActions } from 'redux-actions';

export const {
  openImportFile,
  discardImportFile,
  startDataImport,
  importFileReadSuccess,
  importLineProcessed,
  importFailure
} = createActions(
  'OPEN_IMPORT_FILE',
  'DISCARD_IMPORT_FILE',
  'START_DATA_IMPORT',
  'IMPORT_FILE_READ_SUCCESS',
  'IMPORT_LINE_PROCESSED',
  'IMPORT_FAILURE'
);
