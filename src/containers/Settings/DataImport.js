import { connect } from 'react-redux'
import DataImport from '../../components/DataImport'
import {
  openImportFile,
  discardImportFile,
  startDataImport
} from '../../actions/ui/dataImport'
import { getImportFile } from '../../selectors/ui/dataImport'

const mapStateToProps = state => {
  const file = getImportFile(state)
  return {
    isFileSelected: state.ui.dataImport.isFileSelected,
    isProcessing: state.ui.dataImport.isProcessing,
    linesToProcess: state.ui.dataImport.linesToProcess,
    linesProcessed: state.ui.dataImport.linesProcessed,
    filename: file && file.name,
    filesize: file && file.size,
    error: state.ui.dataImport.error
  }
}

export default connect(mapStateToProps, {
  openImportFile,
  discardImportFile,
  startDataImport
})(DataImport)
