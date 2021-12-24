import {
  GET_LOGIN_FAIL,
  GET_LOGIN_LOAGIND,
  GET_LOGIN_SUCCESS,
  LOGOUT,
} from "./types";

const initState = {
  userInfo: [],
  cartId: "",
  isLoading: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LOGIN_LOAGIND:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LOGIN_SUCCESS:
      const userInfo = action.userInfo.json;
      const cartId = action.cartId;
      return {
        ...state,
        userInfo: userInfo[0],
        cartId: cartId.json[0].cart_id,
        isLoading: false,
      };
    case GET_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        userInfo: [],
        cartId: "",
        isLoading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
