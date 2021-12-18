import axios from "axios";

export const getProductCount = async () => {
  const { data } = await axios.post("api/product?type=page", {
    user_id: "test1234@test.com",
  });

  return data;
};

export const getProductPage = async () => {
  const { data } = await axios.post("api/product?type=page", {
    length: 10,
    start: 1,
    user_id: "test1234@test.com",
  });
  return data;
};
