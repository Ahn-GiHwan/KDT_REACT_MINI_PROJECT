import axios from "axios";

export const fetchEmailDuplicate = async (user_email1, user_email2) => {
  const { data } = await axios.post("api/user?type=dplicheck", {
    user_email1,
    user_email2,
  });

  return data;
};

export const fetchInsertUser = async (userInfo) => {
  const { data } = await axios.post("api/user?type=signup", {
    ...userInfo,
  });

  return data;
};
