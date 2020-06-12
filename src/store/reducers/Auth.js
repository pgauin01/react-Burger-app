import * as actions from "./../actions/actionTypes";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.idToken,
        userId: action.localid,
      };
    case actions.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actions.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    case actions.AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
  }
  return state;
};

export default reducer;
