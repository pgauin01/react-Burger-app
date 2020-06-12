import * as actionTypes from "./actionTypes";
import Axios from "./../../axios-orders";

export const addIngredients = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredients = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients,
  };
};

export const fetchIngFailed = () => {
  return {
    type: actionTypes.FETCH_ING_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    Axios.get(`https://burger-builder-80813.firebaseio.com/ingredients.json`)
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngFailed());
      });
  };
};
