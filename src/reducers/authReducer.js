import { types } from 'types/types';

const initialState = {
  checking: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN:
      return {
        ...state,
        checking: false,
        ...action.payload,
      };

    default:
      return state;
  }
};
