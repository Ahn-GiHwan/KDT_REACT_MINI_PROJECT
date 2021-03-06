import { fetchLogin, fetchSessionLogin } from "../../utils/userFetch";
import { fetchGetCartId } from "../../utils/cartFetch";
import {
  GET_LOGIN_FAIL,
  GET_LOGIN_LOAGIND,
  GET_LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import axios from "axios";
import cookie from "react-cookies";
import Swal from "sweetalert2";

export const onLogin = (user_email, user_password) => async (dispatch) => {
  dispatch({ type: GET_LOGIN_LOAGIND });

  try {
    const data1 = await fetchLogin(user_email, user_password);
    const user_name = data1[0].user_name;
    const user_pwd = data1[0].user_password;
    const data2 = await fetchGetCartId(user_email);

    const userInfo = data1[0];
    const cartId = data2.json[0].cart_id;
    dispatch({ type: GET_LOGIN_SUCCESS, userInfo, cartId });
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);
    axios
      .post("/api/user?type=webtoken", {
        user_email,
        user_name,
      })
      .then((res) => {
        cookie.save("token_id", res.data.token_id, {
          path: "/",
          expires,
        });
        cookie.save("token_name", res.data.token_name, {
          path: "/",
          expires,
        });
        cookie.save("user_password", user_pwd, {
          path: "/",
          expires,
        });
      })
      .catch((error) => {
        Swal.fire("오류", "로그인 중 에러", "error");
        dispatch({ type: GET_LOGIN_FAIL });
      });
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: GET_LOGIN_FAIL });
    Swal.fire(
      "로그인 실패",
      "아이디 또는 비밀번호를 다시 확인해 주세요",
      "error"
    );
  }
};
export const onSessionLogin =
  (user_email, user_password) => async (dispatch) => {
    dispatch({ type: GET_LOGIN_LOAGIND });

    try {
      const data1 = await fetchSessionLogin(user_email, user_password);
      const data2 = await fetchGetCartId(user_email);

      const userInfo = data1.json[0];
      const cartId = data2.json[0].cart_id;
      dispatch({ type: GET_LOGIN_SUCCESS, userInfo, cartId });
    } catch (error) {
      console.dir(error);
      dispatch({ type: GET_LOGIN_FAIL });
      Swal.fire("로그인 실패", "error");
    }
  };

export const logout = () => {
  return { type: LOGOUT };
};
