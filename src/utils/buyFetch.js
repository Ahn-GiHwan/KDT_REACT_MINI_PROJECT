import axios from "axios";

export const fetchBuyCart = async (cartInfo, user_id, cart_id) => {
  const { data } = await axios.post("api/cart?type=order", {
    ...cartInfo,
    receive_address3: "",
    complete_yn: "Y",
    user_id,
    cart_id,
  });

  return data;
};

export const fetchCompleteBuy = async (product_id, user_id, cart_id) => {
  const { data } = await axios.post("api/cart?type=modify", {
    complete_yn: "Y",
    product_id,
    user_id,
    cart_id,
  });

  return data;
};

export const fetchGetBuyList = async (user_id) => {
  const { data } = await axios.post("api/order?type=page", {
    user_id,
    param_length: 200,
    param_start: 0,
  });

  return data;
};

export const fetchGetBuyDetail = async (order_id) => {
  const { data } = await axios.post("api/order?type=orderDetail", {
    order_id,
    user_id: "agh@test.com",
  });

  return data;
};

export const fetchGetBuyCategoryList = async (user_id) => {
  const { data } = await axios.post("api/order?type=userStat", {
    user_id,
  });

  return data;
};
