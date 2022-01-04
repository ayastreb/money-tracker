import { connect } from 'react-redux';
import CouchDB from 'features/user/components/CouchDB';
import { saveUsername, savePassword, saveURL, finishCouchDBSetting } from '../../state/ui/CouchDB.action';
import { RootStateT } from 'reducers';

const mapStateToProps = ({ user }: RootStateT) => ({
  ...user.ui.couchDB,
  isSignedIn: user.isSignedIn
});

export default connect(
  mapStateToProps,
  {
    saveUsername,
    savePassword,
    saveURL,
    finishCouchDBSetting,
  }
)(CouchDB);
