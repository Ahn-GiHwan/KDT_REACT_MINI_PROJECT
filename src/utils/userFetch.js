import axios from "axios";

export const fetchLogin = async (user_email, user_password) => {
  const { data } = await axios.post("api/cart?type=order", {
    user_email,
    user_password,
  });

  return data;
};
