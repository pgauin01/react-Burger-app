import * as actionTypes from "./actionTypes";
import Axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILURE,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const burgerPurchase = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    Axios.post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        // console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFailure(error));
      });
  };
};

export const puchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderSuccess = (fetchData) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    fetchData: fetchData,
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrder = (token, userId) => {
  return (dispatch) => {
    fetch(fetchOrderStart());
    // const queryParam =
    //   "?auth=" + token + '&orderBy="userId&equalTo="' + userId + '"';
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';

    Axios.get("/orders.json" + queryParams)
      .then((response) => {
        // console.log(response.data);
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
          // console.log(fetchedOrders);
        }
        // console.log(fetchedOrders);
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch((error) => {
        dispatch(fetchOrderFail(error));
        // this.setState({ loading: false });
      });
  };
};
