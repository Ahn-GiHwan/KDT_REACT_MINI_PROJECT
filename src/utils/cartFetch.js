import axios from "axios";

// cart_id: 20211218CART000042

export const fetchInsertCart = async (product_id, user_id, cart_id) => {
  const { data } = await axios.post("api/cart?type=save", {
    cart_id,
    product_id,
    user_id,
  });

  return data;
};

export const fetchGetCartId = async (user_id) => {
  const { data } = await axios.post("api/cart?type=cart_id", {
    user_id,
  });

  return data;
};

export const fetchGetCartList = async (user_id) => {
  const { data } = await axios.post("api/cart?type=list", {
    user_id,
  });

  return data;
};

export const fetchGetTotalPrice = async (user_id, cart_id) => {
  const { data } = await axios.post("api/cart?type=totalPrice", {
    user_id,
    cart_id,
  });

  return data;
};
