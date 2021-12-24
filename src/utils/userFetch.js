import axios from "axios";

export const fetchLogin = async (user_email, user_password) => {
  const { data } = await axios.post("api/user?type=login", {
    user_email,
    user_password,
  });

  return data;
};

export const fetchSessionLogin = async (user_email, user_password) => {
  console.log("fetchSessionLogin");
  console.log(user_email);
  console.log(user_password);
  const { data } = await axios.post("api/user?type=sessionSignin", {
    user_email,
    user_password,
  });

  return data;
};

export const fetchSessionCheck = async (token_id, token_name) => {
  const { data } = await axios.post("api/user?type=sessionCheck", {
    token_id,
    token_name,
  });

  return data;
};
