import { createAction } from 'typesafe-actions';

export const saveUsername = createAction(
  'user/ui/couchdb/SAVE_USERNAME',
  (resolve: any) => (s: string) => resolve(s)
);

export const savePassword = createAction(
  'user/ui/couchdb/SAVE_PASSWORD',
  (resolve: any) => (s: string) => resolve(s)
);

export const saveURL = createAction(
  'user/ui/couchdb/SAVE_URL',
  (resolve: any) => (s: string) => resolve(s)
);

export const finishCouchDBSetting = createAction('user/ui/couchdb/FINISH');
