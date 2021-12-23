import axios from "axios";

export const fetchBuyCart = async (cartInfo) => {
  const { data } = await axios.post("api/cart?type=order", {
    ...cartInfo,
    receive_address3: "",
    cart_id: "20211218CART000042",
    user_id: "agh@test.com",
    complete_yn: "Y",
  });

  return data;
};

export const fetchCompleteBuy = async (product_id) => {
  const { data } = await axios.post("api/cart?type=modify", {
    cart_id: "20211218CART000042",
    complete_yn: "Y",
    product_id,
    user_id: "agh@test.com",
  });

  return data;
};

export const fetchGetBuyList = async (user_id) => {
  const { data } = await axios.post("api/order?type=page", {
    user_id: "agh@test.com",
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

export const fetchGetBuyCategoryList = async () => {
  const { data } = await axios.post("api/order?type=userStat", {
    user_id: "agh@test.com",
  });

  return data;
};
