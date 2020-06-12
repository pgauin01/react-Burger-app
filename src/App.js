import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BugrerBuilder/BurgerBuilder";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
// import Checkout from "./containers/CheckOut/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import { Route, Switch, Redirect } from "react-router-dom";
const asyncCheckOut = asyncComponent(() => {
  return import("./containers/CheckOut/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

// const asyncLogout = asyncComponent(() => {
//   return import("./containers/Auth/logout");
// });

class App extends Component {
  componentDidMount() {
    this.props.onTrySignUp();
  }
  render() {
    let route = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      route = (
        <Switch>
          <Route path="/checkout" component={asyncCheckOut} />
          <Route path="/order" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{route}</Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTrySignUp: () => dispatch(actions.authCheckStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
