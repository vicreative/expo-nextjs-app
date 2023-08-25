import { removeLoginIdentifier } from './auth';

export default async function logOut(state, dispatch, push) {
  dispatch({ ...state, user: null, business: null, isLoggedIn: null });
  removeLoginIdentifier();

  push('/');
}
