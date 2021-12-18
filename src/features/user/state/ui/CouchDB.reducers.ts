import { ActionType, getType } from 'typesafe-actions';
import * as CouchDB from './CouchDB.action'

export interface CouchDBStateT {
  username: string,
  password: string,
  url: string;
}

export type CouchDBActionT = ActionType<typeof CouchDB>;

const initialState: CouchDBStateT = {
  username: '',
  password: '',
  url: ''
};

export default (state = initialState, action: CouchDBActionT) => {
  switch (action.type) {
    case getType(CouchDB.saveUsername):
      return { ...state, username: action.payload };
    case getType(CouchDB.savePassword):
      return { ...state, password: action.payload };
    case getType(CouchDB.saveURL):
      return { ...state, url: action.payload };
    default:
      return state;
  }
}
