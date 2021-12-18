import { RootStateT } from 'reducers';

export const getCouchDBSetting = ({ user }: RootStateT) => user.ui.couchDB;
