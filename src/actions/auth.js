import { toast } from 'react-toastify';

import { fetchSinToken, fetchConToken } from 'helpers/fetch';
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
    } else {
      toast.error(`⚠ ${body.msg}`);
    }
  };
};

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      'auth/new',
      { name, email, password },
      'POST'
    );
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

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('auth/renew');
    const body = await resp.json();

    console.log(body);

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
      dispatch(checkingFinish);
    }
  };
};

const checkingFinish = () => ({
  type: types.AUTH_CHECKING_FINISH,
});

const login = (user) => ({
  type: types.AUTH_LOGIN,
  payload: user,
});
