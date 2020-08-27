import { fetchSinToken } from 'helpers/fetch';
import { types } from 'types/types';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth', { email, password }, 'POST');
    const body = await resp.json();

    if (body.ok) {
      const { token, uid, name } = body;
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid,
          name,
        })
      );
    }
  };
};

const login = (user) => ({
  type: types.AUTH_LOGIN,
  payload: user,
});
