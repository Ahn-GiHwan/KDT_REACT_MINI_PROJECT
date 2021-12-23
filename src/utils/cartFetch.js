import axios from "axios";

// cart_id: 20211218CART000042

export const fetchInsertCart = async (cart_id, product_id, user_id) => {
  const { data } = await axios.post("api/cart?type=save", {
    cart_id: "20211218CART000042",
    product_id,
    user_id: "agh@test.com",
  });

  return data;
};

export const fetchGetCartId = async (user_id) => {
  const { data } = await axios.post("api/cart?type=cart_id", {
    user_id: "agh@test.com",
  });

  return data;
};

export const fetchGetCartList = async (user_id) => {
  const { data } = await axios.post("api/cart?type=list", {
    user_id: "agh@test.com",
  });

  return data;
};

export const fetchGetTotalPrice = async (cart_id, user_id) => {
  const { data } = await axios.post("api/cart?type=totalPrice", {
    cart_id: "20211218CART000042",
    user_id: "agh@test.com",
  });

  return data;
};
