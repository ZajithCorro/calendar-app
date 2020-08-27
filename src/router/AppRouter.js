import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginScreen from 'components/auth/LoginScreen';
import CalendarScreen from 'components/calendar/CalendarScreen';
import { startChecking } from 'actions/auth';

export default function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/' component={CalendarScreen} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
}
