import React, { Component } from "react";
import Aux from "../Auxilary/Auxiliry";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/SideDrawer/DrawerToggle/Toolbar/Toolbar";
import SideDrawer from "./../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleMenuBar = () => {
    let Menustate = this.state.showSideDrawer;
    this.setState({ showSideDrawer: !Menustate });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          authentication={this.props.isAuth}
          toggleMenu={this.toggleMenuBar}
        />
        <SideDrawer
          authentication={this.props.isAuth}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
