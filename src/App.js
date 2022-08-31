import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "./bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import Login from "./Login";
import Register from "./Register";
import Signin from "./SignIn";
import ForgotPassword from "./ForgotPassword";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <Switch>
      <Route exact path="/login" component={Signin} />
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
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        })}
      </div>
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
