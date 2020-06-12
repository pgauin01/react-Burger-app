import React from "react";

import BurgerLogo from "./../../assests/img/burger.png";
import classes from "./Logo.module.css";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={BurgerLogo} alt="Burger" />
  </div>
);

export default logo;
