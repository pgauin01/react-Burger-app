import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./../NavigationItems/NavigationItem/NavigationItem";

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuth ? <NavigationItem link="/order">Order</NavigationItem> : null}
    {props.isAuth ? (
      <NavigationItem link="/logout">logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Auth</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
