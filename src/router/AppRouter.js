import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import LoginScreen from 'components/auth/LoginScreen';
import CalendarScreen from 'components/calendar/CalendarScreen';

export default function AppRouter() {
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
