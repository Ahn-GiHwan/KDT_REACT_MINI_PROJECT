import { GET_LOGIN_FAIL, GET_LOGIN_LOAGIND, GET_LOGIN_SUCCESS } from "./types";

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
      const userInfo = action.userInfo;
      const cartId = action.cartId;
      return {
        ...state,
        userInfo: userInfo.json,
        cartId: cartId.json,
        isLoading: false,
      };
    case GET_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
