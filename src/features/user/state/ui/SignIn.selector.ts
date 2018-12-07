import { RootStateT } from 'reducers';

export const getSignInEmail = ({ user }: RootStateT) => user.ui.signIn.email;
export const getSignInCode = ({ user }: RootStateT) => user.ui.signIn.code;
