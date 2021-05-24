import React, { useEffect } from 'react'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRouter';
import { PrivateRoute } from './PrivateRouter';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const {checking, uid  } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startChecking());

  }, [dispatch]) ;
   if(checking) {
        return <h5>Wait...</h5>
   }
    return (
        <Router>
        <div>    
          <Switch>
            <PublicRoute 
            exact
            path="/login"
            component = { LoginScreen}
            isAuthenticated = {!!uid}
            />          
            <PrivateRoute 
            exact 
            path="/"
            component = {CalendarScreen}
            isAuthenticated = {!!uid}
            /> 
            <Redirect  to = "/"/>            
          </Switch>
        </div>
      </Router>
    )
}
