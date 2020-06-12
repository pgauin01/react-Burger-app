import React from "react";
import classes from "./BuildControl.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
];
const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      <strong>Price :{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((el) => (
      <BuildControl
        key={el.label}
        label={el.label}
        added={() => props.ingredientsAdded(el.type)}
        delete={() => props.ingredientsdelete(el.type)}
        disabled={props.disabled[el.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchase}
      onClick={props.order}
    >
      {props.isAuthenticated ? "Order Now" : "Signup to Purchase"}
    </button>
  </div>
);

export default BuildControls;
