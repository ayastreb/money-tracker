import { RootStateT } from 'reducers';

export const isDemoUser = ({ user }: RootStateT) => user.isDemoUser;
export const isSignedIn = ({ user }: RootStateT) => user.isSignedIn;
