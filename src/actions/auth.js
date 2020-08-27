import { fetchSinToken } from 'helpers/fetch';
import { types } from 'types/types';
import { toast } from 'react-toastify';

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
    } else {
      toast.error(`⚠ ${body.msg}`);
    }
  };
};

const login = (user) => ({
  type: types.AUTH_LOGIN,
  payload: user,
});
