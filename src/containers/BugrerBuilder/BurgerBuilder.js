import React, { Component } from "react";

import Aux from "./../../hoc/Auxilary/Auxiliry";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrdarSummary";
import Axios from "./../../axios-orders";
import Loader from "./../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";
import * as burgerbuilderActions from "../../store/actions/index";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // price: 2,
    // purchasable: false,
    purchasing: false,
  };

  componentDidMount() {
    // console.log(this.props);
    this.props.onInitIngredients();
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((cumm, curr) => cumm + curr, 0);
    return sum > 0;
  };

  // addIngredientsHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const PriceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.price;
  //   const newPrice = oldPrice + PriceAddition;
  //   this.setState({ price: newPrice, ingredients: updatedIngredients });
  //   this.updatePurcahseState(updatedIngredients);
  // };

  // deleteIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceSubstraction = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.price;
  //   const newPrice = oldPrice - priceSubstraction;
  //   this.setState({ price: newPrice, ingredients: updatedIngredients });
  //   this.updatePurcahseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  hideModalHandler = () => {
    this.setState({ purchasing: false });
  };

  continueBtnHandler = () => {
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.price);
    // const queryString = queryParams.join("&");
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
    //   pathname: "/checkout",
    //   search: "?" + queryString,
    // });
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.price.toFixed(2),
    //   customer: {
    //     name: "praful",
    //     address: {
    //       street: "34 boulverad",
    //       town: "translevenia",
    //       state: "uk",
    //     },
    //     email: "praful.gaur.2@gmail.com",
    //   },
    //   deliveryMethod: "fastest",
    // };
    // Axios.post("/orders.json", order)
    //   .then((response) => this.setState({ loading: false, purchasing: false }))
    //   .catch((error) => this.setState({ loading: false, purchasing: false }));
  };
  render() {
    const disabledInfo = {
      ...this.props.ing,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
      // console.log(disabledInfo[key]);
    }
    let ordersummary = null;
    let burgers = this.props.error ? `Ingredients can't be loaded` : <Loader />;

    if (this.props.ing) {
      burgers = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsdelete={this.props.onIngredientDelete}
            disabled={disabledInfo}
            price={this.props.price}
            isAuthenticated={this.props.isAuth}
            purchase={this.updatePurchaseState(this.props.ing)}
            order={this.purchaseHandler}
          ></BuildControls>
        </Aux>
      );
      ordersummary = (
        <OrderSummary
          ingredients={this.props.ing}
          modalContinue={this.continueBtnHandler}
          modalCancel={this.hideModalHandler}
          totalprice={this.props.price}
        ></OrderSummary>
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} click={this.hideModalHandler}>
          {ordersummary}
        </Modal>
        {burgers}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerbuilderActions.addIngredients(ingName)),
    onIngredientDelete: (ingName) =>
      dispatch(burgerbuilderActions.removeIngredients(ingName)),
    onInitIngredients: () => dispatch(burgerbuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerbuilderActions.puchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(burgerbuilderActions.authRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, Axios));
