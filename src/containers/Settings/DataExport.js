import { connect } from 'react-redux';
import DataExport from '../../components/DataExport';
import {
  saveExportFile
} from '../../actions/ui/dataExport';

const mapStateToProps = state => {
  return {
  };
};

export default connect(
  mapStateToProps,
  {
    saveExportFile
  }
)(DataExport);
