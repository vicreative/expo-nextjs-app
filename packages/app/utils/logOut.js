import { removeLoginIdentifier } from './auth';

export default async function logOut(dispatch, push) {
  removeLoginIdentifier();
  dispatch({ type: 'CLEAR_STATE' });
  push('/');
}
