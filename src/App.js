import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import { UserContext } from './context/UserContext';

import "./bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import Login from "./Login";
import Register from "./Register";
import Signin from "./SignIn";
// import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import BlogOverview from "./views/BlogOverview";
import Home from "./views/Home";

export default () => {

  const { user } = useContext(UserContext);

  return (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <Switch>

        {/* {user && <Route path="/dashboard" element={<BlogOverview />} />} */}

        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot-password" component={ForgotPassword} />

        <div>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  return (
                    <>
                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
                    </>
                  );
                })}
              />
            );
          })}
        </div>
        {/* <div>
          {routes.map((route, index) => {
            return (
              <Route key={index}
                path={route.path}
                component={withTracker(props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
              // component={<Redirect to={user ? '/dashboard' : '/login'} />} />
            );
          })}
        </div> */}
        {/* <Route path="*" element={<Redirect to={user ? '/dashboard' : '/login'} />} /> */}
      </Switch>
    </Router>

    // <Router basename={process.env.REACT_APP_BASENAME || ""}>
    //   <div>
    //     {routes.map((route, index) => {
    //       return (
    //         <Route
    //           key={index}
    //           path={route.path}
    //           exact={route.exact}
    //           component={withTracker(props => {
    //             return (
    //               <route.layout {...props}>
    //                 <route.component {...props} />
    //               </route.layout>
    //             );
    //           })}
    //         />
    //       );
    //     })}
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //   </div>
    // </Router>
  );
}
