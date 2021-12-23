import { fetchLogin } from "../../utils/userFetch";
import { fetchGetCartId } from "../../utils/cartFetch";
import { GET_LOGIN_FAIL, GET_LOGIN_LOAGIND, GET_LOGIN_SUCCESS } from "./types";

export const getBoardList = (user_email, user_password) => async (dispatch) => {
  dispatch({ type: GET_LOGIN_LOAGIND });

  try {
    const userInfo = await fetchLogin(user_email, user_password);
    const cartId = await fetchGetCartId(user_email);
    dispatch({ type: GET_LOGIN_SUCCESS, userInfo, cartId });
  } catch (error) {
    dispatch({ type: GET_LOGIN_FAIL });
  }
};
