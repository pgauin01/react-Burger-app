import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxilary/Auxiliry";
import Backdrop from "./../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentDidUpdate() {
    // console.log("[Modal.js] will update");
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.click}></Backdrop>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100px)",
            display: this.props.show ? "block" : "none",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
