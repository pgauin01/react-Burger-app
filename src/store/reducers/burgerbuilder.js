import * as actionTypes from "../actions/actionTypes";
const initialState = {
  ingredients: null,
  price: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICE = {
  salad: 0.4,
  bacon: 0.7,
  meat: 1.7,
  cheese: 1.4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        price: state.price + INGREDIENT_PRICE[action.ingredientName],
        building: true,
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        price: state.price - INGREDIENT_PRICE[action.ingredientName],
        building: true,
      };
    case actionTypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: {
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          salad: action.ingredients.salad,
          meat: action.ingredients.meat,
        },
        price: 4,
        error: false,
        building: false,
      };
    case actionTypes.FETCH_ING_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
