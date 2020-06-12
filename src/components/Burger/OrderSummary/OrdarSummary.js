import React, { Component } from "react";
import Aux from "../../../hoc/Auxilary/Auxiliry";
import Button from "./../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate() {
    // console.log("[OrderSummary.js will update]");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igkey) => {
        return (
          <li key={igkey}>
            <span style={{ textTransform: "capitalize" }}>{igkey}</span> :
            {this.props.ingredients[igkey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order:</h3>
        <p>A delicious burger with following summary </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price:${this.props.totalprice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.modalCancel}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.modalContinue}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
