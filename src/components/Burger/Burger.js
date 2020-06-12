import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((cum, curr) => {
      return cum.concat(curr);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start Adding ingredients</p>;
  }
  // console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top"></BurgerIngredients>
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom"></BurgerIngredients>
    </div>
  );
};

export default burger;
