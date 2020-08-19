import React from 'react';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from 'store/store';
import AppRouter from 'router/AppRouter';

export default function CalendarApp() {
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </Provider>
  );
}
