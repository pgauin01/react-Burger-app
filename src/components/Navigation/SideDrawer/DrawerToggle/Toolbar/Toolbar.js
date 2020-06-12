import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "./../../../../Logo/Logo";
import NavigationItems from "./../../../NavigationItems/NavigationItems";
import DrawerToggle from "./../DrawerToggle";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.toggleMenu} />
    <Logo />
    <nav className={classes.Desktop}>
      <NavigationItems isAuth={props.authentication} />
    </nav>
  </header>
);

export default toolbar;
